## prettier

### Code Formatter가 필요한 이유

- 코드포멧터 코딩컨벤션(코드 작성 스타일 규칙)에 따라 코드 스타일을 알아서 정리해주는 도구입니다.

- 띄어쓰기 2칸(Tap), 코드 길이가 일정 수준이 넘어가면 줄바꿔주기 등 자동으로 정리를 해줍니다.

- 커스터마이징한 설정 파일을 올려서 모든 팀원들의 스타일을 통일시킬 수 있습니다.

### Eslint와의 충돌 해제

- `npm install eslint-config-prettier --save-dev`

  eslint는 linting 기능을, prettier는 formatting을 담당하는 구조가 이상적입니다.
  Eslint에 있는 formatting 관련 rule을 해제해줍니다.

### 설정파일

- 설정파일 생성 `echo {}> .prettierrc.json`후 확장 프로그램 prettierrc 설치해준다.

- .prettierrc.확장자로 직접 파일을 생성한다.

### eslint 설정파일 연결

```jsx
extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
```

### 사용방법

- `npm install prettier --save-dev`

  devdependency에 설치 합니다.

- `npx prettier .`

  node_modules에 있는 prettier 실행합니다.

- `npx prettier index.js`

  콘솔에 스타일 변경내용을 찍어줍니다.

- `npx prettier --write .`

  포멧팅한 내용 파일에 저장 해줍니다.

- `npx prettier --write --cache .`

  이미 포멧팅한 내용을 다시 포멧팅하게 하면 비효율 적이라, 포멧팅한 결과를 저장 해놔서 안된 곳만 해줍니다.
  prettier는 node_modules에 cache파일이 있다.

### 단축키 설정

- pakage.json의 script 설정

  `"format" : prettier --write --cache .`
  `npm run format으로 실행가능합니다.`

공통 설정
공통 설정을 하는 이유

✌️ Vscode 설정에 formatOnSave란 설정을 하면, 저장 시 prettierrc가 적용되게 할 수 있다.

✌️ 이것은 개인의 설정에만 해당되는데, 모두가 하는 프로젝트에는 공통적으로 규칙을 정해줄 수 있는 방법이 있다.

✌️ husky로 자동화를 해놓을 경우에는 불필요할 수 있다.

공통 적용

✌️ vs코드 최상단에 .vscode => settings.json을 만들어준다.

{
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode"
}
