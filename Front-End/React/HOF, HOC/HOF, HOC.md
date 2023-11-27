## HOF (High Order Function)

- 높은 순서의 함수를 먼저 실행하는 함수를 다루는 함수이다.

- 기존의 태그 id값을 넘겨줄 때 event.target.id를 사용하곤 했다. 하지만 이는 고유한 id를 태그에 입력하는 것이기 때문에 예기치 못하게 id가 중복되어 작성되는 경우 오작동 할 수가 있다.

- HOF를 사용하면 UI프레임 워크를 사용하면서 발생했던
  id가 사라지는 문제도 해결된다.

- 예시코드

  - 기존의 방법

  ```jsx
  export default function Aaa() {
    const onClickButton = (event) => {
      console.log(event.target.id);
    };
    return <button id={123} onClick={onClickButton}></button>;
  }
  ```

  － 수정된 방법

  ```jsx
  export default function Bbb() {
    const onClickButton = (id) => (event) => {
      console.log(id);
    };
    return <button onClick={onClickButton(123)}></button>;
  }
  ```

  - event

  ```jsx
  onClick={onClickPage("철수")(event)}
  ```

  뒤의 ()는 자바스크립트에서 실행하여 event가 들어간다.

## HOC (High Order Component)

- 컴포넌트를 가져와 새 컴포넌트를 반환하는 것이다.

- 권한을 검사하는 모든페이지에 똑같은 코드를 작성해야 하지만, 권한 검사 로직을 수정할 일이 생겼을 때 일일이 페이지마다 들어가서 수정해야 할 것이다.

- 권한 검사만을 따로 뽑아서 컴포넌트로 만든 후 import하여 사용하면 유지보수가 훨씬 간편해 진다.

- 예시코드

```jsx
export const 로그인체크 = (Component: any) => (props: any) => {
export default 로그인체크(myPage);
export default로 이름을 다시 myPage나 필요한 이름으로 바꾼다.
```
