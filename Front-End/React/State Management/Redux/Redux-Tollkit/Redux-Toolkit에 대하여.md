### Redux Toolkit

Redux Toolkit (줄여서 "RTK")은 Redux 로직을 작성하기 위해 Redux에서 추천하는 방법입니다. @reduxjs/toolkit 패키지는 코어 redux 패키지를 포함하며, Redux 앱을 만드는 데 필수적인 API 메서드와 공통 의존성을 포함합니다. Redux Tookit은 저희가 제안하는 모범 사례를 통해 만들어졌으며, 대부분의 Redux 작업을 단순화하고, 흔한 실수를 방지하며, Redux 애플리케이션을 더 쉽게 작성할 수 있도록 지원합니다.

RTK는 일반적인 작업들을 단순화해주는 유틸리티가 포함되어 있습니다. 예를 들면, 스토어 설정, 리듀서 생성과 불변 수정 로직 작성과 한번에 모든 상태 슬라이스 작성 이 있습니다.

Redux를 처음 사용하는 입문자든, 기존 애플리케이션을 간소화하고자 하는 경험자든, Redux Toolkit 은 여러분의 Redux 코드를 개선할 수 있도록 도와줍니다.

### Redux Toolkit은 Redux 코어와 어떻게 다른가요?

#### Redux란

- "전역" 상태를 포함하는 단일 스토어

  앱에 어떤 일이 일어날 때 스토어에 일반 객체 액션을 디스패치하는 것
  액션을 살펴보고 불변성을 유지한 채 업데이트된 상태를 반환하는 순수 리듀서 함수

필수는 아니지만, Redux 코드에는 보통 아래 항목들이 포함됩니다.

- 액션 객체를 생성하는 액션 생성자

  부수 효과를 가능하게 하는 미들웨어
  부수 효과를 가진 동기 또는 비동기 로직을 포함하는 Thunk 함수
  ID로 항목 조회를 가능하게 하는 정규화된 상태
  Reselect 라이브러리를 사용하여 파생된 데이터를 최적화하는 메모이제이션된 셀렉터 함수
  액션의 이력과 상태 변경을 확인할 수 있는 Redux DevTools 확장 프로그램
  액션, 상태 및 기타 함수에 대한 TypeScript 타입
  추가적으로, Redux는 보통 React-Redux 라이브러리와 함께 사용되어 React 컴포넌트가 Redux 스토어와 상호 작용할 수 있게 합니다.

#### Redux 코어

- createStore
  실제 Redux 스토어를 생성합니다

- combineReducers

  여러 개의 slice리듀서를 하나의 큰 리듀서로 결합합니다

- applyMiddleware

  여러 개의 미들웨어를 스토어 인핸서(enhancer)로 결합합니다

- compose

  여러 개의 스토어 인핸서를 하나의 스토어 인핸서로 결합합니다

이 외에, 애플리케이션에서 Redux와 관련된 모든 로직은 완전히 여러분이 작성해야 합니다.

이것의 좋은 점은 Redux를 많은 다양한 방법으로 사용할 수 있다는 것입니다. 그러나 나쁜 점은 Redux 코드 작성을 더 쉽게하는 도우미가 없다는 것입니다.

예를 들어, 리듀서 함수는 그저 함수입니다. Redux Toolkit 이전에는 대개 'switch' 문과 수동 업데이트를 사용하여 리듀서를 작성했습니다. 또한, 여러분은 직접 액션 생성자와 액션 타입도 작성했을 것입니다:

```jsx
const ADD_TODO = "ADD_TODO";
const TODO_TOGGLED = "TODO_TOGGLED";

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text, id: nanoid() },
});

export const todoToggled = (id) => ({
  type: TODO_TOGGLED,
  payload: id,
});

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    case TODO_TOGGLED:
      return state.map((todo) => {
        if (todo.id !== action.payload.id) return todo;

        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    default:
      return state;
  }
};
```

이 코드들은 redux 코어 라이브러리의 어떤 API에도 의존하지 않지만, 작성하기에는 많은 양의 코드입니다. 불변성을 지키기 위해 수동으로 객체를 복사(spread)하고 배열을 조작해야 합니다. 이 과정에서 상태를 실수로 변경하는 것이 매우 쉽습니다 (항상 Redux 버그의 #1 원인이죠!). 또한, 한 가지 기능의 코드를 actions/todos.js, constants/todos.js, 그리고 reducers/todos.js와 같이 여러 파일에 분산시키는 것이 엄격히 요구되는 것은 아니지만 일반적이었습니다.

또한, 스토어를 설정하려면 대개 일련의 단계를 거쳐서 thunks와 같이 자주 사용되는 미들웨어를 추가하고 Redux DevTools 확장 프로그램 지원을 활성화해야 합니다.

### Redux Toolkit?

이것들은 원래 Redux 문서에서 보여준 패턴들이지만, 이들은 아주 장황하고 반복적인 코드를 필요로 합니다. 이러한 많은 보일러 플레이트 코드들은 Redux를 사용하는 데 필요하지 않습니다. 게다가, 이러한 보일러 플레이트 코드는 더 많은 실수를 유발할 가능성이 있습니다.

수동으로 작성하는 Redux 로직에서 "보일러 플레이트"를 제거하고, 흔한 실수를 방지하고, 기본적인 Redux 작업을 간단하게 만드는 API를 제공하기 위해 Redux Toolkit가 탄생하였습니다.

Redux Toolkit은 모든 Redux 앱에서 가장 일반적으로 하는 작업을 간소화하는 두 가지 주요 API로 시작합니다

- configureStore

  한 번의 호출로 Redux 스토어를 설정하며, 리듀서를 결합하고 thunk 미들웨어를 추가하고, Redux DevTools 통합을 하는 등의 작업을 수행합니다. 또한, 이름이 있는 옵션 매개변수를 사용하기 때문에 createStore보다 구성이 쉽습니다.

- createSlice

  Immer 라이브러리를 사용하는 리듀서를 작성할 수 있게 해줍니다. 이를 통해 state.value = 123과 같은 "변형 (mutating)" JS 문법을 spreads 없이도 불변성을 유지하며 업데이트할 수 있습니다. 또한, 각 리듀서에 대한 액션 생성자 함수를 자동으로 생성하고, 리듀서 이름에 기반하여 내부적으로 액션 타입 문자열을 생성합니다. 마지막으로, TypeScript와 잘 호환됩니다.

```jsx
import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
    todoToggled(state, action) {
      const todo = state.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
  },
});

export const { todoAdded, todoToggled } = todosSlice.actions;
export default todosSlice.reducer;
```

모든 액션 생성자와 액션 타입은 자동으로 생성되며, 리듀서 코드는 더 짧고 이해하기 쉬워집니다. 또한, 각 케이스별로 무엇이 업데이트 되는지 더 명확히 보입니다.

configureStore를 사용하여 스토어 설정을 간단하게 줄일 수 있습니다

```jsx
app / store.js;
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import filtersReducer from "../features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer,
  },
});
```

configureStore를 한번 호출하면 기존에 수동으로 하던 모든 설정 작업이 자동으로 이루어집니다

- 슬라이스 리듀서가 자동으로 combineReducers()에 전달됩니다.
- redux-thunk 미들웨어가 자동으로 추가됩니다.
- 개발 모드 미들웨어가 추가되어, 실수로 상태를 변경하는 것을 방지합니다.
- Redux DevTools 확장 프로그램이 자동으로 설정됩니다.
- 미들웨어와 DevTools 인핸서가 결합되어 스토어에 추가됩니다.
- 동시에, configureStore 는 이러한 기본 동작들을 수정할 수 있는 옵션도 제공합니다. (thunks를 끄거나 sagas를 추가하거나, 프로덕션 환경에서 DevTools를 비활성화하는 것과 같은 작업)

Redux Toolkit은 이 외에도, 다음과 같은 일반적인 Redux 작업을 수행할 수 있는 API를 제공합니다

- createAsyncThunk

  "비동기 요청 전후에 액션을 디스패치"하는 표준 패턴을 추상화합니다.

- createEntityAdapter

  정규화된 상태에서 CRUD 작업을 수행하기 위한 미리 만들어진 리듀서와 셀렉터.

- createSelector

  메모이제이션된 셀렉터를 위한 표준 Reselect API 다시 내보내기(re-export)

- createListenerMiddleware

  디스패치된 액션에 대한 응답으로 로직을 실행하기 위한 사이드 이펙트 미들웨어

마지막으로, RTK 패키지에는 Redux앱에서 데이터를 패칭하고 캐싱하는 완벽한 솔루션인 "RTK Query"가 있습니다. RTK Query는 별도의 선택적 @reduxjs/toolkit/query 진입점으로 제공됩니다. 이는 엔드포인트 (REST, GraphQL 또는 기타 비동기 함수)를 정의하고, 데이터를 패칭하고, 로딩 상태를 업데이트하며 결과를 캐싱 하는 리듀서와 미들웨어를 생성합니다. 또한, 컴포넌트내에서 데이터를 패칭할 수 있는 React hooks도 자동으로 생성합니다. `const { data, isFetching} = useGetPokemonQuery('pikachu')` 와 같은 형태로 사용할 수 있습니다.

각 API들은 완전히 선택사항이며 특정 사용 사례를 위해 설계되었습니다. 즉, 사용자는 앱에서 실제로 사용할 API를 선택할 수 있습니다. 그러나, 이 모든 API가 작업을 수행하는 데 있어 권장되는 방법입니다.

### Redux에서 Redux Toolkit을 사용하길 바라는 이유

이전 "보일러 플레이트"가 많고 복잡했던 Redux 패턴은 Redux의 필수적인 부분이 아니었습니다. 이러한 패턴은 그저 다음과 같은 이유 때문에 존재했습니다.

- 최초의 "Flux Architecture"가 일부 같은 접근 방식을 사용했습니다.
- 초기 Redux 문서에는 코드를 타입별로 다른 파일에 분리할 수 있도록 액션 타입 상수와 같은 것들을 보여줬습니다.
- JavaScript는 기본적으로 가변 언어이며, 불변 업데트를 작성하려면 수동으로 객체 복사(spread)와 배열 업데이트가 필요합니다.
- Redux는 몇 주 안에 만들어졌으며 의도적으로 몇 가지 API 기본 요소로 구성되도록 설계되었습니다.

게다가, Redux 커뮤니티는 추가적인 보일러 플레이트를 더하는 몇 가지 특정한 접근 방식들을 채택해 왔습니다

- 부수효과를 작성하는 일반적인 접근 방식으로 redux-saga 미들웨어의 사용을 강조하는 것
- Redux 액션 객체에 대한 TS 타입을 수작업으로 작성하고 유니언 타입을 생성하여 타입 수준에서 디스패치할 수 있는 액션을 제한하는 것을 주장하는 것

#### 해결된 문제

- Redux Toolkit은 스토어 설정을 한번의 함수 호출로 단순화하면서, 필요시 스토어의 옵션을 완전히 구성할 수 있는 기능을 유지합니다
- Redux Toolkit은 언제나 Redux버그의 #1 원인이었던 우발적인 상태 변이를 제거합니다
- Redux Toolkit은 수동으로 액션 생성자 또는 액션 타입을 작성할 필요가 없게 만듭니다
- Redux Toolkit은 수동으로 작성해야하고 오류도 발생하기 쉬운 불변 업데이트 로직을 작성할 필요가 없습니다
- Redux Toolkit은 Redux 기능의 코드를 여러 개의 분리된 파일에 분산하는 대신 단일 파일에 작성하기 쉽게 만들어줍니다
- Redux Toolkit은 우수한 TypeScript 지원을 제공하며, 코드에서 정의해야하는 타입의 수를 최소화하고 높은 타입 안전성을 제공하기 위해 설계된 API를 제공합니다
- RTK Query를 사용하면 데이터를 패칭하고 로딩 상태를 추적하는 데 필요한 어떠한 thunks, 리듀서, 액션 생성자 또는 이펙트 훅도 작성하지 않아도 됩니다.

기존 애플리케이션의 경우에도, 적어도 createStore 를 configureStore 로 교체하는 것을 권장합니다. 개발 모드 미들웨어를 사용하면 기존 코드에서 발생할 수 있는 우연한 변이와 직렬화 오류를 잡을 수 있게 도와줍니다. 또한, 가장 많이 사용하는 리듀서(그리고 앞으로 작성할 리듀서들) 를 createSlice로 교체할 것을 권장합니다 - 코드가 더 짧고 이해하기 쉬워지며, 안정성이 향상되므로 앞으로의 시간과 노력을 절약할 수 있습니다.

redux 코어 패키지는 여전히 작동하지만, 이제는 구식으로 여겨집니다. @reduxjs/toolkit에서 redux 코어 패키지의 모든 API가 재내보내지며, configureStore 는 createStore 가 수행하는 모든 작업을 수행하지만 더 나은 기본 동작 및 구성을 제공합니다.
