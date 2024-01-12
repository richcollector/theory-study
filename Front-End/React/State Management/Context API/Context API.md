## Context Api

일반적으로 리액트에서 데이터를 전달하는 기본 원칙은 단방향성입니다. 그 말은 부모 컴포넌트에서 자식 컴포넌트 방향으로만 데이터를 전달할 수 있다는 의미입니다. 컴포넌트의 구조를 잘 설계하고 합성을 적극적으로 활용해 데이터를 계속해서 넘겨줘야 하는 상황을 안만드는 것이 1옵션이지만, 해당 방법으로 해결이 안될 때는 Context API를 사용할 수 있습니다.

### 사용 방법

- createContext

```jsx
const UserContext = createContext(null);
```

- Provider

```jsx
const UserContext = createContext(null);
const user = { name: "yeonuk" };

<UserContext.Provider value={user}>
  <Child />
</UserContext.Provider>;
```

- useContext

```jsx
const UserContext = createContext(null);

const user = { name: "yeonuk" };

<UserContext.Provider value={user}>
  <Child />
</UserContext.Provider>;

function Child() {
  const user = useContext(UserContext);
  return <h1>{user.name}</h1>;
}
```

### 주의사항

context API는 전역 상태 관리가 아니라, 여러 컴포넌트들에게 동일한 값을 접근할 수 있도록 만들어주는 API입니다.
Context + useState/useReducer 등으로 전역 상태관리와 유사한 형태로 사용할 수도 있습니다.
