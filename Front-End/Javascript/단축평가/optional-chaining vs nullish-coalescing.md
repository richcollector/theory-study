## 단축 평가

**논리 연산자를 사용한 단축 평가**
논리합(||) 또는 논리곱 (&&) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가됩니다.

`'Cat' && 'Dog' // "Dog"`
논리곱(&&) 연산자는 두 개의 피연산자가 모두 true로 평가될 때 true를 반환하며, 좌항에서 우항으로 평가가 진행됩니다.
첫 번째 피연산자 'Cat'은 Truthy 값이므로 true로 평가됩니다. 하지만 위 표현식은 이 시점에서 평가할 수 없습니다. 두 번째 피연산자까지 평가해 보아야합니다. 즉, 두 번째 피연산자가 논리곱 연산자 표현식의 평가 결과를 결정하며, 논리곱 연산자는 논리 연산의 결과를 결정하는 두 번째 피연산자 'Dog'를 그대로 반환합니다.

`'Cat' || 'Dog' // "Cat"`
논리합(||) 연산자는 두 개의 피연산자 중 하나만 true로 평가되어도 true를 반환하며, 좌항에서 우항으로 평가가 진행됩니다.
첫 번째 피연산자 'Cat'은 Truthy 값이므로 true로 평가됩니다. 이 시점에 두 번째 피연산자까지 평가하지 않아도 위 표현식을 평가할 수 있습니다. 논리합 연산자는 논리 연산의 결과를 결정한 첫 번째 피연산자, 문자열 'Cat'을 그대로 반환합니다.

논리곱(&&) 연산자와 논리합(||) 연산자는 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환하는데, 이를 단축 평가라고 합니다. 단축축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말합니다.

### 단축 평가의 규칙

```jsx
true || anything; // true
false || anything; // anything
true && anything; // anything
false && anything; // false
```

어떤 조건이 Truthy값일 때 무언가를 해야한다면 논리곱 연산자 표현식으로 if문을 대체할 수 있습니다.

```jsx
var done = true;
var message = "";

//주어진 조건이 true일 때
if (done) message = "완료";

//done이 true라면 message에 '완료'할당
message = done && "완료";
console.log(message); //완료
```

조건이 Falsy값일 때 무언가를 해야한다면 논리합 연산자 표현식으로 if문을 대체할 수 있습니다.

```jsx
var done = false;
var message = "";

//주어진 조건이 false일 때
if (done) message = "완료";

//done이 false라면 message에 '미완료'할당
message = done || "미완료";
console.log(message); //미완료
```

삼항 조건 연산자는 if...else문을 대체할 수 있습니다.

```jsx
var done = true;
var message = "";

//if...else문
if (done) message = "완료";
else message = "미완료";
console.log(message); //완료

message = done ? "완료" : "미완료";
console.log(message); //완료
```

단축 평가는 다음과 같은 상황에서 유용하게 사용됩니다.

객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때
객체는 키와 값으로 구성된 프로퍼티의 집합입니다. 만약 객체를 가리키기를 기대하는 변수의 값이 객체가 아니라 null 또는 undefined인 경우 객체의 프로퍼티를 참조하면 타입 에러가 발생합니다.

```jsx
var elem = null;
var value = elem.value; // TypeError: Cannot read property 'value' of null
```

이 때 단축 평가를 사용하면 에러가 발생하지 않습니다.

```jsx
var elem = null;
// elem이 null이나 undefined와 같은 Falsy 값이면 elem으로 평가
// elem이 Truthy 값이면 elem.value로 평가
var value = elem && elem.value; // null
```

**함수 매개변수에 기본값을 설정할 때**
함수를 호출할 때, 인수를 전달하지 않으면 매개변수에는 undefined가 할당됩니다. 이때 단축 평가를 사용해 매개변수의 기본값을 설정하면 undefined로 인해 발생할 수 있는 에러를 방지할 수 있습니다.

```jsx
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
  str = str || "";
  return str.length;
}

getStringLength(); // 0
getStringLength("hi"); // 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = "") {
  return str.length;
}

getStringLength(); // 0
getStringLength("hi"); // 2
```

### optional-chaining

ES11에서 도입된 옵셔널 체이닝 연산자 ?.는 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어갑니다.

```jsx
var elem = null;

// elem이 null또는 undefined이면 undefined 반환, 그렇지 않으면 우항의 프로퍼티 참조를 이어감
var value = elem?.value;
console.log(value); // undefined
```

옵셔널 체이닝 연산자?.는 객체를 가리키기를 기대하는 변수가 null또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때 유용합니다. 옵셔널 체이닝 연산자?.가 도입되기 전에는 논리 연산자 &&를 사용한 단축 평가를 통해 변수가 null 또는 undefined인지 확인했습니다.

```jsx
var elem = null;

// elem이 Falsy 값이면 elem으로 평가, elem이 Truthy 값이면 elem.value로 평가
var value = elem && elem.value;
console.log(value); // null
```

논리 연산자 && 는 좌항 피연산자가 false로 평가되는 Falsy 값(false, undefined, null, 0, -0, NaN, '')이면 좌항 피연산자를 그대로 반환합니다.

```jsx
var str = "";

var length = str && str.length;

// 문자열의 길이를 참조하지 못함
console.log(length); // ''
```

하지만 옵셔널 체이닝 연산자?.는 좌항 피연산자가 false로 평가되는 Falsy 값이라도 null또는 undefined가 아니면 우항의 프로퍼티 참조를 이어갑니다.

```jsx
var str = "";

var length = str?.length;
console.log(length); // 0
```

### nullish-coalescing (null 병합 연산자)

ES11에서 도입된 null 병합 연산자 ??는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환합니다.

```jsx
var foo = null ?? "default string";
console.log(foo); // "default string"
```

null 병합 연산자 ??는 변수에 기본값을 설정할 때 유용합니다. null 병합 연산자 ??가 도입되기 전에는 논리 연산자 || 를 사용한 단축 평가를 통해 변수에 기본값을 설정했습니다. 논리 연산자 ||를 사용한 단축 평가의 경우 좌항의 피연산자가 false로 평가되는 Falsy 값이면 우항의 피연산자를 반환합니다. 만약 Falsy 값인 0이나 ''도 기본값으로서 유효하다면 예기치않은 동작이 발생할 수 있습니다.

```jsx
var foo = "" || "default string";
console.log(foo); // "default string"
```

하지만 null 병합 연산자 ??는 좌항의 연산자가 false로 평가되는 Falsy 값이라도 null 또는 undefined가 아니면 좌항의 피연산자를 그대로 반환합니다.

```jsx
var foo = "" ?? "default string";
console.log(foo); // ""
```

### 참고자료

- [[JavaScript] 단축 평가](https://velog.io/@najiexx/JavaScript-%EB%8B%A8%EC%B6%95-%ED%8F%89%EA%B0%80)
