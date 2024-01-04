## React-Query

1. React Query는 React Application에서 서버 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트하는 작업을 도와주는 라이브러리입니다.
2. 복잡하고 장황한 코드가 필요한 다른 데이터 불러오기 방식과 달리 React Component 내부에서 간단하고 직관적으로 API를 사용할 수 있습니다.
3. 더 나아가 React Query에서 제공하는 캐싱, Window Focus Refetching 등 다양한 기능을 활용하여 API 요청과 관련된 번잡한 작업 없이 “핵심 로직”에 집중할 수 있습니다.

즉, React-Query는 프론트엔드에서 비동기 데이터를 불러오는 과정 중 발생하는 문제들을 해결해준다.

### 캐싱(Caching)

React-Query의 장점 중 하나는 데이터를 캐싱한다는 점입니다.
캐싱이란 특정 데이터의 복사본을 저장하여 이후 동일한 데이터의 재접근 속도를 높이는 것을 말합니다.

React-Query는 캐싱을 통해 동일한 데이터에 대한 반복적인 비동기 데이터 호출을 방지하고, 이는 불필요한 API 콜을 줄여 서버에 대한 부하를 줄이는 좋은 결과를 가져옵니다.

- 최신 데이터의 판별

  여기서 궁금한 것은 데이터가 최신의 것인지 아닌지에 대한 것입니다.

  만일 서버 데이터를 불러와 캐싱한 후, 실제 서버 데이터를 확인했을 때 서버 상에서 데이터의 상태가 변경되어있다면, 사용자는 실제 데이터가 아닌 변경 전의 데이터를 바라볼 수밖에 없게 됩니다. 이는 사용자에게 잘못된 정보를 보여주는 에러를 낳습니다.

참고로, React-Query에서는 최신의 데이터를 fresh한 데이터, 기존의 데이터를 stale한 데이터라고 말합니다.

- 데이터의 갱신

  위와 같은 에러를 발생시키지 않는 좋은 캐싱 기능을 제공한다는 것은 결국 필요한 상황에 적절하게 데이터를 갱신해줄 수 있다는 말과 같습니다.

  - 화면을 보고 있을 때
  - 페이지의 전환이 일어났을 때
  - 페이지 전환 없이 이벤트가 발생해 데이터를 요청할 때

크게 보면 위의 3가지로 나눌 수 있습니다. 이를 위해 React-Query에서는 기본적인 아래의 옵션들을 제공합니다.

```js
refetchOnWindowFocus, //default: true
refetchOnMount, //default: true
refetchOnReconnect, //default: true
staleTime, //default: 0
cacheTime, //default: 5분 (60 _ 5 _ 1000)
```

위의 옵션들을 통해 우리는 React-Query가 어떤 시점에 데이터를 Refetching하는지 알 수 있습니다.

- 브라우저에 포커스가 들어온 경우(refetchOnWindowFocus)
- 새로운 컴포넌트 마운트가 발생한 경우(refetchOnMount)
- 네트워크 재연결이 발생한 경우(refetchOnReconnect)

#### staleTime? cacheTime ?

- staleTime

  데이터가 fresh → stale 상태로 변경되는 데 걸리는 시간입니다.
  fresh 상태일 때는 Refetch 트리거 (위의 3가지 경우)가 발생해도 Refetch가 일어나지 않습니다.
  기본값이 0이므로 따로 설정해주지 않는다면 Refetch 트리거가 발생했을 때 무조건 Refetch가 발생합니다.

- cacheTime

  cacheTime은 데이터가 inactive한 상태일 때 캐싱된 상태로 남아있는 시간입니다.
  특정 컴포넌트가 unmount(페이지 전환 등으로 화면에서 사라질 때) 되면 사용된 데이터는 inactive상태로 바뀌고, 이때 데이터는 cacheTime만큼 유지됩니다.
  cacheTime 이후 데이터는 가비지 콜렉터로 수집되어 메모리에서 해제됩니다.
  만일 cacheTime이 지나지 않았는데 해당 데이터를 사용하는 컴포넌트가 다시 mount되면, 새로운 데이터를 fetch해오는 동안 캐싱된 데이터를 보여줍니다.
  즉, 캐싱된 데이터를 계속 보여주는게 아니라 fetch하는 동안 임시로 보여준다는 것입니다.
  이외에도 사용자가 특정 이벤트가 발생했을 때 Refetching을 하도록 설정해줄 수 있다. React-Query의 이러한 기능들을 통해 사용자는 언제나 최선의 데이터를 제공받게 됩니다.

### Client 데이터와 Server 데이터 간의 분리

프로젝트의 규모가 커지고 관리해야할 데이터가 넘치다 보면, Client 에서 관리하는 데이터와 Server 에서 관리하는 데이터가 분리될 필요성을 느낍니다.

- Client Data

  모달 관련 데이터, 페이지 관련 데이터 등등..

- Server Data

  사용자 정보, 비즈니스 로직 관련 정보 등등..

간단하게 생각해서 비동기 API 호출을 통해 불러오는 데이터들을 Server 데이터라고 할 수 있습니다.

실제 Client 데이터의 경우 Redux, Recoil, mobX와 같은 전역 상태 관리 라이브러리들을 통해 잘 관리되어오고 있으나, 문제는 이러한 라이브러리들이 Server 데이터까지도 관리를 해야하는 상황이 발생한다는 것입니다.

위의 상태 관리 라이브러리에도 비동기 함수를 처리하는 로직이 존재하거나, 서드 파티를 라이브러리를 지원하는 것이 많습니다. 그러나 이들이 Client 데이터와 Server 데이터를 완벽히 분리하여 관리에 용이하도록 충분한 기능이 지원된다고 보기 어렵습니다. **즉 위의 라이브러리들은 Client 데이터를 관리하는데 로직이 집중되어있기 때문에, Server 데이터까지 효율적으로 관리하기에는 한계가 분명합니다.**

React-Query는 이러한 문제에 대한 해결책 또한 제시해 주는데, 아래 코드를 살펴보자.

```jsx
const { data, isLoading } = useQueries(
  ["unique-key"],
  () => {
    return api({
      url: URL,
      method: "GET",
    });
  },
  {
    onSuccess: (data) => {
      // data로 이것저것 하는 로직
    },
  },
  {
    onError: (error) => {
      // error로 이것저것 하는 로직
    },
  }
);
```

예시에서는 컴포넌트 내부에서 위와 같은 로직을 통해 Server 데이터를 가져오고 있는데, 이때 onSuccess와 onError 함수를 통해 fetch 성공과 실패에 대한 분기를 아주 간단하게 구현할 수 있습니다. 이는 Server 데이터를 불러오는 과정에서 구현해야할 추가적인 설정들을 진행할 필요가 없다는 이야기입니다.

즉, Client 데이터는 상태 관리 라이브러리가 관리하고, Server 데이터는 React-Query가 관리하는 구조라고 생각하면 됩니다. 이를 통해 우리는 Client 데이터와 Server 데이터를 온전하게 분리할 수 있습니다.

물론 여기서 React-Query가 가져온 Server 데이터를 상태 관리 라이브러리를 통해 전역 상태로 가져올 수도 있는 것도 사실입니다. 그러나 refetch가 여러 번 일어나는 상황에 매번 Server 데이터를 전역 상태로 가져오는 것이 옳은지 판단하는 것도 우리의 몫입니다. 개발하는 서비스의 상황에 맞게 잘 선택하여야 합니다.

### 대표적인 기능들

기본적으로 GET 에는 useQuery가, PUT, UPDATE, DELETE에는 useMutation이 사용됩니다.

- useQuery

  첫 번째 파라미터로 unique key를 포함한 배열이 들어갑니다. 이후 동일한 쿼리를 불러올 때 유용하게 사용됩니다.
  첫 번째 파라미터에 들어가는 배열의 첫 요소는 unique key로 사용되고, 두 번째 요소부터는 query 함수 내부의 파라미터로 값들이 전달됩니다.
  두 번째 파라미터로 실제 호출하고자 하는 비동기 함수가 들어갑니다. 이때 함수는 Promise를 반환하는 형태여야 합니다.
  최종 반환 값은 API의 성공, 실패 여부, 반환값을 포함한 객체입니다.

```jsx
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
        (res) => res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
```

useQuery 함수가 반환하는 객체를 보면 isLoading 을 통해 로딩 여부를, error 를 통해 에러 발생 여부를, data를 통해 성공 시 데이터를 반환할 수 있습니다.
isLoading과 error를 이용하여 각 상황 별 분기를 쉽게 진행할 수 있습니다.

- useQuery 동기적으로 실행

  enabled 옵션을 사용하면 비동기 함수인 useQuery를 동기적으로 사용 가능합니다.
  useQuery의 세 번째 인자로 다양한 옵션 값들이 들어가는데, 여기서 enabled에 값을 대입하면 해당 값이 true일 때 useQuery를 동기적으로 실행합니다.

```jsx
const { data: todoList, error, isFetching } = useQuery("todos", fetchTodoList);
const {
  data: nextTodo,
  error,
  isFetching,
} = useQuery("nextTodos", fetchNextTodoList, {
  enabled: !!todoList, // true가 되면 fetchNextTodoList를 실행한다
});
```

- useQueries

  여러 개의 useQuery를 한 번에 실행하고자 하는 경우, 기존의 Promise.all()처럼 묶어서 실행할 수 있도록 도와줍니다.

```jsx
const results = useQueries({
  queries: [
    { queryKey: ["post", 1], queryFn: fetchPost, staleTime: Infinity },
    { queryKey: ["post", 2], queryFn: fetchPost, staleTime: Infinity },
  ],
});

// 두 query에 대한 반환값이 배열로 묶여 반환된다!!
```

- useMutation

  위에서 언급한 것처럼 PUT, UPDATE, DELETE 와 같이 값을 변경할 때 사용하는 API입니다. 반환값은 useQuery와 동일합니다.

```jsx
function App() {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("/todos", newTodo);
    },
  });

  return (
    <div>
      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}
```

위의 코드에서 볼 수 있듯이 반환값은 useQuery와 동일하지만, 처음 사용 시에 post 비동기 함수를 넣어주었습니다. **이때 useMutation의 첫 번째 파라미터에 비동기 함수가 들어가고, 두 번째 인자로 상황 별 분기 설정이 들어간다는 점이 차이입니다.**

실제 사용 시에는 mutation.mutate 메서드를 사용하고, 첫 번째 인자로 API 호출 시에 전달해주어야하는 데이터를 넣어주면 됩니다.

### SWR과의 비교

React-Query가 장점만 보유하고 있다면, 다른 경쟁 라이브러리들이 살아남기 어려울 것입니다. 그렇다면 React-Query가 가지는 단점을 React-Query만큼 대표적인 Data fetching 라이브러리인 SWR과 비교해보겠습니다.

- SWR

```jsx
import useSWR from "swr";

const App = () => (
  <div>
    <SWRProfile />
  </div>
);

const SWRProfile = () => {
  const { data, error } = useSWR(
    "https://61b88c9d64e4a10017d19053.mockapi.io/user",
    (url) => fetch(url).then((res) => res.json())
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <Profile library="SWR" data={data} />;
};

const Profile = ({ library, data }) => (
  <div>
    <h1>Users from {library}</h1>
    {data.map((user) => (
      <p>
        {user.level} developer <strong>{user.name}</strong>
      </p>
    ))}
  </div>
);

export default App;
```

- React-Query

```jsx
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();
const url = "https://61b88c9d64e4a10017d19053.mockapi.io/user";

const App = () => (
  <div>
    <QueryClientProvider client={queryClient}>
      <ReactQueryProfile />
    </QueryClientProvider>
  </div>
);

const ReactQueryProfile = () => {
  const { isLoading, error, data, isFetching } = useQuery("users", () =>
    fetch("https://61b88c9d64e4a10017d19053.mockapi.io/user").then((res) =>
      res.json()
    )
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <Profile library="React Query" data={data} />;
};

const Profile = ({ library, data }) => (
  <div>
    <h1>Users from {library}</h1>
    {data.map((user) => (
      <p>
        {user.level} developer <strong>{user.name}</strong>
      </p>
    ))}
  </div>
);

export default App;
```

위 코드를 통해 알아볼 수 있는 SWR의 강점은 다음과 같다.

- Provider

  SWR은 별도의 Provider 없이 컴포넌트에서 바로 사용할 수 있으나, React-Query는 기본적으로 컴포넌트를 감싸는 별도의 Provider가 필요해 이를 설정해주어야한다. 사실 이게 귀찮게 다가오는 정도는 아니지만, 초기 설정을 하나 더 해주어야한다는 점이 있습니다.

- Fetcher

  useSWR, useQuery 모두 두 번째 인자로 fetcher를 받습니다. 이때 SWR의 경우 첫 번째 인자로 url을 받고, 두 번째 인자인 fetcher에 첫 번째 인자로 받은 url을 넘겨주는 방식을 사용합니다. 또한 SWR은 전역 설정을 통해 fetcher를 정해둘 수 있습니다. 그러나 React-Query는 fetcher에 url을 직접 전달해주어야 합니다.

### React-Query가 가지는 장점

- Devtools

  React-Query에서는 공식적으로 react-query/devtools를 통해 Devtool을 지원합니다. 개발 모드에서만 사용하며, devtools를 통해 좀 더 확실하게 데이터의 흐름을 파악할 수 있습니다.

SWR 또한 devtools를 사용할 수 있으나, 서드 파티 라이브러리를 이용해야합니다.

- 무한 스크롤 구현

  SWR과 React-Query 모두 무한 스크롤을 구현하는 데 필요한 기능들을 제공합니다.

그러나 SWR로 무한 스크롤을 구현하려면 유저가 부가적인 코드를 작성해야하는 반면,
React-Query에는 getPreviousPageParam, fetchPreviousPage, hasPreviousPage 와 같은 다양한 페이지 관련 기능이 존재해 이를 이용해 무한 스크롤을 쉽게 구현할 수 있습니다.

- Selectors

  React-Query에서는 select 키워드를 사용해 raw data로부터 원하는 데이터를 추출하여 반환할 수 있습니다.

```jsx
import { useQuery } from "react-query";

function User() {
  const { data } = useQuery("user", fetchUser, {
    select: (user) => user.username,
  });
  return <div>Username: {data}</div>;
}
```

위의 예시처럼 select 를 통해 원하는 데이터에 접근한 뒤 추출이 가능합니다.

- Data Optimization

  SWR과 다르게 React-query는 쿼리가 업데이트될 때만 refetch를 진행합니다. 또한 여러 컴포넌트에서 동일한 쿼리를 사용하는 경우 한번에 묶어 업데이트를 진행합니다. 이를 통해 렌더링 퍼포먼스를 개선해줍니다.

- Garbage Collection

  React-Query는 지정된 시간(기본 5분)동안 쿼리가 사용되지 않는다면 자동으로 메모리 해제를 하는 Auto Garbage Collection을 통해 메모리를 관리해줍니다.

### v4에서의 변경점

React-Query v4에서는 패키지 이름부터 `@tanstack/react-query`로 변경되면서 React에만 국한되지 않은 범용 프론트엔드 라이브러리로 개선되었습니다. 즉 tanstack이라는 오픈 소스 소프트웨어 프로젝트 하위의 라이브러리인 것입니다. 공식문서도 tanstack에서 제공하고 있으니 헷갈리지 않도록 주의합시다.

- 라이브러리 이름 변경

  라이브러리 이름이 변경되면서 import를 할 때 @tanstack/react-query로 진행해야한다. react-query라는 라이브러리는 더는 없습니다.

- Query key에 배열을 넣어주자

  useQuery 훅을 사용하면서 첫 번째 인자로 unique key를 정해주었는데, 이제 해당 입력값이 하나만 있더라도 무조건 배열의 형태를 띄어야 합니다.

  `useQuery('todos', fetchTodos) => useQuery(['todos'], fetchTodos)`

- useQueries에 여러 쿼리를 넘길 때 queries를 명시

  기존의 코드에서는 useQueries를 사용할 때 인자로 다음과 같이 쿼리 정보를 담은 배열을 보내줬습니다. 그러나 이제는 이를 묶어서 queries라는 파라미터로 전달해주어야합니다.

  `useQueries([{ queryKey1, queryFn1, options1 }, { queryKey2, queryFn2, options2 }])` =>
  `useQueries({ queries: [{ queryKey1, queryFn1, options1 }, { queryKey2, queryFn2, options2 }] })`

- undefined 대신 Error를 반환

  비동기 함수들 중에는 query가 잘못된 경우 모종의 이유로 결과값이 undefined인 경우가 있습니다.

이전까지는 이러한 경우 그저 반환값 undefined를 그대로 우리에게 보내주었는데, 이제는 React-Query 자체적으로 이를 감지하고 이런 경우 API 호출을 Failed라고 표시하고 Error를 반환합니다. 값이 없는 경우도 Error로 분기해서 보내준다니, 아주 편리한 기능이라고 할 수 있습니다.

### 참고자료

- [[React-Query] React-Query 개념잡기](https://velog.io/@kandy1002/React-Query-%ED%91%B9-%EC%B0%8D%EC%96%B4%EB%A8%B9%EA%B8%B0)
