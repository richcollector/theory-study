## 메모이제이션 (memoization)

Memoization은 특정한 값을 저장해뒀다가, 이후에 해당 값이 필요할 때 새롭게 계산해서 사용하는게 아니라 저장해둔 값을 활용하는 테크닉을 의미합니다.

- useMemo

  useMemo는 이전 값을 기억해두었다가 조건에 따라 재활용하여 성능을 최적화 하는 용도로 사용됩니다.
  (특정 value를 재사용)

```jsx
// const aaa = Math.random();
const aaa = useMemo(() => Math.random(), []);
console.log(aaa);
```

계산이 복잡한 값을 변수로 기억해 놓고 싶을 때 사용합니다.

- useCallback

  useMemo를 조금 더 편리하게 사용할 수 있도록 만든 버전으로 함수를 기억합니다.
  (특정 함수를 재사용)

```jsx
let countLet = 0;
// const onClickCountLet = (): void => {
// console.log(countLet + 1);
// countLet += 1;
// };
const onClickCountLet = useCallback((): void => {
  console.log(countLet + 1);
  countLet += 1;
}, []);
```

### props를 비교하는 방식

- React.memo

  기본적으로 props의 변화를 이전 props와 새로운 props를 각각 shallow compare 해서 판단합니다.

  ```jsx
  // example
  const MyComponent = React.memo((props) => {
  	return (/*컴포넌트 렌더링 코드*/)}
  );
  ```

  ```jsx
  export default React.memo(component);
  ```

#### 직접 만드는 비교 함수

- areEqual

  ```jsx
  function areEqual(prevProps, nextProps) {
  /_
  true를 return할 경우 이전 결과를 재사용
  false를 return할 경우 리렌더링을 수행
  _/
  }
  export default React.memo(MyComponent, areEqual);
  ```

### 주의사항

변화하는 값이 넘어가면 리렌더링이 되기 때문에 불필요하게 됩니다.
모든 컴포넌트에 memo를 넣으면 오히려 memo에 메모리를 낭비 할 수 있습니다.
