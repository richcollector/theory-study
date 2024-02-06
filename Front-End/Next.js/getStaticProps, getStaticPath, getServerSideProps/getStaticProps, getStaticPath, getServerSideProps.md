### 정적 생성 (Static Generation)

빌드 타임에 모든 필요한 HTML을 미리 생성하는 것입니다. 이 HTML은 사용자가 페이지를 요청할 때마다 재사용됩니다. Next.js에서는 기본적으로 정적 페이지를 생성해주지만, 사용하는 방법을 알아봅시다.

- `getStaticProps()`

  정적 생성할 때 필요한 데이터를 받아와서 렌더링하고 싶다면 getStaticProps() 함수를 구현하고 export하면 됩니다.

  "빌드 시에 딱 한 번"만 호출되고, 바로 static file로 빌드되어, 빌드 이후 수정이 불가능합니다.
  data를 빌드시에 미리 호출하여 정적으로 제공하기 때문에 페이지 렌더속도가 빠릅니다. 때문에 유저의 요청마다 fetch할 필요가 없는 고정된 내용의 페이지를 렌더링할 때 유리합니다.
  `getStaticProps`는 빌드 시 데이터를 가져오며 쿼리 매개변수 또는 HTTP 헤더와 같이 요청 시에만 사용할 수 있는 데이터는 사용할 수 없습니다.
  `getStaticProps`는 `revalidate`이라는 옵션을 통해 주기적으로 데이터를 패칭하여 SSG와 SSR의 장점이 합쳐진 ISR을 구현할 수 있습니다.

```jsx
export async function getStaticProps() {
  const res = await axios("/products/");
  const products = res.data;

  return {
    props: {
      products,
    },
  };
}
```

```jsx
export default function Home({ products }) {
  return <ProductList products={products} />;
}
```

- `getStaticPaths()`

  함수에서는 리턴 값으로 객체를 리턴하는데, paths 라는 배열에서 각 페이지에 해당하는 정보를 넘겨줄 수 있습니다.
  예를 들어서 id 값이 '1'인 페이지를 정적 생성하려면 `{ params: { id: '1' } }`과 같이 쓸 수 있습니다.
  그리고 fallback 이라는 속성을 사용해서 정적 생성되지 않은 페이지를 처리해 줄 것인지 지정할 수 있는데, `fallback: true`면 생성되지 않은 페이지로 접속했을 때 `getStaticProps()` 함수를 실행해 페이지를 만들어서 보여줍니다.

  동적라우팅 + `getStaticProps`를 원할 때 사용합니다. 페이지가 동적 라우팅을 쓰고 있고, `getStaticProps`를 쓰는 경우, `getStaticPaths`을 통해 빌드 타임 때 정적으로 렌더링할 경로를 설정해야 합니다. 여기서 정의하지 않은 하위 경로는 접근해도 화면이 뜨지 않습니다. 동적라우팅 할 때, 라우팅 되는 경우의 수를 하나하나 집어넣어야 합니다.

```jsx
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: true,
  };
}
```

### 서버 사이드 렌더링 (Server-Side Rendering, SSR)

- `getServerSideProps`

  이 함수는 각 요청이 일을 때마다 실행되며, 페이지의 props를 반환합니다. 즉, 요청이 들어올 때마다 필요한 데이터를 서버에서 불러온 후, 이를 바탕으로 페이지를 생성합니다.
  `getServerSideProps`는 빌드와 상관없이, page가 요청받을때마다" 호출되어 pre-rendering합니다.

  SSR (Server Side Rendering) 개념으로 pre-render가 꼭 필요한 동적 데이터가 있는 page에 사용한다. 매 요청마다 호출되므로 성능은 getStaticProps에 뒤지지만, 내용을 언제든 동적으로 수정이 가능합니다.

  따라서 `getServerSideProps`는 사용자 대시보드 페이지(내정보 페이지)에 적합합니다. 대시보드는 사용자 고유의 개인 페이지이므로 SEO는 관련이 없으며 페이지를 미리 렌더링할 필요가 없으며, 데이터는 자주 업데이트되므로 요청 시간 데이터를 가져와야 합니다.

  getServerSideProps를 정말 필요할 때만 사용하라고 권고하는데, CDN에 캐싱되지 않기 때문에 느리기 때문입니다.
  데이터를 미리 가져올 필요가 없다면 클라이언트 측에서 데이터를 가져오는 것도 고려해봐야 합니다.
  (ex. 사용자 대시보드는 사용자별 비공개 페이지이므로 SEO와 관련 없으며 미리 렌더링할 필요가 없습니다.)

```jsx
// \_app.tsx의 pros로 받아옴
export default function OpengraphProviderPage(props: any): JSX.Element {
  return (
    <>
      <Head>
        <meta property="og:title" content={props?.qqq.name} />
        <meta property="og:description" content={props?.qqq.remarks} />
        <meta property="og:image" content={props?.qqq.images?.[0] ?? ""} />
      </Head>
      <div>중고마켓에 오신 것을 환영합니다!(여기는 Body입니다.)</div>
    </>
  );
}
```

```jsx
// 1. getServerSideProps는 존재하는 단어이므로 변경 불가능
// 2. 여기는 서버에서만 실행됨(프론트엔드 서버프로그램 => webpack 서버프로그램)
export const getServerSideProps = async (): Promise<any> => {
  // 백엔드에 데이터 요청 로직
  console.log("여기는 서버입니다.");

  // 1. 여기서 API 요청
  const graphQLClient = new GraphQLClient(
    "https://backend-practice.codebootcamp.co.kr/graphql"
  );

  const result = await graphQLClient.request<Pick<IQuery, "fetchUseditem">>(
    FETCH_USEDITEM,
    {
      useditemId: "63ffe9bcaef9f000281b308d",
    }
  );

  // 2. 받은 결과를 return
  return {
    props: {
      qqq: {
        name: result.fetchUseditem.name,
        remarks: result.fetchUseditem.remarks,
        images: result.fetchUseditem.images,
      },
    },
  };
};
```

### getInitialProps 을 사용하지 않는 이유

만약 모든 페이지에 공통적인 데이터 패칭이 필요하다면 \_app.tsx에서 전역적 데이터를 패칭해야 하는데, `getInitialProps` 이라는 기능을 사용합니다. 하지만 이 방식을 사용하면 SSR 계산없이 페이지를 정적 HTML으로 사전렌더링 해서 최적화를 하는 자동 정적 최적화(Automatic Static Optimization)가 비활성화되어 모든 페이지가 SSR을 통해 제공되게 됩니다.

때문에 Next.js 9.3버전 이후엔 이런 것을 방지하고자 SSR과 SSG를 분리해 Static Generation(정적 생성)인 `getStaticProps`, `getStaticPath`와 `getServerSideProps`로 나눠졌으며, 전역적인 데이터 패치 기능을 지원하지 않습니다.

### 참고자료

- [Next.js의 데이터패칭 방식: getStaticProps, getStaticPath, getServerSideProps은 언제 사용하는가?](https://velog.io/@te-ing/Next.js%EC%9D%98-%EB%8D%B0%EC%9D%B4%ED%84%B0%ED%8C%A8%EC%B9%AD-%EB%B0%A9%EC%8B%9D-getStaticProps-getStaticPath-getServerSideProps%EC%9D%80-%EC%96%B8%EC%A0%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94%EA%B0%80#getstaticpaths-static-generation)
