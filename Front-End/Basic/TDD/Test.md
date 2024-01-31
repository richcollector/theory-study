## 소프트웨어 테스트

### 테스트의 필요성?

컴퓨터를 통해서 실행하기에 사람이 실행하는 것보다 빠릅니다.
정해진 스크립트에 따라 일관성있게 동작하기에 사람이 테스트 할 경우 발생할 수 있는 **휴먼에러 (오타 등 사람이 일으키는 에러)를 기피할 수 있습니다.**
기능에는 변경이 없으며 더 나은 코드로 변경하려는 의도를 가진 Refactoring을 하려면 test는 필수입니다. refactoring을 하고 기능에 이상이 없는지 확인을 하려는 이유입니다.

### 소프트웨어 테스트 종류

- Unit test

  유닛 테스트는 개별 함수, 메서드, 클래스, 컴포넌트 등의 동작을 테스트합니다. 제일 간단한 형태의 테스트로 실행하는데 가장 적은 비용이 들어서, **가장 빈번하게 수행할 수 있는 테스트**입니다.

- Integration test

  통합 테스트는 **두개 이상의 모듈이 결합해서 동작을 잘 수행하는지에 대한 테스트**입니다. 컴포넌트가 Redux등의 상태관리 라이브러리와 통합했을 때 두 모듈이 잘 어우러져서 최종적으로 의도한 결과를 도출하는지 테스트하는 것이 통합 테스트라고 할 수 있습니다. 통합 테스트는 여러 모듈들을 통합하는 과정이 필요하기에 유닛 테스트보다는 많은 비용이 드는 테스트입니다.

- End-to-End Test

  E2E 테스트는 실제 유저가 애플리케이션을 사용하는 것과 유사한 환경을 구축한 후 실제 유저의 동작을 흉내내서 테스트하는 것입니다. 이는 실제 유저의 동작 흐름을 그대로 모방해서 테스트할 수 있다는 장점이 있지만 환경을 구축해야 하며, **유저의 행동 시나리오를 구축해야 하기에 비용히 많이 드는 테스트입니다**.

우리가 자주쓰는 eslint는 static test(정적인 테스트)를 해준다고 볼 수 있습니다.

### Jest

자바스크립트는 Jest, Mocha, chai 등의 테스트 라이브러리들이 대표적으로 사용되고 있습니다. Jest는 주간 약 1800만 다운로드의 압도적인 점유율을 가지고 있으며, CRA에서도 기본적으로 Jest를 포함해서 환경을 구성해주고 있습니다.

#### Jest 사용법

Jest는 기본적으로 _.test._ 의 형태를 가진 파일을 테스트 파일로 인식하며, 해당 파일안에 있는 코드를 실행합니다.

Jest에서는 이를 기대한 상황과 일치하는지 판단하는 함수들을 matchers라고 표현합니다. 따라서 Jest의 코드는 아래와 같은 형태를 띄게 됩니다.

특정한 동작을 수행합니다.
matcher를 통해서 실제 결과와 기대값이 맞는지를 검증합니다.
이때 하나의 특정한 동작을 수행하기 위해서 test() 또는 it() 함수를 활용할 수 있다.

- 성공코드

```jsx
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

it("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});
```

- 실패코드

```jsx
const sum = (x, y) => x + y;

test("sum", () => {
  expect(sum(2, 2)).toBe(4); // 통과
  expect(sum(3, 1)).toBe(5); // 실패, sum test 실패
});
```

코드에서 보듯이 테스트는 test(”테스트 이름", callback) 의 형태를 띄게 되며, callback 안에서 원하는 동작을 수행하고 expect(실제 결과 값).matcher() 의 형태를 띄게 됩니다. 하나의 콜백 안에서 여러 expect를 수행할 수 있으며, 그 중 하나라도 기대값과 일치하지 않을 경우, 해당 테스트는 실패한 것으로 간주됩니다.

#### Jest에서 주로 사용되는 matcher

- toBe

  expect의 인자가 toBe의 인자와 일치하는지를 검사합니다.

- toEqual

  Object의 경우 참조값이 다르기에, toBe를 활용할 경우 실제 각 객체의 내용이 같더라도, 일치하지 않다고 판단되게 됩니다. 따라서 객체를 상호 비교할 때는 toEqual matcher를 활용하여 두 객체가 같은지 확인합니다.

```jsx
const obj = { hello: "world" };

test("object eqaul", () => {
  expect(obj).toBe({ hello: "world" }); // X
  expect(obj).toEqual({ hello: "world" }); // O
});
```

- toBeNull, toBeUndefined

- toBeGreaterThan, toBeGraterThanOrEqaul, toBeLessThan, toBeLessThanOrEqaul

숫자값을 검증할 때 유용하게 사용할 수 있는 matcher입니다.

- toContain

  Iterable한 객체들이 특정한 요소를 포함하고 있는지 검증할 때 사용할 수 있습니다.

```jsx
const iterable = [1, 2, 3, 4, 5];

test("iterable contain 3", () => {
  expect(obj).toContain(3);
});
```

- not

  matcher의 기대값을 반대로 변경해줍니다.

```jsx
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).not.toBeUndefined();
});
```

#### 추가사항

- mockFunction
  jest.fn()
  일반 함수의 호출을 검증하는 기능이 없어, 사용합니다.

- function matcher
  toHaveBeenCalledWidth
  함수와 같이 호출이 되는지 확인해준다.

### 컴포넌트의 UI와 동작 테스트

Jest를 통해서 순수한 자바스크립트 코드를 테스트할 수 있지만, UI를 렌더링하는 부분을 책임지는 react-dom 라이브러리에서 제공해주는 별도의 기능들과 결합하여 테스트를 수행해야합니다. 이 과정을 대신해서 리액트 컴포넌트를 테스트 해주는 라이브러리가 있습니다.

- Enzyme

  “구현"을 테스트하는 것에 초점이 맞춰져 있는 라이브러리

- React-Testing-Library(RTL)

  “결과"를 테스트하는 것에 초점이 맞춰진 라이브러리

#### React Testing Library

결과를 중심으로 테스트를 작성하게 되면 컴포넌트의 겉보기 동작은 그대로 유지하며, 내부적인 구현은 얼마든지 변경할 수 있습니다. 예를들어 구현을 테스트 했을 경우 상태관리를 useState가 아닌 Recoil, Redux 등으로 변경했을 경우 테스트코드를 다시 작성해야 하지만, 결과를 중점으로 테스트 했을 경우 상태관리가 어떻게 바뀌든 최종적으로 버튼을 클릭했을 때 화면에 2라는 숫자가 나온다는 결과만 동일하다면 테스트코드를 변경할 필요가 없습니다.

테스트를 위해서는 이 요소들이 DOM상에 존재하는지, 그리고 특정 프로퍼티를 가지고 있는지 등을 검사할 수 있어야 합니다. 이는 DOM에 관련된 기능이기에 jest에서는 이러한 기능을 수행할 수 있는 matcher들을 기본적으로 포함하고 있지는 않습니다. 이러한 matchers를 추가하기 위해서는 jest-dom 라이브러리를 사용해야 합니다.(마찬가지로 CRA에 포함되어 있습니다.)

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";

test("App rendering", () => {
  render(<App />);

  const header = screen.getByText("Hello World");
  const button = screen.getByText("Click me!");

  userEvent.click(button);

  expect(header).toBeInTheDocument();
  expect(button).toBeDisabled();
});
```

- screen

  screen은 말 그대로 현재 렌더링이 진행되고 있는 화면을 의미합니다. 현재 화면에 렌더링된 요소들에 관련된 여러 메서드들을 확인할 수 있습니다.

- screen.debug

  테스트 과정에서 출력된 DOM을 확인하고 싶을 때 사용할 수 있습니다. 이 메서드를 호출하면 호출한 시점의 렌더링된 DOM tree를 확인할 수 있습니다.

- act

  테스트 도중 변하는 값이 있다면, act(()=>{})로 감싸서 코드를 작성해줘야 변하는 값이라는 것을 jest가 인지 할 수 있습니다.

### 요소를 가져오는 메서드들

DOM에서 제공하는 getElementBy~~~, querySelector 등의 API와 마찬가지로 RTL에서도 렌더링된 요소들에게 접근할 수 있는 메서드들이 존재합니다.
이러한 메서드는 크게 3가지 종류로 구분됩니다.

#### 형태

- getBy~~~

  해당 요소가 현재 DOM상에 있는지 동기적으로 확인 후, 만약 찾는 요소가 없을 경우 예외를 던집니다.

- findBy~~~

  해당 요소가 현재 DOM상에 있는지 비동기적으로 확인 후, 해당 요소를 찾기 위해 일정 시간을 기다리며, 시간이 지난 후에도 찾을 수 없는 경우 예외를 던집니다.

- queryBy~~~

  getBy와 동일하게 동작하지만 찾는 요소가 없을 경우 예외를 던지는 것이 아닌 null을 반환합니다.

#### 자세한 내용

- getByRole

  가장 변화가 작아 우선적으로 사용하는 것을 추천합니다.

```jsx
<h1></h1> getByRole("heading")으로 가져올 수 있다.
```

- getByText

  const button = screen.getByText(/Click me!/i)처럼 정규표현식을 사용하여 불러올 수 있고, 뒤에 i(ignore case)를 붙여주면 대소문자를 무시합니다.

```jsx
getByLabelText;
getByPlaceholderText;
getByDisplayValue;
getByAltText;
getByTitle;
getByTestId;
userEvent;
```

실제 DOM상에서 유저처럼 이벤트를 발생시키기 위해서는 testing-library/user-event 라이브러리를 사용할 수 있습니다. userEvent.이벤트명(엘리먼트)의 형태로 활용할 수 있습니다.

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";

test("App rendering", () => {
  render(<App />);

  const button = screen.getByText("Click me!");

  userEvent.click(button);
});
```

### 추가사항

반복되는 test 코드 피하기

- describe

  test 코드를 묶어서 사용하게 해주고, 그 안에서 유용한 hook을 제공합니다.

- beforeAll

  describe 안에 있는 모든 test 실행 전에 1번 실행해줍니다.

- beforeEach

  describe 안에 있는 각 test가 실행 되기 전에 실행해줍니다.

```jsx
describe("sum", () => {
  let var1;
  let var2;

  beforeEach(() => {
    var1 = 2;
    var2 = 2;
  });

  it("should ~", () => {
    const result = sum(var1, var2);
    expect(result).toBe(4);
  });

  test("sum should~", () => {
    const result = sum(3, 3);
    expect(result).toBe(4);
  });
});
```

### 참고자료

- [Jest Error: import statement outside a module](https://iosroid.tistory.com/117)
- [nodejs ReferenceError: fetch is not defined 오류가 발생 할때](https://www.pabburi.co.kr/content/javascript/nodejs-referenceerror-fetch-is-not-defined-%EC%98%A4%EB%A5%98%EA%B0%80-%EB%B0%9C%EC%83%9D/)
- [1th School Project : Software Engineering\_\_20210531 Jest: SyntaxError: Unexpected token export](https://velog.io/@dhsys112/1th-School-Project-Software-Engineering20210531-Jest-SyntaxError-Unexpected-token-export)
- [15.8 Jest에서 import/export를 사용하기](https://poiemaweb.com/jest-esm)
