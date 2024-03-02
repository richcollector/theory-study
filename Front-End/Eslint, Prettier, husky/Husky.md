## husky

### husky가 필요한 이유

- 규칙에 어긋나면 git에 올릴 수 없도록 설정 할 수 있습니다.

  작업자가 사용을 안하면 효과가 없고, 강제성이 없습니다.

- husky를 통해서 pre-commit, pre-push hook을 설정 가능합니다.

- git hook 설정을 도와주는 npm package

- 번거로운 git hook 설정이 편하고 + npm install 과정에서 사전에 세팅해둔 git hook을 다 적용시킬 수 있어서 모든 팀원이 git hook 실행이 되도록 하기가 편합니다.

### 사용방법

- `npm install husky --save-dev`

  dev dependency에 설치합니다.

- `npx husky install`

  처음 세팅하는 사람만 실행이 필요합니다.

- package.json에 postinstall 설정

  husky에 등록된 hook을 실제 .git에 적용시키기 위한 스크립트이다.

```js
{
"scripts": {
"postinstall": "husky install"
},
}
```

최근에는 "prepare": "husky install"로 자동으로 추가가 됩니다.

- `add pre-commit`, `pre-push hook`

  `npx husky add .husky/pre-commit "npm run format && git add ."`
  `npx husky add .husky/pre-push "npm run lint"`

### lint-staged와 결합방식

- 포맷팅을 전체 파일 대상이 아닌 현재 git stage에 올라온 변경사항 대상으로만 수행할 수 있습니다.

- `npx mrm lint-staged --save-dev`

  여기서 mrm이란 오픈소스 프로젝트의 환경 설정을 동기화 하기 위한 도구입니다.
  mrm을 이용하면 lint-staged와 husky를 간편하게 설정해줄 수 있습니다.
  위 명령어를 실행하면 .husky폴더가 생기고 package.json 파일에 다음과 같은 코드가 추가로 생길 것입니다.

```jsx
{
    "scripts": {
        "prepare": "husky install"
    },
    "devDependencies": {
        "husky": "^6.0.0",
        "lint-staged": "^11.0.0",
    },
    "lint-staged": {
        "\*.js": "eslint --cache --fix"
    }
}
```

.ts 파일과 .tsx 파일 둘 다 검사할 것 이고 prettier도 사용하므로 다음과 같이 변형해서 사용합니다.
--fix는 간단한 에러를 자동으로 해결해 준다.

```jsx
"lint-staged": {
    "\*.{ts,tsx}": [
        "prettier --write",
        "eslint --fix"
    ]
}
```

### 참고사항

- lint에서 에러가 나면 push를 하지 않습니다.

- warn은 push가 되고 error는 push가 되지 않습니다.

- `"no-console": ["error", { "allow": ["warn", "error", "info"] }]`

  error로 설정할 경우 console.log가 하나라도 있으면 push가 안 됩니다.
  `eslint --max-warings=0`으로 warn조차 push 못하게 할 수 있습니다.

```js
{
    "scripts": {
        "lint": "eslint --cache --max-warnings=0",
    },
}
```
