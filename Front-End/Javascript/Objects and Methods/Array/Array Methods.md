## Array

### Array.prototype.forEach()

각 배열 요소에 대해 제공된 함수를 한 번씩 실행합니다.

- 사용법

  forEach(callbackFn)
  forEach(callbackFn, thisArg)

  - 매개변수

    - callbackFn
      배열의 각 요소에 대해 실행할 함수입니다. 반환값은 사용되지 않습니다. 함수는 다음 인수를 사용하여 호출됩니다.

    - element
      배열에서 처리 중인 현재 요소.

    - index
      배열에서 처리 중인 현재 요소의 인덱스.

    - array
      forEach()를 호출한 배열.

    - thisArg Optional
      callbackFn을 실행할 때 this 값으로 사용할 값입니다. 순회 메서드를 참조하세요.

```jsx
const ratings = [5, 4, 5];
let sum = 0;

const sumFunction = async (a, b) => a + b;

ratings.forEach(async (rating) => {
  sum = await sumFunction(sum, rating);
});

console.log(sum);
// 순진하게 예상한 출력: 14
// 실제 출력: 0
```

### Array.from()

순회 가능 또는 유사 배열 객체에서 얕게 복사된 새로운 Array 인스턴스를 생성합니다.

- 사용법

  Array.from(arrayLike)
  Array.from(arrayLike, mapFn)
  Array.from(arrayLike, mapFn, thisArg)

  - 매개변수

    - arrayLike

      배열로 변환할 순회 가능 또는 유사 배열 객체입니다.

    - mapFnOptional

      배열의 모든 요소에 대해 호출할 함수입니다. 이 함수를 제공하면 배열에 추가할 모든 값이 이 함수를 통해 먼저 전달되고, mapFn의 반환 값이 대신 배열에 추가됩니다. 이 함수는 다음 인수를 사용하여 호출됩니다.

      - element

            배열에서 처리 중인 현재 요소.

      - index

            배열에서 처리 중인 현재 요소의 인덱스.

    - thisArgOptional

      mapFn 실행 시에 this로 사용할 값입니다.

```jsx
// 화살표 함수를 map 함수로 사용하여 요소 조작
Array.from([1, 2, 3], (x) => x + x);
// [2, 4, 6]

// 숫자 시퀀스 생성하기
// 배열의 각 위치가 `undefined`로 초기화되므로
// 아래 'v'의 값은 `undefined`가 됩니다.
Array.from({ length: 5 }, (v, i) => i);
// [0, 1, 2, 3, 4]
```

### Array.prototype.includes()

- 사용법

  includes(searchElement)
  includes(searchElement, fromIndex)

  - 매개변수

    - searchElement

      찾을 값

    - fromIndex

      1. 음수 인덱스는 배열의 끝부터 거꾸로 셉니다. 즉, fromIndex < 0이면, fromIndex + array.length가 사용됩니다. 그러나, 이 경우에도 배열은 여전히 앞에서 뒤로 검색됩니다.
      2. fromIndex < -array.length이거나 fromIndex가 생략되면, 0이 사용되어 전체 배열이 검색됩니다.
      3. fromIndex >= array.length 이면, 배열은 검색되지 않고 false가 반환됩니다

배열의 항목에 특정 값이 포함되어 있는지를 판단하여 적절히 true 또는 false를 반환합니다.

```jsx
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
["1", "2", "3"].includes(3); // false
```

### Array.prototype.indexOf()

배열에서 주어진 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고, 찾을 수 없는 경우 -1을 반환합니다.

- 사용법

  indexOf(searchElement)
  indexOf(searchElement, fromIndex)

  - 매개변수

  - searchElement

    배열에서 위치를 찾을 요소입니다.

  - fromIndex Optional

    검색을 시작할 0 기반 인덱스로, 정수로 변환됩니다.

    1. 음수 인덱스는 배열의 끝부터 거꾸로 셉니다. 즉, fromIndex < 0이면, fromIndex + array.length가 사용됩니다. 그러나, 이 경우에도 배열은 여전히 앞에서 뒤로 검색됩니다.
    2. fromIndex < -array.length이거나 fromIndex가 생략되면, 0이 사용되어 전체 배열이 검색됩니다.
    3. fromIndex >= array.length 이면, 배열은 검색되지 않고 -1이 반환됩니다.

```jsx
const array = [2, 9, 9];
array.indexOf(2); // 0
array.indexOf(7); // -1
array.indexOf(9, 2); // 2
array.indexOf(2, -1); // -1
array.indexOf(2, -3); // 0
```
