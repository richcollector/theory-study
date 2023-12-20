## eslint

### Lint가 필요한 이유

- 코드린터는 버그가 날 수 있을 만한 코드, 의심스러운 구조, 타입스크립트 등을 찾아서 잡아주는 도구입니다.

- import 순서를 잡아주거나, ==, ===와 같이 여러사람이 다르게 쓸 수 있는 부분을 ==(금지), ===(허용) 규칙들을 넣어주어 통일 시킬 수 있습니다.

- 한 사람이 쓴 것처럼 표현됩니다. 일일히 작업할 수 없기 때문에, 코딩 스타일 자동화 툴이 필요합니다.

### 설정 파일

- init @eslint/config를 하여 설정파일을 생성하고, 확장 프로그램 ESLint를 깔아줘야 vs가 이해하고 해석할 수 있습니다. 타입스크립트를 사용할 경우 설정파일과 연결해줘야 에러를 잡을 수 있습니다.

- .eslintrc.확장자로 설정 파일을 직접 만들어 줄 수 있다. 확장자를 안쓰면 json처럼 인식하고, 주석을 허용합니다.

### 타입스크립트와 연결

- 규칙설정

```js
parserOptions: {
project: "\*\*/tsconfig.json",
```

- rules안에 개인설정 추가

```js
rules: {
"react/react-in-jsx-scope": "off", //import React from 'react'
```

- 라이브러리에서 설정한 룰 적용

  prettier와 자주 쓰이니 연결 방법 숙지하는 것이 좋습니다.

```js
extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
```

### 사용방법

- `npm install eslint --save-dev`

  개발할때 필요한 라이브러리는 devdependency에 저장하여 런타임시 효율성을 향상시킵니다.

- npx eslint .

  node_modules에 있는 eslint 실행 시켜서 모든 파일 검사해줍니다.

- npx eslint --cache .

  예전에 검사한 것은 새로 검사 안 하도록 불필요한 검사를 피하게 해줍니다.

### 단축키 설정

- pakage.json의 script 설정

  npm run lint로 실행 가능합니다.
  `"lint" : eslint --cache .`

### 주의사항

- `.eslintcache`

  사람마다 cache된 내용과 경로가 다르므로, .gitignore에 추가 해줍니다.
  설정하지 않으면 엄청난 충돌을 경험하게 될 것입니다.
