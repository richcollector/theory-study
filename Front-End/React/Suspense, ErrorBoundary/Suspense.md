## Suspense

children의 로딩이 완료될 때까지 다른 컴포넌트를 대신 보여줄 수 있게 해줍니다. REST API와 같이 비동기로 데이터를 가져오는 작업에서 활용도가 높습니다.

어떤 컴포넌트가 필요한 데이터가 아직 준비가 되지 않은 상태라는 것을 리액트에게 알려주는 매커니즘입니다.

### Suspense의 기능 및 활용하기

- 콘텐츠를 한번에 공개합니다.

  Suspense의 children 중 하나만 데이터가 준비되지 않은 상태여도 fallback 컴포넌트를 대신 렌더링한다.

- 가장 가까운 상위 Suspense 폴백을 표시합니다.

  컴포넌트가 데이터를 읽는 중일 때 가장 가까운 상위 Suspense의 폴백이 보여집니다. 여러 Suspense를 중첩해서 로딩 시퀀스를 구성할 수 있습니다.

- useDeferredValue

  새로운 콘텐츠가 로드되는 동안 로딩 UI가 아니라 이전 콘텐츠를 보여줍니다.
  다음 예제는 query 상태가 업데이트되는 동안 Loading UI를 보여주고 있습니다.

```jsx
import { Suspense, useState } from "react";
import SearchResults from "./SearchResults.js";

export default function App() {
  const [query, setQuery] = useState("");
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={query} />
      </Suspense>
    </>
  );
}
```

사용자 경험 개선을 위해 useDeferredValue를 사용해서 로딩 UI가 아닌 이전 상태를 보여주도록 해봅시다.

```jsx
export default function App() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
          <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </>
  );
}
```

검색 자동완성 기능에 활용하면 좋을 것 같습니다.

- startTransition

  이미 렌더링된 컴포넌트가 로드 중인 데이터로 인해 폴백 UI로 대체되어 다시 렌더링되는 것을 방지할 수 있습니다.
  아래는 Router 컴포넌트의 Layout 컴포넌트가 이미 렌더링 된 상태고, 버튼을 누르면 Router가 page에 따라 content를 업데이트하게 됩니다. 그에 따라서 Layout 컴포넌트가 화면에서 없어지고 폴백 UI가 렌더링되었다가 데이터 로드가 완료되면 다시 Layout이 화면에 나타나게 됩니다.

```jsx
export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState("/");

  function navigate(url) {
    setPage(url);
  }

  let content;
  if (page === "/") {
    content = <IndexPage navigate={navigate} />;
  } else if (page === "/the-beatles") {
    content = (
      <ArtistPage
        artist={{
          id: "the-beatles",
          name: "The Beatles",
        }}
      />
    );
  }
  return <Layout>{content}</Layout>;
}
```

이때 startTransition을 활용하여 UI를 차단하지 않고 상태를 업데이트할 수 있습니다.

```jsx
export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState("/");

  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }

  let content;
  if (page === "/") {
    content = <IndexPage navigate={navigate} />;
  } else if (page === "/the-beatles") {
    content = (
      <ArtistPage
        artist={{
          id: "the-beatles",
          name: "The Beatles",
        }}
      />
    );
  }
  return <Layout>{content}</Layout>;
}
```

리액트에서 상태 업데이트는 두 가지로 나뉠 수 있습니다.

- 긴급한 업데이트 (urgent updates)

  입력, 클릭, 누르기 같은 다이렉트 상호작용을 반영

- 전환 업데이트 (transition updates)

  UI의 전환

타이핑, 클릭, 누르기 같은 긴급 업데이트는 빠르게 업데이트 되지 않으면 버벅거리면서 앱이 이상하다는 느낌을 줄 수 있지만, 화면은 곧바로 결과값을 볼거라고 기대하지 않기 때문에 전환 업데이트는 느리게 업데이트가 되어도 괜찮습니다.

위와 같이 startTransition으로 래핑된 업데이트는 전환 업데이트로 처리되며, 긴급한 업데이트가 들어오면 중단됩니다. 위에서 setPage(url)을 중단하고 긴급한 업데이트를 처리한 후 마지막으로 전환 업데이트를 처리하면 그 동안 Router 컴포넌트가 데이터를 로드하는 중이라고 인식하지 않기 때문에 Suspense의 폴백을 표시하지 않고 content 상태가 바뀌게 되는 것입니다.

아래 코드에서는 tab을 post에서 comment로 바꾸면서 의도치않게 Loading 폴백을 렌더링할 수가 있습니다.

```jsx
<Suspense fallback={<Loading />}>
  {tab === "post" ? <Post /> : <Comment />}
</Suspense>
```

만약 로더 대신 Post를 계속 노출시키고 싶다면 tab 상태를 바꾸는 것을 지연하면 됩니다.

```jsx
function handleClick() {
  startTransition(() => {
    setTab("comment");
  });
}
```

useTransition를 사용해서 보류중 여부를 나타내는 변수와 함께 사용할 수도 있습니다.

```jsx
const [isPending, startTransition] = useTransition();
```

isPending를 사용해서 page가 업데이트가 완료되기 전에 다른 UI를 보여주도록 할 수 있습니다.

### 참고자료

- [React Suspense + ErrorBoundary 개념과 활용](https://velog.io/@shinoung2360/SuspenseErrorBoundary)
