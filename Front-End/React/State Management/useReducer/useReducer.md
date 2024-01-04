## useReducer

useState의 대체 함수입니다. (state, action) => newState의 형태로 reducer를 받고 dispatch 메서드와 짝의 형태로 현재 state를 반환합니다. 다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우나 다음 state가 이전 state에 의존적인 경우에 보통 useState보다 useReducer를 선호합니다.

### useReducer 사용법

- reducer 로직의 세팅

  받아온 action에 따라서 state 변경 후 리턴 해주는 로직입니다.

```jsx
import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state.count < action.max
        ? { count: state.count + action.step }
        : state;
    case "DECREMENT":
      return state.count > action.min
        ? { count: state.count - action.step }
        : state;
    case "RESET":
      return initialState;
    case "RANDOM":
      return {
        count:
          Math.floor(Math.random() * (action.max - action.min)) + action.min,
      };
    default:
      throw new Error("Unsupported action type:", action.type);
  }
}
```

- `return` 받은 로직의 사용

  초기값을 설정해서 넣어주고, 위에서 설정한 로직을 useReducer안으로 넣어줍니다.

```jsx
const initialState = { count: 0 };
function Counter({ step = 1, min = 0, max = 10 }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>
        단계: {step}, 최소: {min}, 최대: {max}
      </p>
      <h2>{state.count}</h2>
      <button onClick={() => dispatch({ type: "INCREMENT", step, max })}>
        증가
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT", step, min })}>
        감소
      </button>
      <button onClick={() => dispatch({ type: "RANDOM", min, max })}>
        무작위
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>초기화</button>
    </>
  );
}
```

### 추가 사항

- 초기화 지연

  init 함수는 선택적으로 제공할 수 있으며, 제공하지 않으면 initialCount 값이 초기 상태로 사용된다. 하지만 init 함수를 제공하면 더 복잡한 초기 상태를 만들거나 계산할 수 있습니다.

```jsx
function init(initialCount) {
  return { count: initialCount };
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
}
```
