## GraphQl

### 기존의 Rest를 대하는 방식

통신의 방식에는 크게 FTP(파일) SMTP(메일) HTTP(텍스트/하이퍼텍스트) 방식으로 구분합니다. 그 중 HTTP방식을 웹에서 많이 사용하게 되는데, 웹에 방식에 따라 다양하게 변화되어 왔습니다. Rest api를 Restful하게 만든다는 말을 처음 개발을 배울 때 제일 많이 들었던 내용 인 것 같습니다.

Restful => 엔드포인트는 공통하게 만들고, Method로 구별하고, 요청은 Request 응답은 Response로 오게 됩니다.응답안에서 실패 / 성공의 코드로 내용을 유추할 수 있습니다.

axios가 대표적으로 사용되고, 스웨거(api설명서)를 사용하여, 어떤 api가 있는지 알려주는 문서를 작성하고, 보여줄 수 있습니다. api를 연습하는 곳으로는 대표적으로 포스트맨이 있지만, 다른 곳들도 존재합니다. CRUD(크러드)방식으로 잘 알려져 있으며, htps://naver.com/board/1 //주소처럼 생긴이름으로 통신합니다.

### Graphql의 다른 점

대표적으로, 언더패칭(underfetching)과 오버패칭(overfetching)의 문제를 해결하기 위해 사용 하게 됩니다.

- 언더패칭

  REST API에서 API를 요청하고 싶은 것은 3개인데, 1번에 1개씩만 요청하고 받아올 수 있는 것입니다.

- 오버패칭

  REST API의 API결과로 불필요한 내용까지 결과값으로 받아오는 것입니다.

#### 장점

- typescript의 타입을 자동으로 생성
- REST 스웨거 입력으로 생성하지만, graphql은 자동으로 생성

#### 단점

- 엔드포인트가 /graphql하나라서 주소 기반으로 캐시가 어렵습니다.

  다른 방식으로 가능하지만, 복잡합니다.

- openapi들은 대부분 REST기반으로 작성되어 있어 불편함이 있습니다.

#### 특징

- 페북으로 알려진 meta에서 대규모 접속자 처리하기 위해서 만들었습니다.

- 골라서 정보를 받을 수 있습니다.

- MUTATION (생성, 수정, 삭제)

- QUERY (조회)

- REST API의 POST방식으로 소통합니다.

  Graphql도 /graphql 엔드 포인트에 실행 시킬 함수들을 담아서 보내는 것입니다.

- 플레이그라운드

  왼쪽화면 (실습도구) / 오른쪽화면 (설명서)로 구성되어 있습니다.

#### 주의사항

- 항상 POST로 요청하는 것이 문제가 됩니다. 2개 이상을 요청하는데, 1개만 실패했다고 실패라고 보낼 수가 없어서 1개라도 성공하면 결과값은 성공으로 옵니다. 결과값 안에서 확인을 추가적으로 해야합니다.

- id는 쓸필요가 없더라도 받는게 좋습니다. (id로 구분하기 때문에)

### Graphql

Apollo Client를 사용하려면 먼저 ApolloClient 객체를 생성해야 합니다. ApolloClient 생성자는 옵션 객체를 인자로 받는데, 이 객체의 **link와 cache는 필수 옵션**입니다.

- 전역으로 세팅 해주기 위해 app.tsx에 ApolloSetting을 해줍니다.

- 본격적인 세팅을 위해 client를 생성하고 link와 cache를 연결해줍니다.

### 타입스크립트에서 Graphql

- 사용하는 법은 REST보다 간단한데, 선행으로 먼저 @graphql-codegen/cli, @graphql-codegen/typescript. ts-node를 설치하여 줍니다.

- 설정을 한 후 yarn generate로 실행시켜주면 위의 경로에 types.ts로 타입들이 받아집니다.

- script에 "generate"

  "graphql-codegen" 실행명령어를 적어주고(실행 명령어는 원하는대로 변경가능), 띄어쓰기로 구분하는 yaml파일을 연습할 겸 codegen.yaml 설정파일을 만들어 주었습니다. (js, json파일도 가능)Interface라는 것을 명시하기 위해, typesPrefix: I부분은 타입 스크립트를 가져 올때, 각 타입들의 이름앞에 I를 자동으로 생성해주는 코드를 넣어 주었습니다.

```yaml
schema: http://backend-practice.codebootcamp.co.kr/graphql
generates:
  ./pages/src/commons/types/generated/types.ts:
    plugins:
      - typescript
    config:
      typesPrefix: I
```

### useMutation과 useQuery

Mutation 옆에 변수를 한번 더 주는 것은 그룹이름으로 아무것이나 사용해줘도 무방합니다. $붙은 애들이 변수라 이름 변경 가능하고, gql안에서 받아오는 방식을 정의 해주고 useMutation()안에 세팅을 해주면 됩니다.

- useMutation

```jsx
import { useMutation, gql } from "@apollo/client";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../src/commons/types/generated/types";

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    # 변수의 타입적는 곳
    createBoard(writer: $writer, title: $title, contents: $contents) {
      # 실제 우리가 전달할 변수 적는 곳
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  // const [createBoard] = useMutation<결과타입, 변수타입>(CREATE_BOARD);
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        //얘가 $역할을 해줌
        writer: "훈이",
        title: "안녕하셔요!",
        contents: "반갑습니당!",
      },
    });
    console.log("result::", result);
  };

  return (
    <>
      <button onClick={onClickSubmit}>Graphql-Api(동기)요청하기</button>
    </>
  );
}
```

- useQuery()

```jsx
import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import CommentItem from "../../../src/components/units/16-comment-item";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutedPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
  );

  console.log("data::", data?.fetchBoards);

  return (
    <>{data?.fetchBoards.map((el) => <CommentItem key={el._id} el={el} />)}</>
  );
}
```

Mutation과 Query값에 <>로 타입을 정해주는 것을 볼 수 있는데, <"결과값 타입", "인자로 들어갈 값">을 세팅해 주면 됩니다.

### apollo-cache-state

수정한 값을 변경한다고 저장한 값을 한 번에 다시 가져오는 것에 대한 부담으로 변경된 사항을 수정하여, 빠르게 값을 반환 할 수 있도록 해주는 기능입니다.

- 기존의 리페치

  1개가 추가되면 1개 때문에 4개를 다 받아오는 방식이었지만, refetchQueries로 해결이 가능합니다.

```jsx
const onClickDelete = (event) => {
  deleteBoard({
    variables: {
      number: Number(event.target.id),
    },
    refetchQueries: [{ FETCH_BOARDS }],
  });
};
```

- refetchQueries

  캐시수정 => 추가된 1개의 데이터만 수정하여 가져오는 것입니다. (추가 할 때 반환합니다.)
  아폴로데브툴즈에서 캐싱내용 확인이 가능합니다.

```jsx
const onClickDelete = (boardId: string) => (): void => {
  void deleteBoard({
    variables: { boardId },
    // refetchQueries: [{ query: FETCH_BOARDS }],
    update(cache, { data }) {
      cache.modify({
        fields: {
          fetchBoards: (prev: IPrev[], { readField }) => {
            const deletedId = data.deleteBoard; // 삭제 완료된 ID
            const filteredPrev = prev.filter(
              (el) => readField("_id", el) !== deletedId
            );
            return [...filteredPrev]; // 삭제된 ID를 제외한 나머지 9개만 리턴
          },
        },
      });
    },
  });
};
```

#### 사용법

- readField

  캐시된 곳에는 \_\_ref안에 \_id가 있는데, 그 값을 따로 찾기가 어렵다. \_id 값을 편리하게 찾게 도와주는 것

- cache.modify

  cache 값을 수정하는 것 입니다.

- update(cache, { data })

  cache값과 data값을 가져옵니다.

#### 주의사항

- `const GLOBAL_STATE = new InMemoryCache();`

  생성하여 사용할 수 있는데, 페이지 이동할 때마다 리렌더가 되지 않게 함수 밖에다가 만들어주는 것이 중요합니다. 리렌더링이 되면 캐시 값도 리렌더링 되기 때문입니다.

- 항상 오버엔지니어링 되지 않게 조심해야합니다. 규모가 작은 서비스에 굳이 설정을 해줄 필요는 없습니다.

### 패치정책(fetchPolicy)

```jsx
const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
  FETCH_BOARDS,
  {
    fetchPolicy: "network-only",
  },
);
```

- cache-first

  캐시에 있는지 확인 (아무 입력안하면 이것이 DEFAULT값)

- cache-only

  캐시에 있을때만 캐시 값으로 세팅

- network-only

  무조건 새로 받은 값으로 세팅

### axios처럼 사용하는 방법 (dta는 글로벌스테이트 저장됩니다.)

```jsx
const client = useApolloClient();
client.query() == axios.get();
```

### 실패시 에러처리 - errorLink

graphQLErrors(배열)로 실패한 내용이 들어오고, 그것으로 실패한 쿼리를 재시도 할 수 있습니다. refreshToken을 받을 때 많이 사용합니다.

공통적으로 사용하는 함수를 같이 사용할 때에는 셋팅중이기 때문에 셋팅이 끝나야 client기능을 사용할 수 있습니다. 여기서는 useMutaion불가하기 때문에 다음과 같은 방법을 사용합니다.

- axios 사용

- import { GraphQLClient } from "graphql-request" 사용

```jsx
const graphQlClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_BASE_API}`, {
  credentials: "include",
});
```

#### 사용코드

```jsx
import { onError } from "@apollo/client/link/error";
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  // 1. 에러를 캐치
  if (typeof graphQLErrors !== "undefined") {
    for (const err of graphQLErrors) {
      // 1-2, 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
      if (err.extensions.code === "UNAUTHENTICATED") {
        return fromPromise(
          // 2. refreshToken으로 accessToken을 재발급 받기
          getAccessToken().then((newAccessToken) => {
            setAccessToken(newAccessToken ?? "");
            // 3. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기
            // 객체 안의 키가 존재하면 아래값이 위값을 대체하는 것을 이용!
            operation.setContext({
              headers: {
                ...operation.getContext().headers, // Authorization: Bearer askldjaslkdj => 만료된 토큰이 추가되어 있는 상태
                Authorization: `Bearer ${newAccessToken}`, // 3-2. 토큰만 새걸로 바꿔치기
              },
            });
          }) // 3-3. 방금 수정한 쿼리 재요청하기
        ).flatMap(() => forward(operation));
      }
    }
  }
});
```

#### 사용법

- operation으로 실패한 쿼리가 들어오고, forward는 쿼리를 재요청 해주는 것
- for of로 사용하는 것을 공식문서에서 추천
- fromPromise => 쿼리를 셋팅
- flatMap => 들어온 값을 순서대로 작업하게 도와줌
- toPromise => Promise()객체 처럼 사용이 가능하게 해주는 것
- getContext => 실패한 쿼리 내용을 가져오는 것
- setContext => 실패한 쿼리 내용을 재구성해주는 것

### 옵저버블로 진화한 이유

아폴로 클라이언트 2버전은 프로미스, 3버전은 옵저버블을 사용하게 되었습니다. 예를 들어보면 3페이지를 요청하고 5페이지를 요청할 경우 3페이지가 5페이지보다 나중에 값이 반환되면 5페이지의 값이 보이지 않고, 나중에 도착하는 3페이지의 값이 보이는 것이 문제가 되었습니다.

### apollo-upload-client

- 파일을 업로드 할 link를 설정

```jsx
import { createUploadLink } from "apollo-upload-client";
const uploadLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_BASE_API}`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  credentials: "include",
});
```
