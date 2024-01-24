## Next.js의 CSR, SSG, SSR, ISG

### 클라이언트 사이드 렌더링(CSR, Client-Side Rendering)

자바스크립트를 사용하여 브라우저(클라이언트 사이드)에서 렌더링하는 것을 말하며, 모든 로직, 데이터패칭, 템플릿, 라우팅은 서버가 아닌 클라이언트에서 처리됩니다.

때문에 서버비용이 높지 않으며 첫 로딩 이후의 속도가 빠릅니다. 하지만 SEO에 부적합하며 초기 로드시간이 오래 걸립니다.

#### Next.js에서의 CSR

Next.js에서는 useEffect를 통해 데이터를 CSR을 구현할 수 있습니다. 하지만 Next.js에서 CSR을 구현하려면 useEffect를 사용하기 보다는 SWR 훅을 사용하여 구현하는 것을 권장합니다. SWR을 사용하면 자동으로 캐싱하고 오래된 데이터를 갱신할 수 있습니다.
이렇게 CSR로 구현된 부분은 pre-render를 하지 않고 자바스크립트로 화면을 render합니다.

참고 [링크](https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side#client-side-data-fetching-with-useeffect)

### pre-render란? (hydration)

Nextjs의 기본은 pre-renders입니다. pre-render란 페이지에서 js를 우선하는게 아니라, HTML을 미리 만드는 것을 말합니다. 따라서 더 좋은 성능과 SEO를 기대할 수 있습니다. 이때 생성된 HTML은 최소한의 javascript 코드와 연결됩니다. 그 후에 브라우저가 로딩될 때 남은 javascript가 페이지와 상호작용하면서 페이지가 render 됩니다. 이러한 개념은 hydration이라는 개념이라고 부르기도 합니다. Nextjs가 pre-rendering하는 방법으로는 SSG와 SSR이 있습니다.

### 정적 페이지 생성 (SSG, Static Site Generation)

웹사이트의 모든 페이지를 미리 렌더링하여 클라이언트의 요청에 맞춰 즉각적으로 페이지를 제공합니다.

완전히 정적인 HTML 기반 사이트인 SSG는 데이터베이스 또는 서버 측 프로세스가 필요하지 않기 때문에 가장 빠른 형식의 웹페이지이며, 미리 만들어져있기 때문에 SEO에 유리하며 안전합니다.

하지만 매 업데이트마다 다시 빌드 후 배포해야 하므로 오랜 시간이 걸리며 귀찮습니다. 따라서 내용이 거의 변하지 않는 웹사이트에 적합합니다.

#### Next.js에서의 SSG

SSG에서 HTML은 build 할 때 발생합니다. 그 후에는 CDN으로 캐시 되어지고 매 요청마다 HTML을 재사용합니다.

Next.js에서 일반적으로 컴포넌트를 생성하면 SSG로 동작합니다.
리액트에서는 useEffect를 통해 렌더링 시 데이터를 가져오지만, Nextjs에서 SSG를 구현하려면 getStaticProps나 getStaticPaths를 사용해야 합니다.

### 서버 사이드 렌더링(SSR, Server-Side Rendering)

서버에서 완전히 렌더링 된 페이지를 클라이언트로 보내며, 클라이언트의 자바스크립트 번들이 SPA 프레임워크의 작동을 대신합니다.

서버에서 렌더링되어 전송되기 때문에 동적 데이터를 사용하면서, SEO를 유지할 수 있습니다. 다만 서버에서 모든 요청이 처리되므로 서버의 높은 연산 능력이 필요하며 공격할 수 있는 지점이 많기 때문에 보안을 유지하기 어려우며 캐싱에 복잡한 구성이 필요합니다.

SSR은 서버 비용을 크게 증가시킬 수 있으며, SEO에 크게 의존하는 매우 동적인 콘텐츠의 경우에만 사용해야 합니다.

#### Next.js에서의 SSR

Next.js에서 SSR을 구현하기 위해서는 getServerSideProps을 사용하면 됩니다. getServerSideProps는 빌드시에 요청하는 것이 아니라 매 요청시마다 데이터를 요청하기 때문에 자주 업데이트 되어야 하는 페이지에 사용해야만 합니다.

### 점진적 정적 재생성(ISR, Incremental Static Regeneration)

SSG와 SSR의 장점을 합친 것으로, 전체 사이트를 재빌드 할 필요 없이 페이지별로 정적 생성을 사용할 수 있습니다.

페이지를 미리 렌더링하고 캐시하기 때문에 매우 빠르며, 내용이 변경되어도 사이트를 다시 배포할 필요가 없습니다.
SEO에 유리합니다.

다만 웹사이트에 방문한 도중에 업데이트 된다면 사용자는 업데이트 된 컨텐츠를 볼 수 없습니다.
따라서 블로그와 같이 동적인 콘텐츠이지만 자주 변경되지 않는 사이트에 ISR을 사용하는 것이 좋습니다.

#### Next.js에서의 ISR

```jsx
export async function getStaticProps() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
```

Next.js에서는 getStaticProps에서 revalidate 옵션을 통해 ISR을 구현할 수 있다. revalidate은 데이터 패치 주기를 설정할 수 있는 옵션인데, 위와 같이 10으로 설정한다면 10초마다 데이터를 패칭할 수 있다.

### 참고자료

- [[Next.js] Next.js에서 CSR 구현하기]https://velog.io/@hamjw0122/Next.js-Next.js%EC%97%90%EC%84%9C-CSR-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
- [Next.js와 함께 살펴보는 CSR, SSG, SSR, ISG](https://velog.io/@te-ing/NextJS%EB%A1%9C-%EC%82%B4%ED%8E%B4%EB%B3%B4%EB%8A%94-SSG-ISG-SSR-CSR)
