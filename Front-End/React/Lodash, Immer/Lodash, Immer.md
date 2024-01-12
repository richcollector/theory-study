## Lodash, Immer

### Lodash

보통의 경우 array, collection, date 등 데이터의 필수적인 구조를 쉽게 다룰 수 있게끔 하는데에 사용됩니다. JavaScript에서 배열 안의 객체들의 값을 handling(배열, 객체 및 문자열 반복 / 복합적인 함수 생성) 할 때 유용하죠. 이러한 점으로 인해 JavaScript의 코드를 줄여주고, 빠른 작업에 도움이 됩니다.

ㅡ. (변수) 이런식으로 작성할 경우 lodash wrapper로 변수를 감싸게 되면서 해당 변수에 대한 chaining을 시작합니다.
\_ 라는 기호를 이용해서 사용하기 때문에 명칭 또한 lodash가 된 것입니다.

- 브라우저에서 지원하지 않는 성능이 보장되어있는 다양한 메소드를 가지고 있습니다.
- 퍼포먼스 측면에서 native보다 더 나은 성능을 가집니다.
- npm이나 기타 패키지 매니저를 통해 쉽게 사용 가능합니다.

#### lodash method

<details>

<summary>throttle(func, [wait=0], [options={}])</summary>

throttle 은 발생한 이벤트 수와 관계없이 지정한 시간 단위당 최대 한 번만 동작하는 함수입니다.

```jsx
import React, { Component } from "react";
import { throttle } from "lodash";

class Ex_Trottle extends Component {
  throttleFunc = throttle(() => {
    console.log("throttle CALL");
  }, 1000);

  render() {
    return (
      <>
        <h2>검색어 입력</h2>
        <input type="text" onChange={this.throttleFunc} />
      </>
    );
  }
}

export default Ex_Trottle;
```

</details>

<details>

<summary>debounce(func, [wait=0], [options={}])</summary>

마지막 이벤트가 실행되고 일정 시간 동안, 추가 이벤트가 발생하지 않을 때 실행되는 함수입니다.

```jsx
import React, { Component } from "react";
import { debounce } from "lodash";

class Ex_Debounce extends Component {
  debounceFunc = debounce(() => {
    console.log("debounce CALL");
  }, 1000);

  render() {
    return (
      <>
        <h2>검색어 입력</h2>
        <input type="text" onChange={this.debounceFunc} />
      </>
    );
  }
}

export default Ex_Debounce;
```

</details>

<details>

<summary>array 관련 method</summary>

- findIndex()

  형식: \_.findindex(array,[predicate=.indentity],[thisArg])
  출력: index number
  배열 내에서 원하는 index를 쉽게 구할 수 있습니다.

```jsx
var myFriend = [
 {name:'kys',job:'developer',age:27},
 {name:'cys',job:'webtoons man',age:27},
 {name:'yhs',job:'florist',age:26},
 {name:'chj',job:'nonghyup man',age:27},
 {name:'ghh',job:'coffee man',age:27},
 {name:'ldh',job:'kangaroo father',age:27},
 {name:'hsy',job:'monk',age:27},
];

// 콜백함수를 통해 나이가 26인 객체가 처음으로 나오는 index 반환
_.findIndex(myFriend, function(friend) {
  return friend.age === 26;
});
// -> 2

// 처음 일치하는 object의 index 값을 반환합니다.
_.findIndex(myFriend, { name: 'cys', job:'webtoons man',age: 27 });
// -> 1

// 나이가 26인 객체가 처음으로 나오는 index 반환
_.findIndex(myFriend, age: 27);
// → 0
```

- flatten()

  형식: \_.flatten(arraym[isDeep])
  다차원 배열 내의 요소를 출력하는데 편리합니다.

```jsx
// 배열안의 배열 값을 순서대로 나열합니다.(depth를 명시하지 않을 경우1depth만)

_.flatten([1, [2, 3, [4]]]);
// → [1, 2, 3, [4]]

// 배열안의 배열 값을 깊이와 상관없이 순서대로 나열합니다.
_.flatten([1, [2, 3, [4]]], true);
// → [1, 2, 3, 4]
```

- remove()

  형식: .remove(array, [predicate=.identity], [thisArg])
  출력: 제거된 array
  배열 내의 조건에 맞는 요소들을 제거한 후 반환해줍니다.

```jsx
var array = [1, 2, 3, 4];

var evens = remove(array, function (n) {
  return n % 2 == 0;
});

console.log(array);
//-> [1,3]

console.log(evens);
//-> [2,4]
```

</details>

<details>

<summary>collection 관련 method</summary>

- every()

  형식: .every(collection, [predicate=.identity], [thisArg])
  출력: boolean 값
  배열 안 요소들의 값들을 비교하고 분석하는데 용이합니다.

```jsx
var myFriend = [
  { name: "kys", active: false },
  { name: "cys", active: false },
];

// 값을 비교할 수 있습니다.
_.every(myFriend, { name: "kys", active: false });
// → true

// key와 value가 있는지 확인할 수 있습니다.
_.every(myFriend, "active", false);
// → true

// key에 해당하는 value가 모두 true이면 true를 반환합니다.
_.every(myFriend, "active");
// → false
```

- find()

  형식: .find(collection, [predicate=.identity], [thisArg])
  find()는 조건을 만족하는 컬렉션에서의 첫번째 요소를 찾는 메소드입니다.

```jsx
var myFriend = [
  { name: "kys", job: "developer", age: 27 },
  { name: "cys", job: "webtoons man", age: 27 },
  { name: "yhs", job: "florist", age: 26 },
  { name: "chj", job: "nonghyup man", age: 27 },
  { name: "ghh", job: "coffee man", age: 27 },
  { name: "ldh", job: "kangaroo", age: 27 },
];

// 콜백함수가 처음으로 참이되는 객체를 반환
_.find(myFriend, function (friend) {
  return friend.age < 28;
});
// → { name: 'kys',job:'developer' ,'age': 27}
```

- filter()

  형식: .filter(collection, [predicate=.identity], [thisArg])
  filter()는 특정 조건을 만족하는 모든 요소를 추출하는 메소드입니다.

```jsx
var myFriend = [
  { name: "kys", job: "developer", age: 27 },
  { name: "cys", job: "webtoons man", age: 27 },
  { name: "yhs", job: "florist", age: 26 },
  { name: "chj", job: "nonghyup man", age: 27 },
  { name: "ghh", job: "coffee man", age: 27 },
  { name: "ldh", job: "kangaroo", age: 27 },
];

// 입력한 object의 key와 value들을 모두 포함하는 객체들을 배열로 반환합니다.
_.filter(myFriend, { age: 26, job: "florist" });
// → [{ name: 'yhs',job:'florist', age: 26}]

// 입력한 key값이 true인 객체들을 배열로 반환합니다.
_.filter(myFriend, (friend) => friend.age == 26);
// → [{ name: 'yhs',job:'florist', age: 26}]
```

- map()

  형식: .map(collection, [iteratee=.identity], [thisArg])
  출력: 계산 결과 배열함수를 실행하고 그 결과를 배열로 반환합니다. key값을 입력할 경우 해당 key값들만 간추려서 반환홥니다.

```jsx
function timesTwo(n) {
  return n * 3;
}

_.map([1,2],timesTwo);
//->[3,6]

var myFriend=[
  {'name':'kys'},
  {'name':'cys'},
];

.map(myFriend,'name');
//->['kys','cys']
```

- forEach()

  형식: .forEach(collection, [iteratee=.identity], [thisArg])
  배열의 값마다 함수를 실행시킬 때 용이하게 사용됩니다.

```jsx
_([1, 2])
  .forEach(function (n) {
    console.log(n);
  })
  .value();
// 1
// 2
```

- includes()

  형식: \_.includes(collection, target, [fromIndex=0])
  출력: boolean
  해당 collection에 target값이 있는지 판별해줍니다.

```jsx
// 배열에 값이 있는지 찾습니다.
_.includes([1, 2, 3], 1);
// → true

// index에 해당 값이 있는지 찾습니다.
_.includes([1, 2, 3], 1, 2);
// → false

// 일치하는 값이 있는지 찾습니다.
_.includes({ name: "yhs", age: 26 }, "yhs");
// → true

// 일치하는 값이 문자열 안에 있는지 찾습니다.
_.includes("dontknow", "ont");
// → true
```

- reduce()

  형식: .reduce(collection, [iteratee=.identity], [accumulator], [thisArg])

```jsx
//첫번째 인자에 대해 배열 내부의 값을 통해 콜백함수를 실행시킨 후 결과값을 반환합니다.

_.reduce([1, 2], function (total, n) {
  return total + n;
});
```

</details>

### Immer

리액트에서 배열이나 객체를 업데이트할 때 직접 수정하지 않고 불변성을 지켜주면서 업데이트를 해야하는데, 이때 쉽게 불변성을 유지하면서 업데이트를 도와주는 라이브러리가 Immer 라이브러리 입니다.

#### 사용법

`npm install immer`
위 명령어로 먼저 immer 라이브러리를 받습니다.

```jsx
import produce from "immer";
```

불변성을 관리할 코드에서 상단에 immer를 import해줍니다.
produce 함수를 사용하는데, **첫번째 파라미터에는 수정하고 싶은 상태, 두번째 파라미터에는 어떻게 업데이트하고 싶을지 정의하는 함수**를 넣어줍니다.
보통 produce(state, draft) 형태로 사용합니다.

```jsx
const state = {
  number: 1,
  dontChangeMe: 2,
};

const nextState = produce(state, (draft) => {
  draft.number += 1;
});

console.log(nextState);
```

##### Reducer에서의 사용법

```jsx
import React, { useReducer, useMemo } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import produce from "immer";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

### 참고자료

- [[ React ] lodash 의 debounce 와 throttle](https://blog.naver.com/PostView.naver?blogId=twilight_teatime&logNo=222962739207)
- [[React] Immer (produce)](https://narup.tistory.com/226)
