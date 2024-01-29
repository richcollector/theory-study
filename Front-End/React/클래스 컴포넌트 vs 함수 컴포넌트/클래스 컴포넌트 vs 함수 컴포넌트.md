## 클래스형 컴포넌트와 함수 컴포넌트

리액트 컴포넌트는 클래스 컴포넌트 또는 함수 컴포넌트로 작성될 수 있습니다.
이전의 리액트에서는 클래스 컴포넌트만 상태값을 가질 수 있고, 리액트 컴포넌트의 생명 주기 함수를 작성할 수 있습니다.

**리액트 버전 16.8부터 훅(Hook)이 등장하면서 함수 컴포넌트에서도 상태값과 생명 주기 함수 코드를 작성 할 수 있게 되었습니다.**

### 이전의 함수 컴포넌트

- JSX를 return문을 사용해서 반환합니다.
- state를 사용할 수 없습니다.
- 생명 주기 함수를 작성할 수 없습니다.

```jsx
import React from "react";

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>\*</b>}
      안녕하세요 {name}
    </div>
  );
}

export default Hello;
```

### 클래스형 컴포넌트

- class 키워드로 시작합니다.
- Component로 상속 받습니다.
- render() 함수를 사용해서 JSX를 반환합니다.
- props를 조회할 때 this 키워드 사용합니다.

```jsx
import React, { Component } from "react";

class Hello extends Component {
  render() {
    const { color, name, isSpecial } = this.props;
    return (
      <div style={{ color }}>
        {isSpecial && <b>\*</b>}
        안녕하세요 {name}
      </div>
    );
  }
}

export default Hello;
```

#### defaultProps 설정 시 클래스 내부에 static 키워드와 함께 선언

```jsx
import React, { Component } from 'react';

class Hello extends Component {
// defaultProps 설정 방법 1
static defaultProps = {
    name: '이름없음'
};

// defaultProps 설정 방법 2
Hello.defaultProps = {
    name: '이름없음'
};
}

export default Hello;
```

#### 커스텀 메서드 만들기

- 클래스의 생성자 메서드 constructor 에서 bind 작업

```jsx
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  handleIncrease() {
    console.log("increase");
    console.log(this);
  }

  handleDecrease() {
    console.log("decrease");
  }

  render() {
    return (
      <div>
        <h1>0</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
```

#### 상태 선언하기

- 클래스형 컴포넌트에서 state로 상태를 관리합니다.
- state 를 선언 할 때에는 constructor 내부에서 this.state 설정합니다.
- 클래스형 컴포넌트의 state 는 무조건 객체 형태여야 합니다.
- render 메서드에서 state 를 조회하려면 this.state를 조회하면 됩니다.

```jsx
import React, { Component } from "react";

class Counter extends Component {
  state = {
    counter: 0,
  };
  handleIncrease = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  handleDecrease = () => {
    this.setState({
      counter: this.state.counter - 1,
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
```

### 참고자료

- [[React] 클래스형 컴포넌트와 함수형 컴포넌트](https://velog.io/@seong-dodo/React-%ED%81%B4%EB%9E%98%EC%8A%A4%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-vs-%ED%95%A8%EC%88%98%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)
