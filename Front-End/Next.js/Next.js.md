## Next

### Pre-rendering

웹 페이지의 HTML을 서버에서 미리 생성하는 작업을 말합니다. 브라우저에 전달하여 빠르게 구조를 먼저 보여줍니다. React 프로젝트를 Next.js를 통해 프리렌더링을 하면 빈 HTML 대신 프리렌더링된 HTML 파일을 제공하므로 검색엔진 최적화가 가능합니다.

#### 프리렌더링 예제

- process.browser

```jsx
if (process.browser) {
  console.log("지금은 브라우져입니다.");
  const result = localStorage.getItem("accessToken");
  setAccessToken(result ?? "");
} else {
  console.log("지금은 프론트엔드 서버입니다.");
}
```

- typeof window

```jsx
if (typeof window !== "undefined") {
  console.log("나는 브라우져입니다.");
} else {
  console.log("지금은 프론트엔드 서버입니다.");
}
```

### 정적 생성 (Static Generation)

빌드 타임에 모든 필요한 HTML을 미리 생성하는 것입니다. 이 HTML은 사용자가 페이지를 요청할 때마다 재사용됩니다. Next.js에서는 기본적으로 정적 페이지를 생성해주지만, 사용하는 방법을 알아봅시다.

- getStaticProps()

  정적 생성할 때 필요한 데이터를 받아와서 렌더링하고 싶다면 getStaticProps() 함수를 구현하고 export하면 됩니다.

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

- getStaticPaths()

  함수에서는 리턴 값으로 객체를 리턴하는데, paths 라는 배열에서 각 페이지에 해당하는 정보를 넘겨줄 수 있습니다. 예를 들어서 id 값이 '1'인 페이지를 정적 생성하려면 { params: { id: '1' } }과 같이 쓸 수 있다.
  그리고 fallback 이라는 속성을 사용해서 정적 생성되지 않은 페이지를 처리해 줄 것인지 지정할 수 있는데, fallback: true면 생성되지 않은 페이지로 접속했을 때 getStaticProps() 함수를 실행해 페이지를 만들어서 보여줍니다.

```jsx
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: true,
  };
}
```

### 서버 사이드 렌더링 (Server-Side Rendering, SSR)

사용자가 페이지를 요청할 때마다 HTML을 생성합니다. 자주 업데이트되거나, 각 사용자에게 개별적으로 맞춤화된 콘텐츠를 제공해야할 때 적합합니다.

- getServerSideProps

  이 함수는 각 요청이 일을 때마다 실행되며, 페이지의 props를 반환합니다. 즉, 요청이 들어올 때마다 필요한 데이터를 서버에서 불러온 후, 이를 바탕으로 페이지를 생성합니다.

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

### Link의 필요성

- Link 이동

  바로이동이 되기 떄문에 클릭으로 이동되는 경우에 사용해주는 것이 좋습니다.

- onClick 이동

  버튼을 클릭해서 이동하는 경우가 아닌 경우
  클릭시 추가 로직을 실행시키고 싶은경우 (함수사용)
  게시글등록해서 함수실행 후 이동 이기 때문에, 이런 경우에 사용을 해준다.

### 라우팅

- const router = useRouter()

  페이지 이동
  현재 주소
  주소 관련된 기능들
  파일기반 라우팅

next.js는 파일경로를 기준으로 라우팅되는 파일기반 라우팅입니다. 따로 라우팅 코드를 작성하지 않기 떄문에 코드의 양을 줄일 수 있다. 그리고 폴더 구조가 곧 경로이기때문에 가독성이 좋습니다.

### 코드기반 라우팅

react는 react-router-dom이라는 라이브러리를 따로 다운을 받아 코드를 작성한 후
거기에 맞는 url에 들어간다면 라우팅되는 코드기반 라우팅입니다. 자유로운 폴더구조를 만들 수 있습니다.

### 정적 라우팅

정적 라우팅은 경로와 해당 경로에 대한 컴포넌트 또는 페이지를 미리 정의하여 사용하는 방식이다. 웹 애플리케이션의 경로와 컴포넌트 간의 매핑을 사전에 설정하여 각 경로마다 특정 컴포넌트가 렌더링되도록 할 수 있습니다. 정적 라우팅은 파일 이름이나 경로 구조를 기반으로 설정될 수 있으며, 일반적으로 많은 정적 페이지를 가진 웹 사이트에서 사용됩니다.

### 동적 라우팅

동적 라우팅은 경로의 일부를 매개변수로 사용하여 동적으로 생성되는 컴포넌트나 페이지를 처리하는 방식입니다. 예를 들어, 사용자의 아이디나 게시물의 ID를 경로에 포함하여 해당 사용자나 게시물의 정보를 동적으로 가져올 수 있습니다. 동적 라우팅은 파일 기반 시스템에서도 가능하며, 매개변수 부분을 변수로 취급하여 해당 변수에 따라 동적으로 컴포넌트를 렌더링합니다.

- Next.js에서의 동적라우팅

```jsx
  router.push(/board/1) 해당 주소로 이동
  pathname === route
  board 폴더 안에 폴더를 [board_id] 만들면 그 안의 index.js 실행
  router.asPath 폴더상의 주소
  router.query.board_id에 접속주소의 값인 1이 담아진다.
```

### 알아두면 좋을 내용

- 클라이언트 사이드 렌더링 (Client-Side Rendering, CSR)

  웹 애플리케이션의 렌더링을 클라이언트 측에서 처리하는 방식입니다. CSR은 SSR보다 초기 전송되는 페이지의 속도는 빠르지만 서비스에서 필요한 데이터를 클라이언트(브라우저)에서 추가로 요청하여 재구성해야 하기 때문에 전제적인 페이지 완료 시점은 SSR보다 느려집니다.

- SPA

Single Page Application 하나의 큰화면을 다가져오고 그 중 일부를 보여주는 것입니다.

- MPA

MPA(Multi Page Application) 스프링 방식과 같이 페이지마다 view가 존재하는 것입니다.

- 하이드레이션

클라이언트 측 javaScript가 이미 레더링된 HTML 마크업을 가져오는 과정을 말합니다. JavaScript는 HTML 요소에 이벤트 리스너를 추가하거나, DOM 조작을 통해 동적인 기능을 추가하는 등의 작업을 수행합니다.

- TTV

Time to View 프리렌더링이 되고, 처음화면이 나오는 시간을 이야기합니다.

- TTI

Time to Interact 하이드레이션 되고 나서 버튼 눌리는 시간까지를 이야기 합니다.
이때 onClick, js설정이 가능해집니다.

- 시멘틱 태그

의미가 있는 태그를 사용하여 검색 엔진에 잘 검색되도록 만들어 주는 것입니다.
<a>태그는 새로 다운받아서 그려줘라는 기능이 들어 있습니다. CSR <a>는 <Link>태그라, Next독스에서는넣어 주어 a링크는 기능을 안하는 걸로 사용하는 것을 추천합니다.

위처럼 해주는 까닭은 검색엔진의 최적화(SEO)를 위해서 넣어줍니다.

<div>요리 보단 <h1>요리

- 템플릿 리터럴

  감싸주어 사용해야, 해당 값으로 이동하는 링크를 쉽게 구현할 수 있습니다.
  `/board/${result.data.createBoard.number}`

- 함수가 아닐 때 props를 받는 법

```jsx
export const BlueButton = styled.button`
  background-color: ${(props) => (props.isActive === true ? "yellow" : "")};
`;
```

- map index를 키로 주지 않기

아래 것이 삭제 되면서 위로 올라가서 삭제가 안 된 상태로 인식 할 수 있습니다. 유일하지 않은 값이라서 발생하는 문제로 uuid라이브러리를 이용하여 난수를 생성하는 식으로 해결할 수 있습니다.

- uuid

  Universally Unique Identifier(범용 고유 식별자)를 생성하기 위해 사용되는 라이브러리입니다.

  - v1 (타임스탬프와 랜덤 정보)

    UUID 버전 1은 현재 시간과 MAC 주소 등을 결합하여 생성됩니다. 이로 인해 생성 시간을 기반으로 한 순차적인 UUID가 생성됩니다. 그러나 MAC 주소를 사용하므로 개인 정보 보호 문제가 있을 수 있습니다.

  - v2 (DCE 보안)

    UUID 버전 2도 시간 기반이지만 DCE(Distributed Computing Environment) 보안 모델을 따릅니다. 잘 사용되지 않습니다.

  - v3 (이름 기반)

    UUID 버전 3은 명시적으로 지정된 이름(문자열)과 네임스페이스를 사용하여 생성된다. 이를 해시화하여 UUID를 생성합니다. 동일한 이름과 네임스페이스로 생성되는 UUID는 항상 동일합니다.

  - v4 (랜덤)

    UUID 버전 4는 완전한 랜덤성을 가지며, 난수 생성기를 사용하여 생성됩니다. 보통 가장 많이 사용되며, 사생활 문제가 없습니다. 따라서 대부분의 용도에 적합한 UUID 버전입니다.

  - v5 (이름 기반)

    UUID 버전 5는 v3와 유사하지만 해시 함수로 SHA-1을 사용합니다. v3보다 더 강력한 보안을 제공합니다.

- Frangment

div가 필요할 때만 div로 그리고 아닌 것 들은 무의미한 div 사용을 지양하는 것이 좋습니다. 성능상의 문제가 조금이라도 발생할 수 있기 때문입니다.
