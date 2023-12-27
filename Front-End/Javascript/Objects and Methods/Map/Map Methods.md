## Map

Map() 생성자

- 사용법

  new Map()
  new Map(iterable)

  - 매개변수

    iterable Optional
    하나의 Array 혹은 키-값 쌍인 요소를 가진 반복 가능 객체. (예를 들어 [[1, 'one' ],[ 2, 'two']]과 같이 2개의 요소를 가진 배열). 각각의 키-값 쌍은 새로운 Map에 추가됩니다.

```jsx
const myMap = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
```

### Map.prototype.set()

Map 객체에서 주어진 키와 값을 추가하거나 업데이트합니다.

- 사용법

  set(key, value)

  - 매개변수

    - key

      Map 객체에 추가되는 요소의 키. 이 키는 모든 종류의 JavaScript 타입(모든 원시형 혹은 모든 Javascript 객체)이 될 수 있습니다.

    - value

      Map 객체에 추가되는 요소의 값. 이 값은 모든 종류의 JavaScript 타입(모든 종류의 원시형 혹은 모든 종류의 Javascript 객체)이 될 수 있습니다.

```jsx
const myMap = new Map();

// map에 새로운 요소를 추가합니다
myMap.set("bar", "foo");
myMap.set(1, "foobar");

// map에 요소를 업데이트 합니다
myMap.set("bar", "baz");
```

```jsx
myMap.set("bar", "foo").set(1, "foobar").set(2, "baz");
```
