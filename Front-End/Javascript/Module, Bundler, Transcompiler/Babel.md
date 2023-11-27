## 바벨

바벨은 기본적으로 자바스크립트의 최신문법 및 사양을 지원하지 않는 브라우저에서도 쓸 수 있게끔 변환해주는 transcompiler이다.

### 사용하는 이유?

크로스 브라우징의 문제로 바벨이 탄생되었다. 크로스 브라우징이란 브라우저나 플랫폼마다 보여지는 모습이 다른 경우가 많은데, 이러한 차이를 최소화하여 브라우저, 환경에 영향을 최소한으로 받고 해당 웹 서비스를 사용할 수 있게 최적화를 하는 작업을 말한다.

이러한 크로스 브라우징 이슈를 해결하기 위해 생겨난 툴이 바벨이다. ES6+ 버전의 자바스크립트나 타입스크립트, JSX 등 다른 언어로 분류되는 언어들에 대해서도 모든 브라우저에서 동작할 수 있도록 호환성을 지켜준다.

loader에서는 이러한 바벨 등의 프론트엔드 빌드 과정을 웹팩의 번들링과 함게 쓸 수 있게 해주는 것이다. 번들링을 하면서 필요한 전처리나 컴파일까지 할 수 있다니 일석이조인데, 사용하지 않을 이유가 있을까?

바벨 외에도 타입스크립트를 컴파일해주는 ts-loader, css파일을 import 해주는 css-loader등이 있다

### 설치 방법

```jsx
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader

@babel/core : 바벨의 코어 패키지
@babel/cli :커맨드라인에서 파일을 컴파일하게 해주는 CLI 제공
@babel/preset-env : 구문변환에 대한 별도의 설정없이 최신 자바스크립트를 구형 브라우저에 사용할 수 있게 해주는 스마트 사전
@babel-loader: 바벨이랑 웹팩을 연결해준다
```

### 설정

```jsx
module: {
        rules: [
            {
            test: /\\.ts?$/,
            exclude : /node_modules/,
            loader:'ts-loader',
            },
            {
            test: /\\.css$/,
            use: ['style-loader','css-loader']
            },
            {
          test: /\\.jsx?$/,
          loader: 'babel-loader', //js나jsx파일에 바벨로더를 적용해 최신문법이 옛날 브라우저에서도 돌아갈 수 있도록 해준다.
          options: {
            presets: [
          [
            '@babel/preset-env', {
              targets: { node: 'current' }, // 노드일 경우만
              modules: 'false',
              useBuiltIns: 'usage'
            }
          ],
          '@babel/preset-react', // 리액트를 쓴다면
          '@babel/preset-typescript' // 타입스크립트를 쓴다면
        ],
        ]
    },
```

- test : 로딩할 파일을 지정
- exclude : 제외할 폴더나 파일로, 바벨로 컴파일하지 않을 것들을 지정. 보통 node_modules
- target : 지원하길 원하는 환경을 적는 곳
  - 현재 최신 버전 노드로 되어있는데 구 버전 노드 버전을 적어주면 구 버전 문법을 지원하기 위해 폴리필들이 추가되며, 노드 대신 브라우저를 타겟으로 할 수도 있다
- modules를 false로 설정 : 최신모듈 시스템이 그대로 유지되면서 트리 쉐이킹이 된다.
  - 트리쉐이킹이란 ES2015 모듈 시스템에서 import 되지 않은 export들을 정리해주는 기능으로, 용량이 많이 줄어들기 때문에 꼭 사용하는 것을 권장한다. 단, commonJS나 AMD, UMD같은 모듈 시스템을 사용해야하는 클라이언트에서는 쓰면 제대로 처리되지 않는다.
