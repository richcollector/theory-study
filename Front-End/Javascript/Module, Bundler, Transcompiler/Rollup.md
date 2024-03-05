## Rollup

Rollup의 정체성은 "확장"에 있습니다.

작은 코드조각들을 거대하고 복잡한 어플리케이션 혹은 라이브러리로 만들어 준다고 스스로 소개합니다.
같은 소스코드를 다양한 환경에 맞춰 다르게 발드하는 것을 생각하면 될 것 같습니다.
그러면서 자연스럽게 아래 여론이 형성되었습니다.

"어플리케이션 만들 땐 webpack으로, 라이브러리 만들 땐 rollup으로!"

rollup의 사용방식과 구성방식은 webpack과 거의 흡사합니다.
input과 entry를 설정하고 번들링에 적용할 기능을 plugin 형태로 끼워 넣으면 됩니다.

### 사용법

- rollup.config.js

```js
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    file: "public/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [resolve(), commonjs(), production && terser()],
};
```

```js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.tsx", // 진입점?
    output: [
      {
        file: packageJson.main, // commonjs 형태로 번들링
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module, // ES모듈 형태로 번들링
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(), // peerDependencises에 사용된 라이브러리를 번들에서 제외합니다.
      resolve(), // 외부 노드 모듈을 사용할 수 있게 해줍니다.
      commonjs(), // commonjs 형태 모듈도 해석할 수 있게 해줍니다.
      typescript({ tsconfig: "./tsconfig.json" }), // 타입스크립트를 사용할 수 있게 해줍니다.
      postcss({
        // sass를 사용할 수 있게 해줍니다.
        modules: true,
        use: ["sass"],
      }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      dts.default(), // 타입스크립트 타입 정의를 번들링 해줍니다.
    ],
  },
];
```

### webpack과의 차이점

webpack은 내부적으로 Commonjs를 사용하고 rollup은 typescript(ES6)를 사용합니다.
이로 인해서 아래 특성들이 있다고 볼 수 있습니다.

#### rollup은 ES6 모듈 형태로 빌드할 수 있습니다.

webpack은 CommonJS 형태로만 번들링이 가능했습니다. 물론 webpack v5부턴 ES6로 번들할 수 있습니다.
**라이브러리는 ES6 번들에 생성에 대한 수요가 강합니다.**
ES6 환경에서는 ES6 번들이 사용되고 CommonJS 환경에서는 CommonJS 번들이 사용되도록 해줘야 라이브러리 사용자는 더욱 최적화된 애플리케이션을 빌드해줄 수 있습니다.

#### rollup은 좀 더 빠릅니다.

webpack은 모듈들을 함수로 감싸서 평가하는 방식을 사용하지만 rollup은 모듈들을 호이스팅하여 한번에 평가하기에 성능상 이점이 있습니다.

#### rollup은 더 가벼운 번들을 생성합니다

tree shaking은 기본적으로 ES6 코드에서 제대로 동작합니다.
단순히 레퍼런스되지 않는 코드를 제거하는 것이 아닌 사용되는 모듈만 AST 트리에 포함시키는 방식으로 불필요한 코드를 제거하기 때문입니다.
rollup은 공식 플로그인을 통해서 CommonJS 코드를 ES6 코드로 변환할 수도 있습니다.

#### rollup은 CommonJS 코드를 ES6코드에서 사용할 수 있습니다.

기본적으로 ES6에서는 CommonJS식의 require를 지원하지 않습니다.
webpack에서도 공식적으론 ES6 혹은 CommonJS 한 형태의 코드 베이스를 사용하기를 권장합니다.

### 참고자료

- [차세대 번들러 비교 및 분석 (feat. webpack, rollup, esbuild, vite)](https://bepyan.github.io/blog/2023/bundlers)
