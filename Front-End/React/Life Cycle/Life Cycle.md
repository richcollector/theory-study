## React의 생명 주기(라이프 사이클)

리액트는 컴포넌트 기반의 View를 중심으로 한 라이브러리입니다. 그러다보니 각각의 컴포넌트에는 라이프 사이클 즉, 컴포넌트의 생명 주기가 존재합니다. 컴포넌트의 생명은 보통 페이지에서 렌더링되기 전인 준비 과정에서 시작하여 페이지에서 사라질 때 끝이 납니다.

![](./Cycle.png)

위의 이미지는 리액트의 생명 주기를 나타낸 화면입니다.
이미지에서 볼 수 있듯이 컴포넌트는 생성 => 업데이트 => 제거의 생명 주기를 갖고 있습니다.
그럼 이제 각각의 라이프 사이클이 무엇이고 어떻게 Class와 Hooks를 활용한 함수형 컴포넌트에서 사용하는지 알아보도록 하겠습니다.
아래 목록에서 자주 사용되는 메서드는 코드블럭으로 표시하겠습니다. 나머지는 상대적으로 덜 사용됩니다.

### 특징

- 마운트(생성)

  컴포넌트의 인스턴스가 생성되어, DOM에 삽입될 때 순서대로 호출됩니다.

  - constructor()
  - getDerivedStateFromProps()
  - render()
  - componentDidMount()

- 업데이트

  props나 state가 변경되면 렌더(갱신)가 진행되며 순서대로 호출됩니다.

  - getDerivedStateFromProps()
  - shouldComponentUpdate()
  - render()
  - getSnapshotBeforeUpdate()
  - componentDidUpdate()

- 마운트 해제(제거)

  아래 메서드는 컴포넌트가 DOM에서 제거될 때 호출됩니다.

  - componentWillUnmount()

### 생명 주기 메서드

- render()

  클래스 컴포넌트에서 반드시 구현되어야 하는 유일한 메서드입니다.

  - 이 메서드가 호출되면 this.props와 this.state의 값을 활용하여 값을 반환합니다.
  - render() 함수는 컴포넌트의 state를 변경하지 않고, 호출될 때마다 동일한 결과를 반환하며 브라우저와 직접적인 상호작용을 하지 않습니다.

```jsx
// Class
class Example extends React.Component {
  render() {
    return <div>컴포넌트</div>;
  }
}

// Hooks
const example = () => {
  return <div>컴포넌트</div>;
};
```

함수형 컴포넌트에서는 render를 안쓰고 컴포넌트를 렌더링할 수 있습니다.

- constructor(props)

  메서드를 바인딩하거나 state를 초기화하는 작업이 없다면 constructor(생성자)가 없어도 됩니다.

  - react 컴포넌트의 생성자는 해당 컴포넌트가 마운트되기 전에 호출됩니다.
  - 생성자를 구현하면, this.props가 생성자 내에서 정의되도록 super(props)를 호출해야 합니다.
  - state의 값을 변경하고자 한다면 constructor() 외부에서 this.setState()를 통해 수정해야 합니다.

```jsx
// Class
class Example extends React.Component {
constructor(props) {
super(props);
this.state = { count: 0 };
}

// Hooks
const Example = () => {
const [count,setCount] = useState(0);
}
```

클래스형에서는 초기 state를 정할 때 constructor를 사용해야 합니다. 하지만 훅에서는 useState hook을 사용하면 초기 상태를 쉽게 설정해줄 수 있습니다.

- componentDidMount()

  컴포넌트가 마운트된 직후에 호출됩니다.

  - DOM 노드가 있어야 하는 초기화 작업이 이루어지면 좋습니다.
  - 외부에서 데이터를 불러와야 한다면 네트워크 요청을 보내기 좋은 위치입니다.

```jsx
// Class
class Example extends React.Component {
componentDidMount() {
...
}
}

// Hooks
const Example = () => {
useEffect(() => {
...
}, []);
}
```

함수형 Hooks 에서는 useEffect의 [] 의존성 배열을 비워야지만 똑같은 메소드를 구현할 수 있습니다.

- componentDidUpdate()

  갱신(렌더)가 일어난 직후에 호출되며 최초 렌더링에서는 호출되지 않습니다.

```jsx
// Class
class Example extends React.Component {
componentDidUpdate(prevProps, prevState) {
...
}
}

// Hooks
const Example = () => {
useEffect(() => {
...
});
}
```

- componentWillUnmount()

  컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다.

타이머 제거, 네트워크 요청 취소, componentDidMount()에서 생성된 작업 등을 정리할 때 사용됩니다.
실행 직후 컴포넌트는 렌더링되지 않으므로 setState()를 호출하면 안됩니다.

```jsx
// Class
class Example extends React.Component {
    coomponentWillUnmount() {
        ...
    }
}

// Hooks
const Example = () => {
    useEffect(() => {
        return () => {
            ...
        }
    }, []);
}
```

함수형 컴포넌트에서는 useEffect CleanUp 함수를 통해 해당 메서드를 구현할 수 있습니다.

#### 용어 공부

- 인스턴스(instance)

객체 지향 프로그래밍(OOP)에서 클래스(class)에 소속된 개별적인 객체를 말합니다. 예를 들어, 사용자(user)라는 클래스를 정의하고 홍길동(hong)이라는 객체를 생성할 경우, hong이라는 객체는 user라는 클래스의 인스턴스가 됩니다. 하나의 클래스를 사용하여 유사한 성질을 가진 수많은 인스턴스를 생성할 수 있습니다. 이 때 추상적인 개념인 클래스에서 실제 객체를 생성하는 것을 인스턴스화(instantiation)한다고 말합니다.
