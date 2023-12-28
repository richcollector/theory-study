## Reconciliation (재조정)

리액트는 컴포넌트에서 prop이나 state가 변경될 때, 직전에 렌더링된 요소(element)와 새로 반환된 요소를 비교하여 실제 DOM을 업데이트 할지 말지 결정해야 합니다. 이때 두 element가 일치하지 않으면 리액트는 새로운 요소로 DOM을 업데이트 하는데, 이러한 프로세스를 reconciliation이라고 한니다.

### 비교 알고리즘(Diffing Algorithm)

두 개의 트리를 비교할 때, React는 두 엘리먼트의 루트(root) 엘리먼트부터 비교합니다.
엘리먼트의 타입이 다른 경우에는 이전 트리를 버리고 완전히 새로운 트리를 구축합니다.

```jsx
// 이전 트리

<div>
  <Counter />
</div>

// 새로운 트리
<span>
  <Counter />
</span>

// 이전 Counter는 버리고 새로운 Counter 사용
```

DOM 엘리먼트의 타입이 같은 경우에는 두 엘리먼트의 속성을 확인하여, 동일한 내역은 유지하고 변경된 속성들만 갱신합니다.

```jsx
<div className="before" title="stuff" />

<div className="after" title="stuff" />
// className만 수정
```

DOM 노드의 처리가 끝나면, React는 이어서 해당 노드의 자식들을 재귀적으로 처리합니다.

### 자식에 대한 재귀적 처리

DOM 노드의 자식들을 재귀적으로 처리할 때, React는 기본적으로 동시에 두 리스트를 순회하고 차이점이 있으면 변경된 부분을 갱신합니다.

```jsx
// 이전 트리

<ul>
  <li>first</li>
  <li>second</li>
</ul>

// 새로운 트리

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

위에서부터 비교하다가 새로운 트리에서 third가 생겼으므로 `<li>third</li>`만 트리에 추가 합니다.

만약, third가 맨 앞에 추가된다면??

```jsx
// 이전 트리

<ul>
  <li>first</li>
  <li>second</li>
</ul>

// 새로운 트리

<ul>
	<li>third</li> // <- 여기!
  <li>first</li>
  <li>second</li>
</ul>
```

아래의 first, second가 같음에도 위에서부터 트리를 전부 바꿔야합니다. (성능저하)

이러한 문제를 해결하기 리액트에서 위해 key속성을 제공합니다.

자식들이 key를 가지고 있다면, React는 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인합니다.

```jsx
// 이전 트리

<ul>
  <li key="100">first</li>
  <li key="200">second</li>
</ul>

// 새로운 트리

<ul>
	<li key="300">third</li> // <- 여기!
  <li key="100">first</li>
  <li key="200">second</li>
</ul>
```

이렇게 되면, 300 key를 가진 third만 새로운 트리에 새로 추가되고 나머지는 이동만 하게 됩니다.

### 참고자료

- [[React] Reconciliation이란? (+ virtual DOM, 리액트는 선언적)](https://velog.io/@syoung125/eact-Reconciliation%EC%9D%B4%EB%9E%80-virtual-DOM-%EB%A6%AC%EC%95%A1%ED%8A%B8%EA%B0%80-%EC%84%A0%EC%96%B8%EC%A0%81)
