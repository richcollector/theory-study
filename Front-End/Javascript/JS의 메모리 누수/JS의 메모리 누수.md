## JS 메모리 누수

부주의 또는 일부 프로그램 오류로 인해 더 이상 사용되지 않는 메모리를 해제하지 못하는 것입니다.

### 자바스크립트의 메모리 관리

- 스택 메모리: 단순 변수 (String, Number, Boolean, Null, Undefined, Symbol, Bigint)

- 힙 메모리: 참조 데이터 타입 (Object, Array, Function)

#### 가비지 콜렉터

가비지 콜렉터의 존재로 인해 개발자가 메모리 관리에 대해 고민할 필요가 없다는 잘못된 인상을 줄 수 있습니다.

자바스크립트 가비지 컬렉션이 자동으로 이루어지지만 특정 변수들의 메모리를 수동으로 해제하는 일이 필요합니다.
예를 들자면, 더 필요하지 않은 변수가 외부 변수에 의해 참조되고 있어 메모리가 해제될 수 없을 때 null을 할당해서 다음 가비지 컬렉션이 동작할 때 메모리를 해제할 수 있습니다.

#### reference-counting 가비지 콜렉션

더 이상 필요 없는 오브젝트를 어떤 다른 오브젝트도 참조하지 않는 오브젝트 라고 정의합니다.
Reference-counting 가비지 콜렉션의 한계로는 순환참조가 있습니다.

아래 순환참조의 예시에서는 element 라는 변수에 할당된 버튼 요소가 DOM 트리에서 제거 되어도 onClick 이벤트가 구독되어있기 때문에 명시적으로 이벤트 구독 해제를 하지 않으면 가비지 컬렉팅이 되지 않습니다.

```jsx
// 순환참조의 예시
let element = document.getElementById("button");

function onClick(event) {
  element.innerHtml = "text";
}

element.addEventListener("click", onClick);

// element를 제거하기 전에 구독된 이벤트를 해제하여야 합니다.
element.removeEventListener("click", onClick);

element.parentNode.removeChild(element);
```

### Mark-and-sweep

더 이상 필요 없는 오브젝트를 닿을 수 없는 오브젝트로 정의

순환참조가 일어나도 element는 더이상 닿을 수 없는 DOM 요소이기 때문에 클릭 이벤트 또한 사라져 해제 대상이 됩니다. 즉, removeEventListener를 호출할 필요가 없습니다.

### 흔한 자바스크립트 메모리 누수 3가지

1. 의도치 않은 전역 변수

일반적으로 전역변수는 가비지 컬렉팅의 대상이 되지 않습니다.
또한 여러 개발자들이 협업하는 경우 동일한 변수명을 사용하여 변수가 섞이는 등의 문제가 될 수 있어 일반적으로 전역변수의 사용을 지양합니다.
그러나 자바스크립트에서는 아래 예시처럼 정의하지 않은 변수에 값을 할당하면 전역변수에 값을 할당한 것처럼 작동합니다.

이와 같이 의도치 않게 생성된 전역변수는 가비지 컬렉팅의 대상이 되지 않고 이는 메모리 누수의 원인이 될 수 있습니다.

use strict를 사용하면 정의하지 않은 변수에 값을 할당하는 경우 에러를 일으켜 실수를 예방할 수 있습니다.

```jsx
"use strict";
function globalExample() {
  noDefinedVariable = new Array(100);
}

globalExample();
```

2. 잊혀진 타이머 또는 콜백

아래의 타이머 예시와 같이 사용 용도, 상황에 따라 적절히 타이머를 해제시켜주지 않는 경우 메모리를 계속 점유하고 있어 메모리 누수의 원인이 됩니다.

```jsx
// 타이머를 해제하지 않아 메모리를 계속 점유합니다.
function timerHandler() {
  let array = new Array(100);

  setInterval(() => {
    let myObj = array;
  }, 1000);
}

document.querySelector("button").addEventListener("click", function () {
  timerHandler();
});

// 60초 뒤에 clearInterval을 통해 메모리에서 해제됩니다.
function timerHandler() {
  let array = new Array(100);
  let second = 0;

  let timer = setInterval(() => {
    if (second === 60) clearInterval(timer);
    let myObj = largeObj;
    index++;
  }, 1000);
}

document.querySelector("button").addEventListener("click", function () {
  timerHandler();
});
```

3. 분리된 DOM 노드

```jsx
let btn = document.querySelector("button");
let child = document.querySelector(".child");
let root = document.querySelector("#root");

// root의 자식요소인 child을 DOM 트리에서 제거하였지만
// child 변수가 해당 요소를 참조하고 있어 메모리 누수의 원인이 됩니다.
btn.addEventListener("click", function () {
  root.removeChild(child);
});
let btn = document.querySelector("button");
// 리스너의 콜백 함수 내부의 지역변수로 child를 정의하여 메모리 누수를 방지합니다.
btn.addEventListener("click", function () {
  let child = document.querySelector(".child");
  let root = document.querySelector("#root");
  root.removeChild(child);
});
```

4. 콘솔 출력

개발 환경일 때 디버그 목적으로 콘솔을 출력할 수 있습니다.
하지만 실제 프로덕션 환경에서는 가능한 콘솔에 데이터를 출력하지 말아야 합니다.

콘솔 출력은 출력하고자 하는 정보를 브라우저에 저장하기 때문에 메모리 누수의 원인이 됩니다.
그래서 많은 자바스크립트 코딩 스타일 스펙에서 console.log를 사용하지 않기를 요구합니다.
console.log, console.error, console.info, console.dir 등 불필요한 변수 출력을 자제하여 메모리 누수를 방지할 수 있습니다.

5. 클로저의 잘못된 사용

메테오 개발자들이 발견한 흥미로운 자바스크립트 메모리 누수 예시입니다.

1초마다 replaceThing이 반복해서 호출되며 longStr과 someMethod 클로저를 생성되고 unused 변수는 originalThing을 참조하는 클로저를 가지게 됩니다.

이때, 스코프 체이닝에 의해 unused의 내부함수는 부모함수의 스코프를 공유합니다.

여기서 unused 내부함수가 없었다면 매번 생성되는 longStr은 Mark-and-Sweep 알고리즘을 사용하는 최신 브라우저에서는 originalThing이 사용되지 않음을 파악하고 가비지컬렉팅의 대상이 됩니다.

그러나 unused 내부함수에서 originalThing을 계속해서 참조하고 이 때문에 메모리 누수가 일어나게 됩니다.

```jsx
var theThing = null;

var replaceThing = function () {
  var originalThing = theThing;

  var unused = function () {
    if (originalThing) console.log("hi");
  };

  theThing = {
    longStr: new Array(1000000).join("*"),
    someMethod: function () {
      console.log(someMessage);
    },
  };
};
setInterval(replaceThing, 1000);
```

### 참고자료

- [자바스크립트 메모리 누수와 해결 방법](https://yceffort.kr/2020/07/memory-leaks-in-javascript)
- [자바스크립트의 메모리 누수 (Memory Leaks)](https://beenlog.tistory.com/45)
