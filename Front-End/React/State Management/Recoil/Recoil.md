## Recoil

Recoil은 내부적으로 상태의 의존성을 추적하여 변경된 부분만을 리렌더링하는 데에 최적화되어 있습니다.
Context API를 사용할 때는 Provider의 값을 업데이트할 때마다 해당 컨텍스트에 연결된 모든 하위 컴포넌트가 리렌더링됩니다

- 사용법

  ```jsx
  import { useRecoilState, useRecoilValueLoadable } from "recoil";
  import {
    accessTokenState,
    restoreAccessTokenLoadable,
  } from "../../../commons/store";
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const token = useRecoilValueLoadable(restoreAccessTokenLoadable);
  ```

### 글로벌 변수생성법

- 변수를 생성해줘 => atom
- isEditState이름으로 => key
- 처음생성 값은 true로 => default

```jsx
export const isEditState = atom({
  key: "isEditState",
  default: true,
});
```

### 글로벌 함수생성법

- 함수를 생성해줘 => selector
- restoreAccessTokenLoadable 이름으로 => key
- 함수에서 얻는 값을 return해 주는 것 => get

```jsx
export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});
```

- getAccessToken을 사용할 때 사용해주었다.

```jsx
  export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const graphQlClient = new GraphQLClient(
      `${process.env.NEXT_PUBLIC_BASE_API}`,
      { credentials: "include" }
    );
    const result = await graphQlClient.request<
      Pick<IMutation, "restoreAccessToken">
(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }

```

### 주의사항

> In development, when a file is changed, Next.js re-builds the relevant page entry file.Because it's the same Node.js process, the atom has already been declared.The same thing can happen with HMR when the file change triggers a rebuild of the whole file, or even when the atom is declared inside a component lifecycle/hook and only that is being hot-replaced.

Next.js 개발 중 파일이 변경되면 다시 빌드되는 과정에서 atom으로 만든 state가 재선언된다.

key는 항상 고유값을 가져야하는데 재선언되는 과정에서 이미 key로 선언된 값을 key로 사용해서 문제가 발생하지만, 기능적으로는 문제가 없다고한다.

### 해결방법

- interrupt-stdout 모듈을 사용해서 에러메세지를 무시

- 키값에 난수를 사용해서 에러메세지가 뜨지 않게 하는 방법

- RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  - Recoil변수들을 생성한 곳에 값을 세팅 해준다.
