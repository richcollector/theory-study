## useEffect

리액트는 side effect라는 것을 처리하기 위해 useEffect를 사용하라고 한다. 그렇다면 side effect는 무엇이고, 이것을 왜 별도로 처리해야 하는 것일까?

### Side effect?

함수 내 특정 동작이 함수 외부에 영향을 끼쳐, 프로그램의 동작을 이해하기 어렵게 만드는 행위

위 설명은 side effect를 요약한 설명이다. 그냥 보기엔 쓰면 안될 것 같은 내용이다. 그러나 side effect는 정말 많은 곳에서 쓰이고 있다. 바로 함수 내에서 전역변수나 정적 변수를 수정하거나, 함수 외부와 통신 및 파일 읽기/쓰기 등이 대표적인 예시이다. 이렇듯 side effect는 무조건 사용하지 말아야 하는 개념이 아닌, 주의가 필요한 내용으로 이해하면 좋을 것 같다.

그렇다면 리액트에서 side effect가 의미하는 것은 어떤 것일까?

#### Side effect 예시

1. 서버와의 통신
   우리는 이벤트 핸들러라는 개념을 배웠다. 이는 사용자의 특정 상호작용을 통해 발생한 이벤트를 처리하는 방식이다. 이러한 이벤트가 처리되는 조건은 명확하다. 만약 사용자가 페이지에 접근했을 때 서버에 연결하여 초기화 작업을 진행하는 특정 작업을 하고 싶다면 어떻게 처리해야 좋을까?

2. setTimeout, setInterval
   리액트 컴포넌트에서 setTimeout과 setInterval과 같이 예측이 어려운 타이밍 처리를 하려면 어떻게 해야 할까?

3. 리액트 외부와 상호작용
   리액트는 자바스크립트 라이브러리다. 즉 다른 자바스크립트 라이브러리와 혼재되어 사용될 수 있다. 만약 jquery와 같이 사용해야 해서 리액트가 관리하는 외부의 엘리먼트와 상호작용하거나, 브라우저의 API(document, window 등)를 사용해야 한다면 어떻게 해야 할까?

그렇다면 위처럼 우리 컴포넌트가 side effect를 야기하는 경우, 어떻게 하면 좀 더 유연하게 대처할 수 있을까? 이런 상황을 위해 리액트는 useEffect를 제공한다. useEffect는 컴포넌트가 최대한 순수 함수가 될 수 있도록 side effect를 따로 관리 할 수 있도록 한다. 한문장으로 정리하면 아래와 같다.

매번 컴포넌트가 렌더링 될 때 특정 조건에 의존하여 수행되며, 컴포넌트가 최대한 순수 함수를 유지할 수 있도록 도와주는 함수

사실 useEffect는 이벤트 핸들러에 속하는 개념이다. 우리가 지금까지 사용한 이벤트 핸들러는 렌더링 이후, 사용자의 상호작용에 의해 실행되는 함수였다. useEffect는 렌더링 이후에 실행되고, 특정 조건을 만족하면 실행된다는 차이가 존재한다.

### 순수 함수와 참조 투명성

Side effect를 이해하려면 순수 함수에 대한 개념을 알고 있으면 좋다. 우선, 우리가 작성하는 리액트 컴포넌트로 예를 들어 보자. 클래스로 컴포넌트를 만들 수도 있지만 현재는 대부분 hook이라는 형태로 컴포넌트를 작성할 것이다. 여기서 우리가 작성한 컴포넌트는 일반적으로 특정 JSX를 반환하는 함수이다.

다음과 같은 컴포넌트를 확인해 보자.

```jsx
const App({name}) {
return (<div>{name}</div>);
};
```

위 컴포넌트는 name이라는 인자를 받고, div를 반환하는 함수이다. 여기서 name은 우리가 props라고 불리고, App은 컴포넌트라고 부른다.
여기서 App이라는 함수는 순수함수(pure function)라고 부른다. 왜 그럴까?

**Same input will always return same output.**

아주 중요한 개념이다. 위 App 함수는 같은 입력에 대해 항상 같은 결과를 반환해 줄 것이다. 즉 외부와 전혀 관련이 없고, 함수 외부에 영향을 주지 않는다. 이러한 함수들을 순수함수라고 하며 이러한 함수들은 참조에 투명(referentially transparent)하다고 한다. 리액트는 컴포넌트가 최대한 순수 함수를 유지할 것을 권장하고 있으며, 실제로 그렇게 구현해야 컴포넌트 재사용성이 증가하고 예측 및 테스트를 쉽게 할 수 있다.

만약 해당 함수가 같은 입력임에도 다른 결과를 내거나, 함수 외부에 영향을 미치게 될 때, side effect가 있다고 하며, 이러한 함수들을 참조에 불투명(referentially opaque)하다고 한다.

### useEffect의 사용법

```jsx
import { useEffect } from "react"; //useEffect를 사용하기 위해 import

export default function App() {
  console.log("useEffect 전");

  // useEffect도 함수기 때문에 함수 호출
  useEffect(() => {
    console.log("메롱으로 바꿀거지롱");
    const hi = document.getElementById("hi");
    hi.innerText = "메롱";
  });

  console.log("useEffect 후");

  return (
    <div className="App">
      <h1 id="hi">안녕하세요.</h1>
    </div>
  );
}
```

위 코드는 렌더링 이후 리액트 외부에 있는 document 객체와 상호작용한다. 결과적으로 안녕하세요라는 내용이 메롱으로 변경되었다.
여기서 재밌는 점이 있다. 흐름을 살펴보기 위해 useEffect의 전, 내부, 후에 console.log를 찍어보았다. 결과는 어떠한가?
useEffect가 가장 마지막에 호출되었다. 무슨 일일까?

결론부터 말하자면, useEffect가 실행되는 시점은 컴포넌트가 렌더링된 이후다. 여기서 말하는 렌더링은 사실 두가지를 의미하는데, 첫째는 맨처음 컴포넌트가 렌더링되어 화면(DOM)에 마운트되는 시점이다. 두번째는 state나 prop이 변하여 컴포넌트가 재렌더링되는 시점을 말한다. 그렇다면 useEffect는 왜 렌더링이 일어난 후에 실행되는 것일까?
쉽게 생각해 보자. 만약 컴포넌트 외부에 존재하는 DOM에 접근하고자 한다고 해보자. 만약 렌더링이 다 이루어지 전에 useEffect가 동작해서 해당 DOM을 찾지 못하는 상황이 발생하면 어떻겠는가? 리액트는 이러한 side effect가 발생하는 시점이 렌더링이 발생하는 이후가 적당하다고 판단하였다.
또한 위에서 말한 것처럼, 컴포넌트가 재렌더링된 이후에도 useEffect가 호출된다고 하였다.

### useEffect의 세가지 얼굴

useEffect는 함수의 인자 정보에 따라 크게 세가지 방식으로 동작한다.

- 무한반복

```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [count, setCounter] = useState(0);

  useEffect(() => {
    console.log(`useEffect: ${Date()}`);
  });

  const countHandler = (e) => {
    setCounter((s) => s + 1);
  };

  return (
    <div className="App">
      <h1 id="hi">{count}</h1>
      <button onClick={countHandler}>카운터 증가</button>
    </div>
  );
}
```

위 코드는 맨처음 렌더링, 그리고 매 재렌더링 마다 실행되는 useEffect문이다.
특징으로는 useEffect 함수에 특정 콜백을 전달한다는 정도이다. 이 콜백 함수는 매 렌더링이 이루어지고 나서 실행될 것이다.

- 처음에만 실행

```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [count, setCounter] = useState(0);

  useEffect(() => {
    console.log(`useEffect: ${Date()}`);
  }, []);

  const countHandler = (e) => {
    setCounter((s) => s + 1);
  };

  return (
    <div className="App">
      <h1 id="hi">{count}</h1>
      <button onClick={countHandler}>카운터 증가</button>
    </div>
  );
}
```

이전 예제와 동일하지만, useEffect 부분에 두번째 인자가 생겼다. 두번째 인자를 빈 배열로 전달하게 되면, 리액트는 최초 렌더링될 때만 useEffect를 실행한다. 초기에 무언가를 할 때 유용할 것이다.

- 의존성 배열 사용

```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [firstCount, setFirstCounter] = useState(0);
  const [secondCount, setSecondCounter] = useState(0);

  useEffect(() => {
    console.log(`useEffect: ${Date()}`);
  }, [firstCount]);

  const firstCountHandler = (e) => {
    setFirstCounter((s) => s + 1);
  };

  const secondCountHandler = (e) => {
    setSecondCounter((s) => s + 1);
  };

  return (
    <div className="App">
      <h1>{firstCount}</h1>
      <button onClick={firstCountHandler}>카운터 증가</button>
      <h1 id="hi">{secondCount}</h1>
      <button onClick={secondCountHandler}>카운터 증가</button>
    </div>
  );
}
```

이번에는 state를 2개 만들었다. 그리고 useEffect의 두번째 인자인 배열을 확인해 보자. firstCount가 배열에 들어있다. 이를 의존성 배열이라고 부르며, 이것이 의미하는 것은 단순히 해당 컴포넌트가 재렌더링될 때 useEffect를 실행하는 것이 아닌, 의존성 배열에 존재하는 데이터가 변경될 때만 실행하라는 것을 나타낸다.
즉, 위 코드의 useEffect는 firstcount가 변경되는 firstCountHandler 이벤트 핸들러가 호출될 때만 실행될 것이다(처음 렌더링때도 실행됨).

정리하면 아래와 같다.

```jsx
useEffect(() => {
  // 매 렌더링마다 실행
});

useEffect(() => {
  // 컴포넌트가 처음 렌더링된 실행
}, []);

useEffect(() => {
  // 컴포넌트가 처음 렌더링된 이후 실행
  // a나 b가 변경되어 컴포넌트가 재렌더링된 이후 실행
}, [a, b]);
```

### 찌꺼기 청소 clearnup

useEffect는 기본적으로 컴포넌트가 재렌더링될때 실행된다고 했다. API 요청으로 인한 데이터 획득, 로깅, DOM 조작 등의 행위는 일반적으로 문제가 되지 않지만, 특정 작업의 경우에는 메모리 누스 등의 문제를 해결하기 위한 방법이 필요하다. 예를 들어 setInterval이나 setTimeout 등과 같은 이벤트는 등록되고 나서 clearInterval, clearTimeout 등이 호출되지 않으면 사라지지 않는다. 따라서 이를 처리하는 방법을 필요로 하게 된다.

아래 코드를 보자.

```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(1000);

  useEffect(() => {
    setInterval(() => console.log(count), count);
  }, [count]);

  const countHander = (e) => {
    setCount((c) => c + 1000);
  };

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={countHander}>카운트 증가</button>
    </div>
  );
}
```

위 코드는 사용자가 버튼을 클릭할 때마다 해당 count를 기준으로 setInterval을 지정한다. 그러나 매번 useEffect가 실행될 때마다 기존의 seInterval이 사라지지 않는다. 이는 새로운 setInterval을 실행할 때마다 clearInterval을 호출하지 않았기 때문이다. 그렇다면 언제 clearInterval을 호출해야 할까?

useEffect는 함수를 반환한다.
바로 아래 코드를 보자.

```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(1000);

  useEffect(() => {
    console.log("useEffect");
    const interval = setInterval(() => console.log(count), count);

    return () => {
      clearInterval(interval);
      console.log("clearInterval");
    };
  }, [count]);

  const countHander = (e) => {
    setCount((c) => c + 1000);
  };

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={countHander}>카운트 증가</button>
    </div>
  );
}
```

이전코드와 달라진 부분은 useEffect 함수에 return문이 추가되었다는 점이다. 위 코드는 useEffect가 다시 호출되기 전에 useEffect의 return에 작성한 콜백이 실행된다. 이러한 콜백을 clearnup 함수라고 부른다. 결과를 확인해 보면 useEffect가 실행되고 버튼을 클릭하면 다음 useEffect가 실행되기 전에 clearInterval이 실행되는 것을 확인할 수 있다.
(처음 useEffect가 두번 실행되는 것은 react의 StrictMode 때문)

return을 사용하지 않으면 새로운 useEffect를 수행하기 전에 아무런 작업을 하지 않는 것으로 인식한다. 또한 의존성 배열도 주의해야 하는데, 만약 의존성 배열이 []로 되어있으면 해당 useEffect는 첫 렌더링 시에만 동작할 것이다. 따라서 return에 작성된 내용은 컴포넌트가 최종적으로 DOM에서 unmount되는 시점에만 수행될 것이다.
이에 반해 의존성 배열 내에 특정 변수(의존성)이 존재하면 해당 변수들의 변경이 감지될 때마다 useEffect가 재수행될 것이기 때문에 clearnup 함수 또한 계속 실행될 것이다.
