## React hook과 일반 함수의 차이점

### React Hooks

리액트 Hooks는 16.8 버전부터 도입된 기능으로, 클래스 컴포넌트의 라이프사이클이나 상태 관리 등의 기능을 함수형 컴포넌트에서도 사용할 수 있게 해줍니다. Hooks의 도입으로 인해 많은 장점이 있습니다.

#### React Hooks의 장점

- 코드 간결성
  함수 컴포넌트와 Hooks를 사용하면 클래스 컴포넌트보다 코드가 더 간결해집니다. 따라서 코드를 이해하고 유지 보수하기가 더 쉬워집니다.

- 재사용성
  커스텀 Hooks를 만들어 여러 컴포넌트에서 재사용할 수 있습니다. 이로 인해 코드의 중복을 줄이고 논리를 쉽게 공유할 수 있습니다.

- 컴포넌트 분리
  Hooks를 이용하면 상태 관련 로직을 컴포넌트에서 분리하여 더욱 독립적인 함수로 만들 수 있습니다. 이로 인해 컴포넌트를 더욱 재사용 가능하고 테스트하기 쉬운 구조로 만들 수 있습니다.

- 라이프사이클 메서드 문제 해결
  **클래스 컴포넌트에서는 관련 있는 코드가 여러 라이프사이클 메서드에 분산될 수 있습니다.** 이로 인해 코드의 일관성을 유지하거나 버그를 잡기 어려울 수 있습니다. Hooks를 사용하면 이런 문제를 해결하고, 관련 있는 코드를 한데 묶을 수 있습니다.

### 일반함수와 React Hooks의 차이점

리액트 Hooks와 일반 함수는 둘 다 JavaScript 함수이지만, 사용 목적과 방식이 다릅니다.

#### 일반 함수

이는 단순히 특정 로직을 수행하고 결과를 반환하는 역할을 합니다. 일반 함수는 특정한 상태를 유지하지 않으며, 입력이 주어지면 항상 동일한 출력을 반환합니다.

```js
function add(a, b) {
  return a + b;
}
```

#### 리액트 Hooks

이는 함수형 컴포넌트에서 상태 및 생명주기와 같은 리액트의 고급 기능을 사용할 수 있도록 해줍니다. Hooks는 컴포넌트의 상태를 관리하거나, 사이드 이펙트를 처리하는 등의 작업을 수행합니다. Hooks는 리액트의 상태를 유지하고, 리액트의 렌더링 시스템에 연결됩니다. 대표적인 예로는 useState, useEffect, useContext 등이 있습니다.

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

위의 예시에서 useState는 컴포넌트의 상태를 관리하고, useEffect는 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 하는 등, 일반 함수와는 다른 역할을 수행합니다. 그리고 이러한 Hooks는 함수형 컴포넌트 내에서만 호출할 수 있습니다. 이는 리액트가 Hooks를 호출하는 순서를 기억하여 상태를 올바르게 관리하기 위함입니다.

#### React Hooks를 함수형 컴포넌트 내에서만 호출하는 이유

Hooks의 규칙 중 하나는 "Hooks는 최상위 레벨에서만 호출해야 한다"는 것입니다. 이는 반복문, 조건문 또는 중첩된 함수 내에서 Hooks를 호출하면 안된다는 뜻입니다. 그 이유는 **리액트가 Hooks를 호출하는 순서에 의존하여 해당 Hooks가 관리하는 상태와 연관성을 유지**하기 때문입니다.

리액트는 Hooks가 호출되는 순서를 매 렌더링에서 동일하게 유지하는 방식으로, 각각의 Hook에 대한 상태를 추적하고 관리합니다. 따라서, Hooks의 호출이 조건부이거나 루프 내부에서 발생하면, 이러한 호출 순서는 렌더링 간에 일관성이 유지되지 않을 수 있습니다. 이로 인해 상태가 예상치 못한 방식으로 업데이트될 수 있습니다.

예를 들어, 아래와 같이 조건부로 Hook을 호출하는 경우, 문제가 발생할 수 있습니다.

```jsx
import React, { useState, useEffect } from "react";

function Example({ condition }) {
  // 문제 있는 코드
  if (condition) {
    const [value, setValue] = useState(0); // 조건부로 Hook을 호출
  }

  // 다른 코드...
}
```

위의 코드에서 condition 값에 따라 useState Hook의 호출이 결정되므로, Hook의 호출 순서가 일관되지 않게 됩니다. 이는 리액트가 상태를 올바르게 추적하고 관리하는 데 문제를 일으킬 수 있습니다.

따라서, Hooks는 항상 최상위 레벨에서 호출해야 하며, 조건부 로직은 Hook 내부에서 처리해야 합니다. 이렇게 하면 리액트는 Hooks가 호출되는 순서를 기억하고, 이에 따라 상태를 올바르게 관리할 수 있습니다.

### 참고자료

- [ React hook과 일반 함수의 차이점](https://velog.io/@dev_seongjoo/React-hook%EC%9D%98-%EC%9E%A5%EC%A0%90%EA%B3%BC-React-hook-%EA%B3%BC-%EC%9D%BC%EB%B0%98-%ED%95%A8%EC%88%98%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%97%90-%EB%8C%80%ED%95%B4-%EB%A7%90%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94)
