## Yarn Berry (2.x, 3.x)

> https://yarnpkg.com/cli

Yarn workspace 도입 시 성능면에서 Yarn Berry를 검토해 볼 수 있다.

### node_modules의 문제점

- 의존성 탐색 알고리즘의 비효율

node.js에서 `require()` 함수 실행 시 모듈을 찾을 때까지 상의 node_modules 디렉터리를 순회한다. 이 때 [느린 디스크 I/O 동작](https://github.com/nodejs/node/blob/24fc302eadf64d2518733a2ae40355916e6990f7/lib/internal/modules/cjs/loader.js#L321-L336)이 경로의 깊이만큼 발생한다.

- 저장 공간과 설치 시간

node_modules 디렉터리는 흔히 매우 큰 공간을 필요로 하고, 그만큼 설치에도 오랜 시간이 걸린다.

- 유령 의존성(phantom dependency)

의존성 중복 방지를 위해 호이스팅 기법을 사용하는데 이것은 의도치 않은 side effect를 발생시킨다.

![image](https://user-images.githubusercontent.com/70752848/197541961-f88c1f03-bdfb-4842-add2-833630ff28e3.png)

**package-1은 B(1.0)을 설치한 적이 없으나 require('B')가 작동한다.**. require('B')를 사용하는 경우 B(1.0)을 의존하던 패키지를 제거하면 B를 찾지 못하는 오류가 발생한다.

### Yarn Berry의 해결 방법 PnP

어떤 프로젝트를 구성하는 의존성은 결정적(deterministic)이다. Berry는 node_modules에 패키지 파일을 저장하는 대신 패키지의 압축 파일을 .yarn/cache 폴더에 수평적으로 저장하는 방식으로 위 문제를 해결했다. 이 방식을 Yarn은 Plug'n'Play(PnP)라고 부른다. 압축 파일은 ZipFS를 이용하며 해당 모듈 로드가 필요할 때 메모리에서 압축을 해제하여 접근한다.

### PnP로 얻는 것

- 빠른 의존성 검색

의존성이 .yarn/cache에 수평적으로 존재하므로 모든 패키지에 대한 접근 시간이 O(1)이 된다. 따라서 `require()`에 소요되는 시간이 크게 단축된다.

- 빠른 설치

압축 파일 단위로 설치되기 때문에 의존성을 구성하는 파일의 수가 절대적으로 감소한다. 여기에 [zero-install](https://yarnpkg.com/features/zero-installs)전략을 사용하면 아예 설치 과정을 생략할 수 있다.

- 유령 의존성 방지

호이스팅을 사용하지 않기 때문에 의도하지 않은 의존성이 발생하지 않는다.

### zero-intall 전략

> https://github.com/yarnpkg/berry/tree/master/.yarn/cache

하나의 압축 파일로 의존성을 관리하고 이 파일을 git으로 관리하면 설치 과정을 제거할 수 있는데 이와 같은 전략을 zero-install이라고 한다.

#### 장점

- 다른 브랜치에서 사로운 의존성이 설치되었을 때 설치 과정 없이 바로 사용할 수 있다.
- CI에서 의존성 설치에 드는 시간을 크게 줄일 수 있다.

### 오프라인 캐시

네크워크가 다운되었을 때에도 Yarn이 재대로 작동하도록 하는 기능이다. 자세한 기능은 [Offline Cache](https://yarnpkg.com/features/offline-cache)를 참고한다.

### 사용 방법

```
npm install -g yarn
cd ../path/to/your-package
yarn init -y
yarn set version berry
```

<img width="279" alt="스크린샷 2022-10-24 오후 11 04 22" src="https://user-images.githubusercontent.com/70752848/197545036-975c0346-2288-4d74-aaa8-ef1a4e8207f7.png">

위와 같은 초기 파일이 생성된다.

<img width="503" alt="스크린샷 2022-10-24 오후 11 05 14" src="https://user-images.githubusercontent.com/70752848/197545230-f2faf084-6637-44db-ba63-6dea1397f853.png">

**해당 디렉토리에서 Yarn 버전을 살펴보면** 1.x 버전이 아닌 것을 확인 할 수 있다.

<img width="270" alt="스크린샷 2022-10-24 오후 11 07 45" src="https://user-images.githubusercontent.com/70752848/197545804-84d841ca-6041-463a-93fe-d8afedd5493e.png">

의존성 추가 시 .yarn/cache 경로에 추가 된다.

### .pnp.cjs

.pnp.cjs 파일에는 모든 의존성에 대한 메타 정보(zip 경로, 의존성)와 함께 ZipFS에 대한 처리 코드가 들어 있다.

<img width="682" alt="스크린샷 2022-10-24 오후 11 09 18" src="https://user-images.githubusercontent.com/70752848/197546162-e3dbe23e-c222-4820-bee2-daa90c4a99f9.png">

띠라서 Berry 기반의 프로젝트는 `node src/main.js`와 같은 명령으로 실행할 수 없고 `yarn node src/main.js`와 같이 Yarn을 통해서 실행해야 한다.

```json
{
  "scripts": {
    "start": "node src/main.js"
  }
}
```

위와 같이 package.json에 스크립트 명령을 작성한 경우에는 `yarn start` 명령을 사용할 수 있다.
