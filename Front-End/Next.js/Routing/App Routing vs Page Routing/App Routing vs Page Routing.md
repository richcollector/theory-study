## App Routing vs Page Routing

next의 docs가 app/pages router에 따라 두 가지 버전으로 나뉠만큼, next의 모든 기술은 router를 기반으로 동작합니다.

### Routing

next.js는 파일 시스템을 기반으로 라우팅을 구현합니다.

#### built-on

- App Router

  서버 중심 라우팅

  - react server components를 기반으로 구축되어 있습니다.
  - 가장 핵심적인 변화입니다.
  - 서버 데이터 가져오기에 맞춰져 있습니다.
  - 하지만 경로 이동시 페이지를 다시 렌더링하지 않고, SPA처럼 URL만 업데이트하고 next는 변경된 세그먼트만 렌더링합니다.

- Pages Router

  클라이언트 중심 라우팅

#### location

- App Router

  - app 디렉토리를 사용합니다.
  - app 하위에 모든 파일을 함께 구성할 수 있습니다. [colocation](https://nextjs.org/docs/app/building-your-application/routing#colocation)
    - 디렉토리로 경로를 정의합니다.
    - 페이지를 위한 파일은 page.js
    - server-side API를 위한 파일은 route.js
    - 나머지 파일 컨벤션은 여기를 [참고](https://nextjs.org/docs/app/api-reference/file-conventions)
  - pages router보다 우선순위가 높습니다.

```
src/app
├─layout.js // root layout. 필수
├─page.js // root page
├─a-page
└─page.js
└─b-page
└─page.js
└─component.js // 라우팅과 관련없는 코드. 라우팅의 대상이 되지 않습니다
└─b-subpage
└─page.js
```

- Pages Router

  - pages 디렉토리를 사용합니다.
  - pages 하위에 있는 모든 JS 파일이 페이지/API 경로가 됩니다.
    - 디렉토리, 파일명으로 경로가 설정됩니다.
    - pages/index.js =>/
    - pages/a-page.js => /a-page
    - pages/b-page/index.js => /b-page
    - pages/b-page/b-subpage.js => /b-page/b-subpage
    - pages/b-page/component.js => /b-page/component // 모든 파일이 경로가 되어버림
  - 따라서 component.js 같은 파일은 pages 디렉토리 외부에 위치합니다.

```
src/pages
├─_app.js // root layout
├─index.js // root page
├─a-page.js
└─b-page
└─index.js
└─component.js // 라우팅과 관련없는 코드지만 b-page/component라는 경로가 생깁니다.
└─b-subpage.js
```

#### Layout

- App Router

  - app 디렉토리 내에 root layout을 [필수](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)로 포함해야합니다.
  - root layout뿐 아니라 각 layout을 [compose](https://nextjs.org/blog/next-13-4#server-actions-alpha) 할 수 있습니다.
  - 데이터 패칭 또한 동시에 가능합니다.

- Pages Router

  - 전역 공유 layout을 지정하기 위해 \_app 을 사용합니다.
  - 단, 여러 layout을 compose 할 수 없습니다.
  - data fetching과 component를 함께 배치할 수 없습니다.

#### Advanced

- App Router

  - [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) : 동일한 레이아웃에서 하나 이상의 페이지를 동시/조건부로 렌더링할 수 있습니다.
  - [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) : 현재 페이지의 컨텍스트를 유지하면서 현재 레이아웃 내에서 경로를 로드할 수 있습니다.

A 페이지(/feed)에서 모달을 띄울 때, A페이지를 유지하면서 모달의 경로로 url을 변경 (post/13)할 수 있습니다. 이때, A페이지는 모달 뒤에 유지됩니다.

### Rendering

렌더링은 작성한 코드를 사용자 인터페이스로 변환하는 것입니다.
next는 기본적으로 모든 경로의 페이지에 대한 HTML 파일을 사전에 렌더링합니다.

브라우저에서 해당 페이지 경로에 접근하면, 사전 렌더링된 HTML과 연결된 최소한의 JS 파일이 전달되고 브라우저에서 JS가 실행되면서 페이지와 완전히 상호작용합니다. (이를 Hydration라고 합니다.)

#### SSG (static site generation)

- App Router

  - server/client component에 따라 다르게 동작합니다.
    - server component는 렌더링되어 HTML을 생성합니다.
      - 관련 javascript 코드가 클라이언트로 전송되지 않습니다.
    - client component는 HTML 및 JSON을 미리 렌더하고, 서버에 캐싱됩니다.
      - 캐싱 결과는 클라이언트로 전송되어 hydration 됩니다.

- Pages Router

  - app router의 client component와 동일하게 동작합니다.

#### ISR (incremental static regeneration)

- App Router

  - 공식문서(app router)에서 언급이 사라졌습니다.

- Pages Router

  - SSG는 최초 빌드시에 생성한 정적페이지를 캐싱하고 계속 사용하지만, ISR은 주기적으로 정적페이지를 재생성합니다.
  - getStaticProp의 반환값에 revalidate 필드를 추가하면 됩니다.

### SSR (server side rendering)

- App Router

  - 공식문서(app router)에서 Dynamic Rendering이란 명칭으로 언급됩니다
  - 정적 렌더링 중에 동적기능 / 동적 fetch(), searchParams prop 등이 감지되면 해당 경로를 Dynamic Rendering 대상으로 판단합니다
    - 동적기능 : cookies(), headers() in server component
    - 동적 fetch() : no-store , revalidate : 0 옵션이 있는 fetch

- Pages Router

  - 페이지에 접근할 때 마다 필요한 데이터를 가져오고 서버에서 렌더링합니다.
  - getServerSIdeProps를 사용합니다.

### Data Fetching

#### Method

- App Router

  - getServerSideProps, getStaticProps, getInitialProps와 같은 메서드는 더이상 사용하지 않습니다.
  - react server component 기반이기 때문에, 일반적인 방법으로 서버 데이터를 가져옵니다.
    - 서버 데이터베이스 리소스에 직접 접근 가능
    - 민감한 정보 클라이언트에 노출 x
    - 성능향상
    - 빌드(next build)시에 데이터 패칭이 이루어지고, 캐싱됩니다.
    - useEffect를 사용하여 데이터를 패칭하고, 상태를 변경하는 방식에서 벗어납니다.
  - 클라이언트 측에서 데이터를 가져오는 것도 여전히 가능합니다.
  - 요청을 캐싱하고, 중복을 제거합니다. (POST 제외)

- Pages Router

  - getinitialProps : 이미 서버에 있는 데이터를 이용해서 서버 사이드 렌더링을 할 떄 사용합니다.
  - getServerSIdeProps : 페이지 접근할 때 마다 서버 사이드 렌더링에 필요한 데이터를 가져올 때 사용합니다. (최신 데이터가 필요할 때)
  - getStaticProps : next build 시 정적 페이지를 생성할 때 필요한 데이터를 가져올 때 사용합니다.

### Static Export

next는 기본적으로 모든 경로의 페이지에 대한 HTML 파일을 사전 렌더링합니다. SSG (Static-Site-Generation)

[공식문서에서는 app router를 사용하는 것을 권장합니다.](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) (static export와 관해 기능이 추가되었습니다.)

#### Data Fetching

- App Router

  react server component를 사용하기 때문에 getStaticProps가 필요하지 않습니다. async/await 문법으로 바로 데이터를 가져올 수 있습니다.

- Pages Router

  getStaticProps : 정적페이지 생성시 필요한 데이터를 패칭해서 컴포넌트에 전달합니다.

#### Dynamic Path

- App Router

  getStaticPaths 대신 generateStaticParams를 사용합니다.

- Pages Router

  getStaticPaths : 동적 경로의 정적페이지를 생성할때 사용합니다.

#### Supported Feature

- App Router

  - image optimization
  - 구현체가 변경되었습니다.
    - 기존(next@12) next/image → next/legacy/image로 변경되었습니다.
    - 기존 next/futrue/image → next/image로 변경되었습니다.
    - next/image를 사용하려면 이미지들에 대한 alt를 모두 넣어주지 않으면 빌드가 되지 않고, px값을 모두 명시적으로 적어줘야한다고 합니다.
  - Server/Client Component
    - use server, use client 지시문 사용
  - route handlers
    - next build 시 정적 응답 객체 생성 가능
  - Browser APIs
    - Client Component의 경우에 window 객체에 접근한다던가 가능
  - [상세내용](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#supported-features)

### 참고자료

- [[Next JS] Pages Router 에서 App Router 전환기](https://www.timegambit.com/blog/blog-log/app-router)
- [[nextjs] 13.4.0부터 안정화된 App Router. Pages Router와 비교](https://velog.io/@jjunyjjuny/nextjs-13.4.0%EB%B6%80%ED%84%B0-%EC%95%88%EC%A0%95%ED%99%94%EB%90%9C-App-Router.-Pages-Router%EC%99%80-%EB%B9%84%EA%B5%90)
