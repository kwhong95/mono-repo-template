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

### 모든 workspace에 대해 명령 실행

yarn workspaces run 를 사용하면 모든 workspace에 대해 명령을 실행할 수 있다. 다음 명령은 모든 workspace들을 순회하며 test 스크립트를 실행한다.

```
yarn workspaces run test
```

### 루트 프로젝트에 의존성 추가

workspace가 아니라 루트 프로젝트에 의존성을 추가하려면 다음 명령을 실행한다.

```
yarn add <PACKAGE_NAME> -W
```

### 호이스팅(의존성 끌어올리기)

npm, yarn 등은 중복 의존성 설치를 방지하기 위해 [호이스팅(hosting)](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/) 기법을 사용한다.

![image](https://user-images.githubusercontent.com/70752848/197393598-bd4e0f7e-a0b2-45a1-98de-087b743004ed.png)

모노레포에서 구조는 다음과 같다.

![image](https://user-images.githubusercontent.com/70752848/197393824-e00011bb-7e77-48c1-a46e-a595418be871.png)

일부 모듈 로더는 [심볼릭 링크](https://github.com/facebook/metro/issues/1)를 지원하지 않기 때문에 B(2.0)을 탐색할 수 없다. 이 때는 [nohoist](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/) 필드를 사용하면 된다.

```json
{
  "workspaces": {
    "packages": ["packages/*"],
    "nohoist": ["**/react-native"]
  }
}
```

그 외의 Yarn 1.x에 대한 명령어는 [CLI Introduction](https://classic.yarnpkg.com/en/docs/cli/)에서 확인할 수 있다.
