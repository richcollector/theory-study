## 모듈

스크립트 파일 간의 통신을 위해 전역 스코프에 존재하는 변수와 함수를 사용해야 했다. 즉시 실행 함수들로 전역스코프가 오염되는 것을 어느정도 막을 수 있었지만, 스크립트 파일간의 의존도를 파악하기가 힘들고, 실행 순서를 제어해야 한다는 한계점이 존재하였다. 이러한 점을 개선하기 위하여 모듈이 등장하였다.

### 모듈의 등장

스트립트 간 의존도를 확인할 수 있고, 실행 순서를 쉽게 제어할 수 있다.

- 모듈과 컴포넌트

  모듈은 설계 시점에 의미있는 요소이며 컴포넌트는 런타임 시점에 의미있는 요소이다. 하지만, javascript의 모듈은 직접적으로 런타임에 실행이 된다.

- 자바스크립트의 모듈

  로컬 파일에서 동작하지 않고, HTTP / HTTPS 프로토콜을 통해서만 동작한다.

### 특징

- 항상 use strict로 실행된다.

  ```jsx
  <script>let a = 5; let b = 10; c = a + b; alert(c);</script>
  ```

  일반 script는 let이나 var를 생략하고 변수 선언이 가능하고 전역스코프에 저장이 되지만, 모듈 script는 허용되지 않는다.

- 모듈 레벨 스코프가 있다.

  최상위에 변수를 선언하더라도 전역스코프로 올라가지 않고, 자체적인 모듈 레벨 스코프에 올라간다. 일반 script는 최상위에 선언하면 전역 스코프에 선언되어 다른 script에서도 참조가 가능하지만, module script에서는 import하지 않는 한 서로 참조가 불가능하다.

- 단 한번만 평가된다.

  2번 import를 하더라도 실행은 1번만 된다. 평가된 것을 불러와 사용하기만 할 뿐이다.

- 지연 실행이 된다.

  기존의 script는 순서에 따라 DOM이 생성되기 전에 실행이 될 수 있지만, module은 defer를 적용한 것과 같이 DOM이 모두 만들어진 후 실행이 된다.

### 코드로 확인하기

- 가져올 js

```jsx
export function hello(name) {
  alert(`Hello, ${name}!`);
}
```

－ 스크립트 속성으로 module 설정

```jsx
<!DOCTYPE html>
<html>
  <head>
    <title>Module Example</title>
  </head>
  <body>
    <script type="module">
      import { hello } from './hello.js';
      hello('John');
    </script>
  </body>
</html>
```
