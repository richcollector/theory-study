## 리덕스 (Redux)

모든 상태를 하나의 저장소(store)에서 관리하는 상태관리 라이브러리입니다.
리액트로만 프로젝트를 진행하게 될 시 규모가 클 수록 `local state`와 `global state`를 관리하기 어렵다는 단점이 있습니다.
하지만 리덕스를 사용하게 되면 하나의 store를 통해 모든 state를 저장, 유지할 수 있게 되며, 원하는 컴포넌트로 데이터를 전달 할 수 있게 됩니다.

리덕스는 `html`, `js` 내에서도 사용이 가능하지만 컴포넌트간에 상태관리를 하는 리액트와 함께 쓰면 높은 시너지를 낼수 있기 때문에 리액트에서 많이 사용합니다.

### 응용 라이브러리

- redux

  상태 업데이트와 관련된 로직을 효율적으로 관리하는 라이브러리.

- react-redux

  redux와 react를 연동해주는 라이브러리.

- redux-saga

  비동기 작업을 처리하는데 도와주는 redux 미들웨어.

- redux-devtools-extension

  redux 개발자 도구(크롬)

- redux-logger

  디스패치될 될 때마다 액션의 정보와 액션이 디스패치 되기 전 후의 상태를 콘솔에 보여주는 로깅 미들웨어.

### 리덕스의 원리

#### 액션 (Action)

- 어떤 동작을 줄지 알려주는 역할을 합니다.

- 무조건 객체형태여야 합니다.

- type 프로퍼티를 필수적으로 갖고 있어야 하며, 그 외의 값은 상황에 따라 자유롭게 넣어줄 수 있습니다.

- dispatch의 파라미터로 전달됩니다.

```jsx
{
    type: "CHANGE_INPUT", // 필수 작성
    text: "type외의 값은 개발자 맘대로!"
    data: {
            id: 0,
            text: "리덕스 배우기"
          }
}
```

### 액션 생성함수 (Action Creator)

- 액션을 만드는 함수입니다. (필수적으로 사용하는것은 아님)

- 사용하는 이유는 나중에 컴포넌트에서 쉽게 액션을 발생시키기 위해서입니다. 그래서 보통 export키워드를 붙여 다른 파일에서 불러와서 사용합니다.

```jsx
export function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}

// 화살표 함수로도 만들 수 있다.
export const changeInput = (text) => ({
  type: "CHANGE_INPUT",
  text,
});
```

```jsx
// src => components => action => pasta.js
export const handlePastaA = (data) => {
  //aciton
  return { type: "기본", data };
};
export const handlePastaB = (data) => {
  //action
  return { type: "맵게", data };
};
export const handlePastaC = (data) => {
  //action
  return { type: "로제", data };
};
// src => components => action => post.js
export const handlePosts = (data) => {
  return { type: "후기", data };
};
```

### 디스패치 (dispatch)

- 스토어의 내장함수 중 하나입니다.

- 액션을 발생시킵니다.

- 액션을 파라미터로 전달합니다. `dispatch(action)`

```jsx
// src => index.js
import { createStore } from "redux";
const initialState = {
  client: {
    id: null,
    pasta: "주문내역없음",
  },
  posts: [],
};
const store = createStore(reducer, initialState);
store.dispatch(handlePastaA("기본파스타"));
console.log("기본", store.getState());
store.dispatch(handlePastaB("매운파스타"));
console.log("맵게", store.getState());
store.dispatch(handlePastaC("로제파스타"));
console.log("로제", store.getState());
store.dispatch(handlePosts({ id: 1, content: "맛있어요" }));
console.log("후기", store.getState());
store.dispatch(handlePosts({ id: 2, content: "좋아요" }));
console.log("후기두번째", store.getState());
```

### 리듀서 (Reducer)

- 변화를 일으키는 함수입니다.

- 두개의 파라미터를 가집니다. (state와 action)

- 기존상태(state)를 전달받은 action을 참고해서 새로운 상태(객체)를 반환합니다.

- useReducer를 사용할때 작성하는 리듀서와 같은 형태를 가집니다.

```jsx
interface Action {
  type: string;
}

const counter = (state = 0, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export default counter;
```

```jsx
// src/reducer/index.js

import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({
  // 설정한 reducer
  counter,
  todos,
});

export default rootReducer;
```

### 스토어 (Store)

- 한 애플리케이션 당 하나의 스토어를 생성합니다.

- 구성 : 현재의 앱 상태 / 리듀서 / 몇가지 내장 함수들(dispatch, subscribe..)

- 스토어가 하는일

애플리케이션의 상태를 저장합니다.
getState()를 통해 상태에 접근할 수 있게 해줍니다.
dispatch(action)을 통해 상태를 수정할 수 있게 해줍니다.
subscribe(listner)를 통해 리스너를 등록합니다.

```js
// src/store/index.js

import { applyMiddleware, createStore } from "redux"; // createStore 적용 문제로 redux version 4.1.2 로 낮춰서 사용
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import rootReducer from "../reducer";
import rootSaga from "../saga";

const logger = createLogger(); // 로거 미들웨어 활성화
const sagaMiddleware = createSagaMiddleware(); // 사가 미들웨어 활성화

const store = createStore(
  // store 생성
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, sagaMiddleware)) // redux 개발자도구 활성화
);

export const sagaRun = () => {
  sagaMiddleware.run(rootSaga); // sagaMiddleware에 rootSaga 바인딩
};

export default store;
```

```jsx
// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store, { sagaRun } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    {" "}
    // Provider store 등록
    <App />
  </Provider>
);

sagaRun(); // sagaRun 실행
```

### 구독 (subscribe)

- 스토어의 내장함수 중 하나입니다.

- 함수 형태의 값을 인자로 받습니다.

- store를 주시하고 있다가 액션이 디스패치될 때 전달해준 함수를 호출합니다. 즉 스토어의 데이터가 변할때 마다 실행되는 메서드입니다.

- 리액트에서 리덕스를 사용할때 이 함수를 직접 사용하는 일은 별로 없으나 그 대신에 react-redux라는 라이브러리에서 제공하는 connect 함수 또는 useSelector Hook 을 사용하여 리덕스 스토어의 상태에 구독합니다.

#### 주의점

- API호출이나 라우팅처럼 사이드이펙트를 야기하는것들을 사용해선 안됩니다.

- `Date.now()`, `Math.random()`처럼 순수하지 않은 함수를 호출 해서는 안됩니다. 이런 작업들은 리듀서함수의 바깥에서 처리해야 하며 리덕스 미들웨어를 사용해 처리하곤 합니다.

#### <순수함수 조건>

- 동일한 인자가 들어갈 경우 항상 같은 값이 나와야 합니다.
- 부수적인 효과가 일어나면 안 됩니다.
- return 값으로만 소통합니다.

### 리덕스의 3가지 규칙

1. 하나의 애플리케이션안엔 하나의 스토어가 있어야합니다.

   여러개의 스토어를 만들 순 있지만 개발 도구를 활용하지 못하기 때문에 권장하지 않습니다. 리듀서를 여러개 만들어 관리하는것은 가능합니다.
   모든 상태는 하나의 저장소(store)안에 하나의 객체 트리구조로 저장됩니다.

2. 상태는 읽기 전용입니다.

   상태는 읽기전용 데이터이며 (불변), 액션만이 상태를 변경 할 수 있습니다.

3. 리듀서는 순수함수여야 합니다.

   리듀서함수는 이전 상태와 액션 객체를 파라미터로 받습니다.
   이전 상태는 절대 건드리지 않고, 변화를 일으킨 새로운 상태 객체를 만들어 반환합니다.
   똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과값을 반환해야 합니다.

### 참고자료

- []()
- [[REACT] Reducer 여러 개 사용하기 (combineReducer)](https://velog.io/@postlist/REACT-Reducer-%EC%97%AC%EB%9F%AC-%EA%B0%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-combineReducer)
