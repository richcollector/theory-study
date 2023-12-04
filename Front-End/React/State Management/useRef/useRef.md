## useRef

useRef는 리액트 훅의 한 종류로, Ref는 reference(참조)의 줄임말이다.
useRef를 이용하면 특정한 DOM요소에 접근이 가능하면, 불필요한 재렌더링을 하지 않는다는 장점이 있다.

### 사용법

- 생성

  const 변수명 = useRef(초기값)
  useRef는 변수명에 초기값을 적는 식으로 만든다.

- 이러한 결과값으로, {current: 초기값} 을 지닌 객체가 반환된다.

useRef에서 기억할 것은 이러한 current라는 키값을 지닌 프로퍼티가 생성되고, 값에 어떤 변경을 줄때도 이 current를 이용해서 한다는 점이다.

- 반환요소에 접근

  <input ref= {변수명}/>

#### 사용 예시

- 저장공간

  ref는 state와 비슷하게 어떤 값을 저장하는 저장공간으로 사용된다.

  - State의 변화 => 렌더링 => 컴포넌트 내부 변수들 초기화
  - Ref의 변화 => No 렌더링 => 변수들의 값이 유지됨
  - State의 변화 => 렌더링 => 그래도 Ref의 값은 유지됨

  (변경시 렌더링을 발생시키지 말아야하는 값을 다룰때 사용한다)

- DOM요소에 접근

  useRef를 사용하면 손쉽게 input에 접근할 수 있다.

바닐라 자바스크립트의 getElementById, querySelector와 비슷하다.

<DOM요소 접근의 대표적인 예>
대표적으로 Input요소를 클릭하지 않아도 focus를 줄때 사용

### 특징

반환된 useRef 객체는 컴포넌트의 전생애주기를 통해 유지가 된다.

- 컴포넌트가 계속해서 렌더링이 되어도 컴포넌트가 언마운드되기 전까지는 값을 그대로 유지할 수 있다

- currnet 속성은 값을 변경해도 상태를 변경할 때 처럼 React 컴포넌트가 재렌더링 되지 않는다.

렌더링과 상관없이, 마운트된 시점부터 언마운트된 시점까지 값을 유지한다.

### 장점

자주 변경되는 값을 state에 담으면, 변경될때마다 재렌더링이 일어나서 성능에 안좋은 영향을 미친다.
하지만 useRef를 이용하면 값이 변경될때마다 렌더링이 일어나지 않는다 => 성능향상!!

### 일반 변수와의 차이점

state는 변경될때마다 재렌더링이 일어나고, ref는 변경이 되어도 렌더링이 일어나지 않는다는 점을 알았다.
그러면 일반 변수에서 선언한 값과는 어떤 차이가 있을까?
let val = 0; 이라는 변수를 선언하고 버튼을 누르면 그값에 +1을 하는 함수를 만들었다고 해보자.

```jsx
const App = () => {

const [count, setCount] = useState(0);

let val = 0;

const increaseCount = () => {
    setCount((prev)=> prev + 1);
    val += 1;
}

return (
    <div>
        <p>val: {val} </p>
        <p>Count: {count} </p>
        <button onClick={increaseCount}> Val올려 </button>
    </div>
)
```

val올려 버튼을 누르고 렌더링을 해주면 val은 몇이 나올까?
정답은 0이다.
렌더링이 될때마다 let val = 0; 를 통해서 val이라는 변수에는 계속해서 0으로 초기화가 된다.

- useRef훅을 이용한 값과의 비교

  ref의 값은 컴포넌트의 전생애주기를 통해서 관리되기 때문에, 아무리 컴포넌트가 렌더링 되더라도 언마운트가 되기 전까지는 값을 계속해서 유지한다.

ref는 렌더링이후에도 값이 유지되지만, 변수는 초기화된다.

### 대표적인 예

input요소에 focus를 주고 싶을때 많이 사용한다.
ex) 로그인 화면에서 id를 입력하는 칸을 클릭하지 않아도 자동적으로 focus가 되어있게 해주면, 키보드만 사용해도 바로 id를 입력할 수 있어서 편리하다.
리셋버튼을 누르면 맨앞에 있는 input에 focus가 들어가는 코드를 짜도록 해보자.

```jsx
import React, { useState, useRef } from "react";

const InputSample = () => {
  const [inputs, setInputs] = useState({
    이름: "",
    nickname: "",
  });

  const nameFocus = useRef();

  const { 이름, nickname } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = () => {
    setInputs({
      이름: "",
      nickname: "",
    });
    nameFocus.current.focus();
  };
  return (
    <div>
      <input
        name="이름"
        placeholder="이름쓰세요"
        onChange={onChange}
        value={이름}
        ref={nameFocus}
      />
      <input
        name="nickname"
        placeholder="닉네임쓰세요"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값:</b>
        {이름}({nickname})
      </div>
    </div>
  );
};

export default InputSample;
```

- const nameFocus = useRef();

- nameFocus라는 변수명을 지어서 useRef()의 초기값을 빈값으로 할당하였다.

- onReset 함수안에 nameFocus.current.focus()

```jsx
const onReset = () => {
  setInputs({
    이름: "",
    nickname: "",
  });
  nameFocus.current.focus();
};
```

- onReset => useRef를 통해 만든 객체인 nameFocus안에 current에 focus()를 준다.

- input안에 ref 속성값으로 {변수명}을 적는다.

```jsx
<input
  name="이름"
  placeholder="이름쓰세요"
  onChange={onChange}
  value={이름}
  ref={nameFocus}
/>
```

- 실제로 focus가 일어날 input에 ref라는 속성을 통해 변수명을 전달한다.
- 초기화 버튼을 눌렀을때, 위와같이 focus버튼이 첫번째 input에 생긴 것을 확인해볼 수 있다.
