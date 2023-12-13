## Symbol

1997년 자바스크립트가 ECMAScript로 처음 표준화된 이래로 자바스크립트는 6개의 타입을 가지고 있었습니다.
심볼(symbol)은 ES6에서 새롭게 추가된 7번째 타입으로 변경 불가능한 원시 타입의 값입니다. 심볼은 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키(property key)를 만들기 위해 사용합니다.

### Symbol의 생성

Symbol은 Symbol() 함수로 생성합니다. Symbol() 함수는 호출될 때마다 Symbol 값을 생성합니다. 이때 생성된 Symbol은 객체가 아니라 변경 불가능한 원시 타입의 값입니다.

```jsx
// 심볼 mySymbol은 이름의 충돌 위험이 없는 유일한 프로퍼티 키
let mySymbol = Symbol();

console.log(mySymbol); // Symbol()
console.log(typeof mySymbol); // symbol
```

Symbol() 함수는 String, Number, Boolean과 같이 래퍼 객체를 생성하는 생성자 함수와는 달리 new 연산자를 사용하지 않습니다.

```jsx
new Symbol(); // TypeError: Symbol is not a constructor
```

Symbol() 함수에는 문자열을 인자로 전달할 수 있습니다. 이 문자열은 Symbol 생성에 어떠한 영향을 주지 않으며 다만 생성된 Symbol에 대한 설명(description)으로 디버깅 용도로만 사용됩니다.

```jsx
let symbolWithDesc = Symbol("ungmo2");

console.log(symbolWithDesc); // Symbol(ungmo2)
console.log(symbolWithDesc === Symbol("ungmo2")); // false
```

### Symbol의 사용

객체의 프로퍼티 키는 빈 문자열을 포함하는 모든 문자열로 만들 수 있습니다.

```jsx
const obj = {};

obj.prop = "myProp";
obj[123] = 123; // 123은 문자열로 변환된다.
// obj.123 = 123; // SyntaxError: Unexpected number
obj["prop" + 123] = false;

console.log(obj); // { '123': 123, prop: 'myProp', prop123: false }
```

Symbol 값도 객체의 프로퍼티 키로 사용할 수 있습니다. Symbol 값은 유일한 값이므로 Symbol 값을 키로 갖는 프로퍼티는 다른 어떠한 프로퍼티와도 충돌하지 않습니다.

```jsx
const obj = {};

const mySymbol = Symbol("mySymbol");
obj[mySymbol] = 123;

console.log(obj); // { [Symbol(mySymbol)]: 123 }
console.log(obj[mySymbol]); // 123
```

### Symbol 객체

Symbol() 함수로 Symbol 값을 생성할 수 있었습니다. 이것은 Symbol이 함수 객체라는 의미입니다. 브라우저 콘솔에서 Symbol을 참조하여 확인해보겠습니다.

![](./img/symbol%20객체.png)

위 참조 결과에서 알 수 있듯이 Symbol 객체는 프로퍼티와 메소드를 가지고 있습니다. Symbol 객체의 프로퍼티 중에 length와 prototype을 제외한 프로퍼티를 Well-Known Symbol이라 부릅니다.

### Symbol.iterator

Well-Known Symbol은 자바스크립트 엔진에 상수로 존재하며 자바스크립트 엔진은 Well-Known Symbol을 참조하여 일정한 처리를 합니다. 예를 들어 어떤 객체가 Symbol.iterator를 프로퍼티 key로 사용한 메소드 가지고 있으면 자바스크립트 엔진은 이 객체가 이터레이션 프로토콜을 따르는 것으로 간주하고 이터레이터로 동작하도록 합니다.

Symbol.iterator를 프로퍼티 key로 사용하여 메소드를 구현하고 있는 빌트인 객체(빌트인 이터러블)는 아래와 같습니다. 아래의 객체들은 이터레이션 프로토콜을 준수하고 있으며 이터러이터를 반환합니다.

- Array

  Array.prototype[Symbol.iterator]

- String

  String.prototype[Symbol.iterator]

- Map

  Map.prototype[Symbol.iterator]

- Set

  Set.prototype[Symbol.iterator]

- DOM data structures

  NodeList.prototype[Symbol.iterator] HTMLCollection.prototype[Symbol.iterator]

- arguments

  arguments[Symbol.iterator]

```jsx
// 이터러블
// Symbol.iterator를 프로퍼티 key로 사용한 메소드를 구현하여야 한다.
// 배열에는 Array.prototype[Symbol.iterator] 메소드가 구현되어 있다.
const iterable = ["a", "b", "c"];

// 이터레이터
// 이터러블의 Symbol.iterator를 프로퍼티 key로 사용한 메소드는 이터레이터를 반환한다.
const iterator = iterable[Symbol.iterator]();

// 이터레이터는 순회 가능한 자료 구조인 이터러블의 요소를 탐색하기 위한 포인터로서 value, done 프로퍼티를 갖는 객체를 반환하는 next() 함수를 메소드로 갖는 객체이다. 이터레이터의 next() 메소드를 통해 이터러블 객체를 순회할 수 있다.
console.log(iterator.next()); // { value: 'a', done: false }
console.log(iterator.next()); // { value: 'b', done: false }
console.log(iterator.next()); // { value: 'c', done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### Symbol.for

Symbol.for 메소드는 인자로 전달받은 문자열을 키로 사용하여 Symbol 값들이 저장되어 있는 전역 Symbol 레지스트리에서 해당 키와 일치하는 저장된 Symbol 값을 검색한다. 이때 검색에 성공하면 검색된 Symbol 값을 반환하고, 검색에 실패하면 새로운 Symbol 값을 생성하여 해당 키로 전역 Symbol 레지스트리에 저장한 후, Symbol 값을 반환한다.

```jsx
// 전역 Symbol 레지스트리에 foo라는 키로 저장된 Symbol이 없으면 새로운 Symbol 생성
const s1 = Symbol.for("foo");
// 전역 Symbol 레지스트리에 foo라는 키로 저장된 Symbol이 있으면 해당 Symbol을 반환
const s2 = Symbol.for("foo");

console.log(s1 === s2); // true
```

Symbol 함수는 매번 다른 Symbol 값을 생성하는 것에 반해, Symbol.for 메소드는 하나의 Symbol을 생성하여 여러 모듈이 키를 통해 같은 Symbol을 공유할 수 있습니다.

Symbol.for 메소드를 통해 생성된 Symbol 값은 반드시 키를 갖는다. 이에 반해 Symbol 함수를 통해 생성된 Symbol 값은 키가 없습니다.

```jsx
const shareSymbol = Symbol.for("myKey");
const key1 = Symbol.keyFor(shareSymbol);
console.log(key1); // myKey

const unsharedSymbol = Symbol("myKey");
const key2 = Symbol.keyFor(unsharedSymbol);
console.log(key2); // undefined
```

### 참고자료

- [7번째 타입 심볼(Symbol)](https://poiemaweb.com/es6-symbol)
