## Lerna

> https://lerna.js.org/

Lerna는 저수준의 Yarn, npm 위에 있는 고수준 레이어로 볼 수 있다. Yarn으로 모노레포를 구성할 수 있으나 여러 workspace의 버전 관리, 테스트, 빌드, 배포, 게시 등의 작업은 일일히 구성해야 한다. Lerna는 이러한 작업을 최적화 한다.

### Lerna 기반 프로젝트 생성

CLI를 쉽게 사용하기 위해 글로벌 설치를 진행한다.

```
npm install --global lerna
```

프로젝트를 Lerna로 초기화한다.

```
lerna init
```

#### 초기 디렉토리 구성

<img width="900" alt="스크린샷 2022-10-24 오후 11 23 52" src="https://user-images.githubusercontent.com/70752848/197549541-39e7808e-64fc-4b50-872c-db5887b491f3.png">

#### lerna.json

- version: 각 workspace에 대한 버전 관리가 가능하다. 개별로 관리하고 싶다면 "independent"를 입력한다.
- npmClient: "npm" 또는 "yarn"
- useWorkspaces: npmClient의 workspace로 관리되도록 한다.

### workspace 추가

새로운 workspace를 스캐폴딩 해본다.

```
lerna create <PACKAGE-NAME>
```

client workspace를 생성 해본다.

```
lerna create client
```

<img width="1453" alt="스크린샷 2022-10-24 오후 11 31 40" src="https://user-images.githubusercontent.com/70752848/197551354-c5bc4af4-ee17-4e42-96f1-a8a2b6b46f8f.png">

### workspace에 의존성 추가

client workspace에 react 패키지를 설치해보도록 한다. `--scope`없이 사용하면 모든 workspace에 추가한다. 추가하려는 의존성이 workspace라면 해당 workspace를 제외한 모든 workspace에 추가된다.

> 현재 [여러 의존성을 한번에 추가](https://github.com/lerna/lerna/issues/2004)하는 기능은 지원하지 않는다.

client workspace에 react 패키지를 추가한다.

```
lerna add react --scope=client
```

client workspace에 common workspace를 추가한다.

```
lerna add common@0.0.0 --scope=client
```

<img width="695" alt="스크린샷 2022-10-25 오후 8 26 41" src="https://user-images.githubusercontent.com/70752848/197760905-3be3cf9d-e052-4d14-9b6c-94ef3386d7c9.png">

### 루트 프로젝트에 의존성 추가

lodash를 루트 프로젝트에 설치한다.

```
yarn add lodash --ignore-workspace-root-check
```

<img width="321" alt="스크린샷 2022-10-25 오후 8 31 44" src="https://user-images.githubusercontent.com/70752848/197762635-267b7563-7b5a-4f1a-80ee-44bd9114006c.png">

### 모든 workspace에 대해 npm 스크립트 실행

해당 스크립트가 포함된 각 workspace에서 npm 스크립트를 실행한다.

```
lerna run <COMMAND_NAME> -- [...args]
```

모든 workspace에 대해 test를 실행한다.

```
lerna run test
```

<img width="586" alt="스크린샷 2022-10-25 오후 8 36 29" src="https://user-images.githubusercontent.com/70752848/197763463-b66d8b68-087f-498f-bc39-25160cdfab90.png">
```

### 모든 workspace에 대해 임의 명령 실행

```
lerna exec -- <COMMAND> [...args]
```

eg. 모든 workspace 하위의 node_modules 폴더를 지운다.

```
lerna exec -- rm -rf ./node_modules
```

### npm publish

> [공식 문서 참조](https://github.com/lerna/lerna/tree/main/commands/publish#readme)

```
lerna publish   ## 마지막 릴리스 이후 변경된 패키지 publish
lerna publish from-git ## 현재 커밋에 태그가 지정된 패키지를 명시적으로 publish
lerna publish from-package ## 레지스트리에 최신 버전이 없는 패키지를 명시적으로 publish
```

### 버전 관리 및 CHANGELOG 작성 자동화

workspace에 변경을 가한 뒤 `lerna version`을 실행하면 각 workspace의 package.json 에 명시된 버전을 자동으로 올리고 git tag를 남기고 변경에 대한 CHANGELOG도 작성한다.

> 더 많은 기능은 [lerna-changelog](https://github.com/lerna/lerna-changelog) 를 참고

```
lerna version
```

<img width="480" alt="스크린샷 2022-10-25 오후 8 59 43" src="https://user-images.githubusercontent.com/70752848/197767700-a90a1a38-137d-4c21-9bac-866635b97b0a.png">

<img width="586" alt="스크린샷 2022-10-25 오후 8 58 53" src="https://user-images.githubusercontent.com/70752848/197767521-0d135095-7eee-4e0c-9623-829fbad23a01.png">
