## Suspense와 Error Boundary

Suspense, Error Boundary, 컴포넌트를 각각 로딩, 에러, UI로 역할을 부여하여 구현해보았습니다.

비동기 처리가 존재하는 컴포넌트 상위를 감싸는 용도로 사용하기 위해 두 개를 합쳐 AsyncWrapper라는 컴포넌트를 제작했습니다.

- ErrorBoundary.ts

```jsx
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  resetQuery = () => {
    const { onReset } = this.props;
    onReset?.();
    this.setState(initialState);
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;
    if (hasError && error) {
      return fallback({ reset: this.resetQuery });
    }

    return children;
  }
}

export default ErrorBoundary;
```

프로젝트에서 리액트 쿼리를 같이 사용하고 있었기 때문에 resetQuery가 추가되었습니다. 나머지 로직은 위 예시과 거의 같습니다.

- resetQuery

  에러 발생 시 사용자가 reset 버튼을 클릭하여 에러를 리셋하고 다시 요청을 받아올 수 있도록 UX를 구성하기 위해 구현했습니다.

- AsyncWrapper.tsx

```jsx
function AsyncWrapper(props: Props) {
  const { children, errorFallback, suspenseFallback } = props;
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary fallback={errorFallback} onReset={reset}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncWrapper;
```

props로 errorFallback, suspenseFallback 을 넘겨 원하는 폴백을 넘길 수 있도록 했습니다.
useQueryErrorResetBoundary는 쿼리 에러를 초기화 해주기 위해 사용했습니다.

### 참고자료

- [React Suspense + ErrorBoundary 개념과 활용](https://velog.io/@shinoung2360/SuspenseErrorBoundary)
