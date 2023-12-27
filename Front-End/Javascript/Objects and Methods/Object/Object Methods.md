## Object

### Object.entries()

for...in와 같은 순서로 주어진 객체 자체의 enumerable 속성 [key, value] 쌍의 배열을 반환합니다.
(for-in 루프가 다른점은 프로토 타입 체인의 속성도 열거한다는 점입니다).

- 사용법

  Object.entries(obj);

- 반환값

  객체 자체의 열거 가능한 문자열 키를 가진 속성 [key, value] 쌍이 반환되는 객체입니다.

```jsx
const obj = { foo: "bar", baz: 42 };
const map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }
```
