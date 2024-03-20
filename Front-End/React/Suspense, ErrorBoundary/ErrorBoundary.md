## ErrorBoundary

하위 컴포넌트 트리의 렌더링 중 발생한 에러를 감지하여 컴포넌트 트리 대신 폴백 UI를 보여줄 수 있는 컴포넌트입니다.
아래 컴포넌트에서 에러 발생 시 throw 하여 에러에 관한 책임을 Error Boundary가 갖도록 한다.

```jsx
function Fetcher({ children }) {
  const dispatch = useDispatch();
  const { isLoading, error, data } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchComments);
  }, []);

  if (error) {
    throw error;
  }

  if (isLoading) {
    return <Loading />;
  }

  return children;
}
```

생명주기 메서드인 static getDerivedStateFromError() 와 componentDidCatch()를 정의하여 사용할 수 있습니다.

- static getDerivedStateFromError

  이 정적 메소드는 하위의 자식 컴포넌트에서 에러를 뱉었을 때 호출됩니다. 여기서 다음 렌더링에서 폴백 UI가 보이도록 에러에 관한 state를 업데이트할 수 있습니다.

- componentDidCatch

  에러 로그 기록과 같은 추가적인 로직을 작성할 수 있습니다.

## 주의할 점

다음과 같은 에러는 포착할 수 없습니다.

- 이벤트 핸들러
- 비동기 코드 (setTimeout 또는 requestAnimationFrame 콜백)
- SSR
- 자식 컴포넌트에서가 아닌 Error Boundary 자체에서 발생하는 에러

```jsx
import React from "react";
import User from "./User";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const user = {
    id: 1,
    username: "velopert",
  };
  return (
    <ErrorBoundary>
      <User />
    </ErrorBoundary>
  );
}

export default App;
```

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
```

```jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    console.log("에러가 발생했습니다.");
    console.log({
      error,
      info,
    });
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <h1>에러 발생!</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

여기서 componentDidCatch 메서드에는 두개의 파라미터를 사용하게 되는데 첫번째 파라미터는 에러의 내용, 두번째 파라미터에서는 에러가 발생한 위치를 알려줍니다.

이 메서드에서 현재 컴포넌트 상태 error true로 설정을 해주고, render() 메서드에서는 만약 this.state.error 값이 true 라면 에러가 발생했다는 문구를 렌더링하도록 하고 그렇지 않다면 this.props.children을 렌더링합니다.

### 참고자료

- [React Suspense + ErrorBoundary 개념과 활용](https://velog.io/@shinoung2360/SuspenseErrorBoundary)
