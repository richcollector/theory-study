## Webpack

### 프로젝트 설정하기

yarn init -y로 리액트 프로젝트를 초기화하고,
사용할 라이브러리들을 한번에 설치해준다.

`yarn add -D @babel/core @babel/preset-env @babel/preset-react babel-loader clean-webpack-plugin css-loader html-loader html-webpack-plugin mini-css-extract-plugin node-sass react react-dom sass-loader style-loader webpack webpack-cli webpack-dev-server`

- 사용한 버전

```jsx
"devDependencies": {
"@babel/core": "^7.4.3",
"@babel/preset-env": "^7.4.3",
"@babel/preset-react": "^7.0.0",
"babel-loader": "^8.0.5",
"clean-webpack-plugin": "^2.0.1",
"css-loader": "^2.1.1",
"html-loader": "^0.5.5",
"html-webpack-plugin": "^3.2.0",
"mini-css-extract-plugin": "^0.5.0",
"react": "^16.8.6",
"react-dom": "^16.8.6",
"sass-loader": "^7.1.0",
"style-loader": "^0.23.1",
"webpack": "^4.29.6",
"webpack-cli": "^3.3.0",
"webpack-dev-server": "^3.3.1",
"sass": "^1.69.4"
}
```

### 자바스크립트 파일 빌드하기

src 하위 파일로 test.js 파일을 아래와 같이 작성해 준고, package.json 파일로 이동한 다음 build:webpack 스크립트를 추가한다.
터미널에서 yarn build를 하게 되면, build 폴더에 bundle.js 파일을 볼 수 있다.

- 사용법

```jsx
const path = require("path");

module.exports = {
  entry: "./src/test.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
  },
  mode: "none",
};
```

- entry

  웹팩이 빌드할 파일을 알려주는 역할을 하고, src/test.js 파일 기준으로 import 되어 있는 모든 파일들을 찾아 하나의 파일로 합치게 된다.

- output

  웹팩에서 빌드를 완료하면, output에 명시되어 있는 정보를 통해 빌드 파일을 생성한다.

- mode

  웹팩 빌드 옵션으로, production은 최적화되어 빌드되어지는 특징을 가지고, development는 빠르게 빌드하는 특징, none 같은 경우는 아무 기능 없이 웹팩으로 빌드한다.

### HTML 파일 빌드하기

웹팩은 자바스크립트 파일뿐만 아니라 자바스크립트가 아닌 파일들도 모듈로 관리 할 수 있다.
로더(loader)라는 기능으로 자바스크립트 파일이 아닌 파일을 웹팩이 이해할 수 있게 해준다.
yarn build 명령어를 실행해 주면 다음과 같이 build/index.html 파일이 생성되어 있는 모습을 볼 수 있다.

- 사용법

```jsx
module : {
	rules: {
		test: '가지고올 파일 정규식',
		use: [
			{
				loader: '사용할 로더 이름',
				options: { 사용할 로더 옵션 }
			}
		]
	}
}
```

public 폴더에 index.html 파일을 만들어 주고, webpack.config.js 파일에 html 관련 코드를 추가해준다. 로더 설정으로 html 파일을 읽었을 때 html-loader를 실행하여 웹팩이 이해할 수 있게 하고 options로는 minimize 라는 코드 최적화 옵션을 사용하고 있다.

- index.html

```jsx
<!DOCTYPE html>
<html lang="kr">
  <head>
    <meta charset="utf-8" />
    <title>WEBPACK4-REACT</title>
  </head>
  <body>
    <noscript>스크립트가 작동되지 않습니다!</noscript>
    <div id="root"></div>
  </body>
</html>
```

- webpack.config.js

```jsx
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/test.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html", // public/index.html 파일을 읽는다.
      filename: "index.html", // output으로 출력할 파일은 index.html 이다.
    }),
  ],
};
```

minimize 옵션이 켜져 있어서 파일 내용이 한줄로 되어 있고, minimize 옵션을 꺼주시면 줄바꿈된 형태로 보여진다. 또한 HtmlWebpackPlugin은 웹팩 빌드시 output에 있는 bundle.js를 자동으로 import 한다.

- html-webpack-plugin

  웹팩이 html 파일을 읽어서 html 파일을 빌드할 수 있게 해준다.

### 리액트 빌드하기

- src/index.html

```jsx
import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";

ReactDOM.render(<Root />, document.getElementById("root"));
src / Root.js;

import React from "react";

const Root = () => {
  return <h3>Hello, React</h3>;
};

export default Root;
```

- .babelrc

바벨 (babel)은 ES6에서 ES5로 자바스크립트를 변환해주는 역할을 한다. ES6와 리액트를 ES5로 변환할 수 있게 해준다는 내용입니다.

```jsx
{
"presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

- webpack.config.js
  entry와 rules에 babel-loader를 추가

```jsx
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html", // public/index.html 파일을 읽는다.
      filename: "index.html", // output으로 출력할 파일은 index.html 이다.
    }),
  ],
};
```

### CSS 사용

- src/style.css

```jsx
.title {
  color: #2196f3;
  font-size: 52px;
  text-align: center;
}
```

－ src/root.js
style.css import 하기

```jsx
import React from "react";
import "./style.css";

const Root = () => {
  return <h3 className="title">Hello, React</h3>;
};

export default Root;
```

- webpack.config.js

  CSS를 읽을 수 있게 해주는 css-loader를 추가하고, 추출해서 파일로 저장하는 MiniCssExtractPlugin을 적용한다.

  use에 있는 loader 순서는 오른쪽에서 왼쪽 순서로 실행이 되고, css-loader로 css 파일을 읽고 MniCssExtractPlugin.loader로 읽은 CSS를 파일로 추출해 낸다.

```jsx
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html", // public/index.html 파일을 읽는다.
      filename: "index.html", // output으로 출력할 파일은 index.html 이다.
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
```

### scss 사용하기

- src/style.scss

```jsx
$fontColor: #2196f3;
$fontSize: 52px;

.title {
color: $fontColor;
font-size: $fontSize;
text-align: center;
}
```

－ src/Root.js

```jsx
import React from "react";
import "./style.scss";

const Root = () => {
  return <h3 className="title">Hello, React</h3>;
};

export default Root;
```

- webpack.config.js
  sass-loader를 추가하면, sass-loader로 scss 파일을 읽고 css로 변환한 후 css-loader로 css 읽는다. 그 후 MiniCssExtractPlugin으로 읽은 CSS를 파일로 추출한다.

```jsx
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html", // public/index.html 파일을 읽는다.
      filename: "index.html", // output으로 출력할 파일은 index.html 이다.
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
```

### 개발서버 적용

- webpack.config.js

  webpack-dev-server 추가하여, 소스 코드를 수정할 때마다 알아서 웹팩이빌드해준다.

```jsx
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
  },
  devServer: {
    contentBase: path.resolve("./build"),
    index: "index.html",
    port: 9000,
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html", // public/index.html 파일을 읽는다.
      filename: "index.html", // output으로 출력할 파일은 index.html 이다.
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
```

- package.json

```jsx
"scripts": {
"build": "webpack",
"start": "webpack-dev-server --hot"
}
```

### 빌드 폴더 정리

- webpack.config.js

  - filename을 style-test.css로 변경 후 빌드

    여전히 안쓰이는 style.css가 있다.

  ```jsx
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html", // public/index.html 파일을 읽는다.
      filename: "index.html", // output으로 출력할 파일은 index.html 이다.
    }),
    new MiniCssExtractPlugin({
      filename: "style-test.css",
    }),
  ];
  ```

- clean-webpack-plguin 추가
  사용 안하는 폴더를 삭제 해준다.

  ```jsx
  const CleanWebpackPlugin = require("clean-webpack-plugin");

  module.exports = {
    ...,
    plugins: [
      new HtmlWebPackPlugin({
        template: './public/index.html', // public/index.html 파일을 읽는다.
        filename: 'index.html' // output으로 출력할 파일은 index.html 이다.
      }),
      new MiniCssExtractPlugin({
        filename: 'style-test.css'
      }),
      new CleanWebpackPlugin()
    ]
  };
  ```

### 빌드 모드 나누기

mode를 development, production 중에서 선택한 차이점이 있다. 추후에 맞는 플러그인들을 적용하면서 붙여나가기 시작하면 mode에 따라 강점들이 생긴다.

- Development

  빠르게 빌드하기 위해 빌드할 때 최적화를 안한다.

  - config/webpack.config.dev.js

  ```jsx
  const path = require("path");
  const HtmlWebPackPlugin = require("html-webpack-plugin");
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const CleanWebpackPlugin = require("clean-webpack-plugin");

  module.exports = {
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../build"),
    },
    mode: "development",
    devServer: {
      contentBase: path.resolve(__dirname, "../build"),
      index: "index.html",
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: "/node_modules",
          use: ["babel-loader"],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new CleanWebpackPlugin(),
    ],
  };
  ```

- Production

  빌드할 때 최적화 작업을 한다.

  - config/webpack.config.prod.js

  ```jsx
  const path = require("path");
  const HtmlWebPackPlugin = require("html-webpack-plugin");
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const CleanWebpackPlugin = require("clean-webpack-plugin");

  module.exports = {
    entry: "./src/index.js",
    output: {
      filename: "bundle.[contenthash].js",
      path: path.resolve(__dirname, "../build"),
    },
    mode: "production",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: "/node_modules",
          use: ["babel-loader"],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new CleanWebpackPlugin(),
    ],
  };
  ```

- package.json

  ```jsx
  "scripts": {
  "start": "webpack-dev-server --config ./config/webpack.config.dev --hot",
  "build": "webpack --config ./config/webpack.config.prod"
  },
  ```
