## Class

```jsx
class Modal2 extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <div>안녕</div>;
  }
}
```

클래스형 컴포넌트에서는 render() 메서드가 꼭 있어야 합니다.
이 메서드에서 렌더링하고 싶은 JSX 를 반환하시면 됩니다.

### super(props)를 쓰는 이유

super()는 자식 클래스가 생성될 때 부모 클래스의 생성자를 참조하는 방법으로 react 클래스 컴포넌트의 부모 클래스는 React.Component가 됩니다.
그리고 주의할 점으로 super를 사용하기 전에는 constructor에서 this를 사용할 수 없습니다.

생성자 호출 이후에 props 를 super에 할당하지 않는경우에는 this.props를 불럿을때 undefined가 뜨지만 할당을 한 경우에는 아래 코드와 같이 props에 대한 값이 출력됩니다.

```jsx
class Button extends React.Component {
  constructor(props) {
    super(props); // super에 props 할당
    console.log(props); // {}
    console.log(this.props); // {}
  }
  // ...
}
```

이렇게 super(props) 를 호출하는 것은 생성자 내부에서도 this.props를 정상적으로 사용할 수 있도록 보장해 줍니다.

### class 컴포넌트에서 state

```jsx
class Modal2 extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "kim",
      age: 20,
    };
  }

  changeName = () => {
    this.setState({ name: "hahahaa" });
  };

  render() {
    return (
      <>
        <div>안녕, {this.state.name}</div>
        <button onClick={this.changeName}> 버튼 </button>
      </>
    );
  }
}
```

`()=> {}`과 `function(){}`은 거의 같은 의미이지만 this의 뜻에 의미 차이가 있습니다.
arrow function을 쓴다면 안에 쓰는 this 값을 재정의 해주지 않고, 바깥에 있던 this값을 그대로 끌고 와서 사용합니다.
`function(){}`을 쓰면 this값이 새롭게 변화합니다.
**arrow function은 내부의 this키워드 값을 변화시키지 않고 싶을 때 사용합니다.**

### class 컴포넌트에서 props

```jsx
class Modal2 extends React.Component {
  static defaultProps = {
    name: "이름없음",
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "kim",
      age: 20,
    };
  }
  render() {
    return (
      <div>
        안녕, {this.state.name}
        <button
          onClick={() => {
            this.setState({ name: "park" });
          }}
        ></button>
      </div>
    );
  }
}
```

defaultProps를 설정하는 것은 이전 함수형 컴포넌트에서 했을 때와 똑같이 해주셔도 되고, 다음과 같이 클래스 내부에 static 키워드와 함께 선언 할 수도 있습니다.
props를 조회 해야 할 때에는 this.props를 조회하시면 됩니다.

### 참고자료

- [[React] class 를 이용한 옛날 React 문법 살펴보기](https://velog.io/@okvv26/React-class-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%98%9B%EB%82%A0-React-%EB%AC%B8%EB%B2%95-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0)
