## Set()

중복되지 않는 고유한 값을 저장하는 객체를 생성합니다.

- 사용법

  new Set()
  new Set(iterable)

```jsx
const mySet = new Set();

mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add("some text"); // Set [ 1, 5, 'some text' ]
const o = { a: 1, b: 2 };
mySet.add(o);
```
