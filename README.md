# 모던 프론트엔드 - 모노레포 구축해보기

## Tools

1. [Yarn](https://yarnpkg.com/)
2. [Lerna](https://lerna.js.org/)
3. [Nx](https://nx.dev/)
4. [Turborepo](https://turborepo.org/)

## 1. Yarn

> https://classic.yarnpkg.com/en/docs/cli/

[yarn link](https://classic.yarnpkg.com/en/docs/cli/link) 기능을 선언적으로 사용해 node_modules 디렉토리에 workspace에 대한 **심볼릭 링크**가 생성된다. 이를 통해 하나의 저장소에 있는 여러 프로젝트가 서로 쉽게 상호 참조 가능하다.

### 용어

- Project
  - = 저장소
  - 하나 이상의 worktree 포함
  - 최소 한개의 workspace(즉, 루트 workspace) 존재
- workspace
  - = 모노레포 패키지
- worktree
  - 자식 workspace를 갖는 workspace

### worktree 선언

worktree를 구성하는 workspace의 위치를 glob 패턴의 배열로 나타낸다. 예를 들어 packages 폴더 내의 모든 폴더가 workspace가 되도록 다음과 같이 설정한다.

```json
{
  "private": true,
  "workspaces": ["packages/*"]
}
```

### workspace 추가

그림과 같이 client, server common 세 개의 workspace를 추가하고 루트 경로에서 yarn 명령을 실행하면 루트 경로에 node_modules 디렉토리에 workspace들에 대한 **심볼릭 링크**가 생성된다.

<img width="1443" alt="스크린샷 2022-10-23 오후 7 48 50" src="https://user-images.githubusercontent.com/70752848/197387931-ed5720a0-d790-4a6e-8443-0eff517f81cd.png">

### workspace에 대한 명령 실행

[특정 workspace에 정의된 스크립트를 실행한다.](https://classic.yarnpkg.com/en/docs/cli/workspace)

### workspace를 의존성으로 추가

client 패키지가 common 패키지를 의존하게 하려면 package.json에 의존성을 명시하거나 yarn workspace 명령을 이용한다.

```
yarn workspace client add common@1.0.0
```

<img width="1443" alt="스크린샷 2022-10-23 오후 8 04 36" src="https://user-images.githubusercontent.com/70752848/197388542-840879eb-0d5a-408e-b0f8-df7240579654.png">

### workspace 의존 관계 확인

[yarn workspace info](https://classic.yarnpkg.com/en/docs/cli/workspaces) 명령을 실행해 workspace들의 의존 관계를 파악한다.

> Yarn 2.x 이후에는 [yarn workspaces list](https://yarnpkg.com/cli/workspaces/list)를 사용

```
yarn workspaces info
```

<img width="1445" alt="스크린샷 2022-10-23 오후 9 24 49" src="https://user-images.githubusercontent.com/70752848/197391909-627696ff-b186-4a88-a97a-f9b35d5519de.png">
