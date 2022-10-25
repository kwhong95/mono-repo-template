## Nx

구글 개발자들이 만든 오픈소스 프로젝트 [Nx](https://nx.dev/)이다. Nx는 모노레포 구성을 위한 다양한 개발 도구를 제공하고 Angular, React와 같은 프론트엔드 프레임워크 기반의 개발환경 구성뿐 아니라 Express, Nest.js와 같은 백엔드 기술 기분의 개발까지 폭넓게 지원하고 있다. 이뿐만 아니라 workspace 생성 시 Cypress, Jest 등을 기반으로 한 테스트 환경까지 설정해주기 때문에, 초기 모노레포 개발 환경 구축 비용을 크게 줄여준다.

### 새로운 Nx workspace 생성하기

```
npx create-nx-workspace
```

```
✔ Choose your style                     · integrated
✔ What to create in the new workspace   · react
✔ Repository name                       · nx-react
✔ Application name                      · my-app
✔ Default stylesheet format             · @emotion/styled
✔ Enable distributed caching to make your CI faster · Yes
```

**Nx Workspace 구조**

<img width="276" alt="스크린샷 2022-10-25 오후 9 29 07" src="https://user-images.githubusercontent.com/70752848/197773075-da91eb75-6693-475a-947a-b62ef6dc1913.png">

생성된 workspace 구조의 디렉토리 특징을 알아본다.

- `apps/*` : 애플리케이션 프로젝트들이 위치한다. 처음 생성된 애플리케이션도 여기에 들어있는 것을 확인할 수 있다. React 기반으로 생성했더라도 다른 프레임워크 및 라이브러리 기반의 코드도 공존할 수 있다.

- `libs/*`: 애플리케이션 전반에서 공통으로 사용할 코드를 이곳에 작성한다.

- `tools/*`: 개발에 필요한 tooling script가 위치한다.

**애플리케이션 실행**

```
npx nx serve <APP_NAME> // 주의: workspace 이름이 아닌 애플리케이션 이름
```

**전역(global)에 Nx 설치 시 애플리케이션 실행**

```
nx serve <APP_NAME>
```

> 전역에 Nx 설치 : `npm install -g nx 또는 yarn global add nx`

### 라이브러리 추가해보기

애플리케이션 전반에서 사용 가능한 라이브러리를 추가해본다.

**라이브러리 목적과 특성**

- feature 라이브러리
- UI 라이브러리
- data-access 라이브러리
- utility 라이브러리

**eg.Create UI Library**

```
npx nx g @nrwl/react:lib ui
```

<img width="277" alt="스크린샷 2022-10-25 오후 9 46 31" src="https://user-images.githubusercontent.com/70752848/197776669-00b58e09-e5e6-4eff-acb3-0089fa1ef3fc.png">

**생성된 UI 라이브러리 구조에 실제 View 역할을 수행할 컴포넌트 추가**

```
npx nx g component first-lib --project=ui --export
```

<img width="269" alt="스크린샷 2022-10-25 오후 9 48 52" src="https://user-images.githubusercontent.com/70752848/197777191-bbc91624-5a78-4b6d-a667-81502af98434.png">
