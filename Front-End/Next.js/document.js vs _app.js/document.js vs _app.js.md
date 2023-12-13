## \_document.js 파일과 \_app.js 파일

### 공통점

일단 \_document.js 파일과 \_app.js 파일은 Next.js 애플리케이션에서 만들어지는 각각의 페이지에 대해 기능적인 오버 라이딩을 할 수 있게 해 주고, 두 파일 모두 Next.js 애플리케이션에서 모든 페이지에 대해 글로벌한 컨트롤을 할 수 있게 해 줍니다.

### 차이점

가장 기본적인 차이점은 \_document.js파일은 우리의 .jsx 파일에서 특정 HTML 엘러먼트에 대해서만 오버 라이딩할 수 있게 해 줍니다.

반면에 \_app.js파일은 .jsx파일에서의 React와 Next.js 관련 엘러먼트를 컨트롤할 수 있게 해 줍니다.

표로 간단히 구분해 보았습니다.

|          Feature           | \_document.js | \_app.js |
| :------------------------: | :-----------: | :------: |
|   Control HTML Body Tag    |       O       |    O     |
|   Control HTML Head Tag    |       O       |    O     |
|   Modify React Elements    |       X       |    O     |
|   getStaticProps Support   |       X       |    X     |
| getServerSideProps Support |       X       |    X     |

### 언제 \_document.js 파일을 써야 할까요?

.jsx 파일에서 단순하게 HTML의 엘레먼트를 컨트롤하려고 할 때, 특히 head 태그를 컨트롤하려고 할 때 쓰면 됩니다

예제 \_document.js 파일

```jsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### 그럼 \_app.js파일은 언제 써야 할까요?

.jsx 파일에서 글로벌하게 React나 Next.js 엘리먼트를 컨트롤하고 싶을 때 쓰면 됩니다.

예제 \_app.js 파일

```jsx
import type { AppProps } from "next/app";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

### 결론

두 파일 모두 비슷한 기능이 있지만 쉽게 설명하면 HTML 엘리먼트를 액세스하고 싶으면 \_document.js 파일을 쓰고,
React나 Next.js 엘리먼트를 액세스하고 싶으면 \_app.js 파일을 쓰면 됩니다.

### 참고자료

- [Next.js에서 \_document.js와 \_app.js의 차이점 파헤치기](https://mycodings.fly.dev/blog/2022-07-23-comparing-the-document-and-app-file-in-next-js)
