## Array

Array() 생성자

- 사용법

  new Array()
  new Array(element0)
  new Array(element0, element1)
  new Array(element0, element1, /_ …, _/ elementN)
  new Array(arrayLength)

  Array()
  Array(element0)
  Array(element0, element1)
  Array(element0, element1, /_ …, _/ elementN)
  Array(arrayLength)

  - 매개변수

    - elementN

      JavaScript 배열은 주어진 요소로 초기화되지만, 단일 인수가 Array 생성자에 전달되고, 그 인수가 숫자인 경우는 예외입니다(아래 arrayLength 매개변수 참조). 이 특수한 경우는 대괄호 구문으로 만들어진 배열 리터럴이 아닌 Array 생성자로 만들어진 JavaScript 배열에만 적용된다는 점에 유의하세요.

    - arrayLength

      Array 생성자에 전달된 유일한 인수가 0에서 232 - 1(포함) 사이의 정수인 경우, length 속성이 해당 숫자로 설정된 새 JavaScript 배열을 반환합니다(참고: 이는 실제 undefined 값을 가진 슬롯이 아닌 arrayLength 길이의 빈 슬롯 배열을 의미합니다. 희소 배열참조).

```jsx
const arrayEmpty = new Array(2);

console.log(arrayEmpty.length); // 2
console.log(arrayEmpty[0]); // undefined이지만, 사실 빈 슬롯입니다.
console.log(0 in arrayEmpty); // false
console.log(1 in arrayEmpty); // false
```

### Array.prototype.flatMap()

- 사용법
  flatMap(callbackFn)
  flatMap(callbackFn, thisArg)

  - 매개변수
    callback
    배열의 각 요소에 대해 실행할 함수입니다. 새 배열의 새 요소를 포함하는 배열을 반환하거나, 새 배열에 추가할 배열이 아닌 단일 값을 반환해야 합니다. 이 함수는 다음 인수를 사용하여 호출됩니다.

    element
    배열에서 처리 중인 현재 요소.

    index
    배열에서 처리 중인 현재 요소의 인덱스.

    array
    flatMap()이 호출된 배열.

    thisArg Optional
    callbackFn을 실행할 때 this로 사용할 값입니다. 순회 메서드를 참조하세요.

### Array.prototype.some()

배열 안의 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트합니다. 만약 배열에서 주어진 함수가 true을 반환하면 true를 반환합니다. 그렇지 않으면 false를 반환합니다. 이 메서드는 배열을 변경하지 않습니다.

- 사용법

```jsx
// 화살표 함수
some((element) => {
  /* … */
});
some((element, index) => {
  /* … */
});
some((element, index, array) => {
  /* … */
});

// 콜백 함수
some(callbackFn);
some(callbackFn, thisArg);

// 인라인 콜백 함수
some(function (element) {
  /* … */
});
some(function (element, index) {
  /* … */
});
some(function (element, index, array) {
  /* … */
});
some(function (element, index, array) {
  /* … */
}, thisArg);
```

- 매개변수

  - callbackFn

    배열의 각 요소에 대해 실행할 함수. 이 함수는 요소가 시험을 통과하면 참 같은 값을 반환하며, 그렇지 않으면 거짓인 값을 반환합니다.
    다음의 인자와 함께 함수를 호출합니다.

  - element

    처리할 배열 내 현재 요소

  - index

    처리할 현재 요소의 인덱스

  - array

    some을 호출한 배열

- thisArg Optional

  callbackFn을 실행할 때 this로 사용하는 값. 반복 메소드를 참고하세요.

```jsx
function isBiggerThan10(element, index, array) {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10); // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```

### Array.prototype.splice()

배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경합니다.

- 사용법

  array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

  - 매개변수

    - start

      배열의 변경을 시작할 인덱스입니다. 배열의 길이보다 큰 값이라면 실제 시작 인덱스는 배열의 길이로 설정됩니다. 음수인 경우 배열의 끝에서부터 요소를 세어나갑니다(원점 -1, 즉 -n이면 요소 끝의 n번째 요소를 가리키며 array.length - n번째 인덱스와 같음). 값의 절대값이 배열의 길이 보다 큰 경우 0으로 설정됩니다.

    - deleteCount (Optional)

      배열에서 제거할 요소의 수입니다. deleteCount를 생략하거나 값이 array.length - start보다 크면 start부터의 모든 요소를 제거합니다. deleteCount가 0 이하라면 어떤 요소도 제거하지 않습니다. 이 때는 최소한 하나의 새로운 요소를 지정해야 합니다.

    - item1, item2, <em>...</em> (Optional)

      배열에 추가할 요소입니다. 아무 요소도 지정하지 않으면 splice()는 요소를 제거하기만 합니다.

```jsx
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed = myFish.splice(2, 0, "drum");

// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]
// removed is [], no elements removed
```

```jsx
var myFish = ["angel", "clown", "drum", "sturgeon"];
var removed = myFish.splice(2, 1, "trumpet");

// myFish is ["angel", "clown", "trumpet", "sturgeon"]
// removed is ["drum"]
```

### Array.prototype.keys()

배열의 각 인덱스를 키 값으로 가지는 새로운 Array Iterator 객체를 반환합니다.

- 사용법

  arr.keys();

```jsx
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys); // [0, 1, 2]
```

### Array.prototype.slice()

어떤 배열의 begin 부터 end 까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 바뀌지 않습니다.

- 사용법

  arr.slice([begin[, end]])

  - 매개변수

    - begin Optional

      0을 시작으로 하는 추출 시작점에 대한 인덱스를 의미합니다. 음수 인덱스는 배열의 끝에서부터의 길이를 나타냅니다. slice(-2) 는 배열에서 마지막 두 개의 엘리먼트를 추출합니다. begin이 undefined인 경우에는, 0번 인덱스부터 slice 합니다. begin이 배열의 길이보다 큰 경우에는, 빈 배열을 반환합니다.

    - end Optional

      추출을 종료 할 0 기준 인덱스입니다. slice 는 end 인덱스를 제외하고 추출합니다. 예를 들어, slice(1,4)는 두번째 요소부터 네번째 요소까지 (1, 2 및 3을 인덱스로 하는 요소) 추출합니다. 음수 인덱스는 배열의 끝에서부터의 길이를 나타냅니다. 예를들어 slice(2,-1) 는 세번째부터 끝에서 두번째 요소까지 추출합니다. end가 생략되면 slice()는 배열의 끝까지(arr.length) 추출합니다.

  만약 end 값이 배열의 길이보다 크다면, slice()는 배열의 끝까지(arr.length) 추출합니다.

```jsx
// Using slice, create newCar from myCar.
let myHonda = { color: "red", wheels: 4, engine: { cylinders: 4, size: 2.2 } };
let myCar = [myHonda, 2, "cherry condition", "purchased 1997"];
let newCar = myCar.slice(0, 2);

// Display the values of myCar, newCar, and the color of myHonda
//  referenced from both arrays.
console.log("myCar = " + JSON.stringify(myCar));
console.log("newCar = " + JSON.stringify(newCar));
console.log("myCar[0].color = " + myCar[0].color);
console.log("newCar[0].color = " + newCar[0].color);

// Change the color of myHonda.
myHonda.color = "purple";
console.log("The new color of my Honda is " + myHonda.color);

// Display the color of myHonda referenced from both arrays.
console.log("myCar[0].color = " + myCar[0].color);
console.log("newCar[0].color = " + newCar[0].color);
```

### Array.prototype.every()

배열의 모든 요소가 제공된 함수로 구현된 테스트를 통과하는지 테스트합니다. 이 메서드는 불리언 값을 반환합니다.

- 사용법

  every(callbackFn)
  every(callbackFn, thisArg)

- 매개변수

  - callbackFn

    배열의 각 요소에 대해 실행할 함수입니다. 요소가 테스트를 통과하면 참 값을 반환하고, 그렇지 않으면 거짓 값을 반환해야 합니다. 함수는 다음 인자를 사용하여 호출됩니다.

    - element

      배열에서 처리되는 현재 요소.

    - index

      처리되는 현재 요소의 인덱스.

    - array

      every()를 호출한 배열.

  - thisArg Optional

    callbackFn을 실행할 때 this로 사용하는 값. 순회 메서드를 참조하세요.

```jsx
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough); // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

### Array.prototype.pop()

배열에서 마지막 요소를 제거하고 그 요소를 반환합니다.

- 사용법

  arr.pop();

```jsx
var myFish = ["angel", "clown", "mandarin", "sturgeon"];

var popped = myFish.pop();

console.log(myFish); // ['angel', 'clown', 'mandarin' ]

console.log(popped); // 'sturgeon'
```

### Array.prototype.push()

배열의 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환합니다.

- 사용법

  arr.push(element1[, ...[, elementN]])

  - 매개변수

    - elementN

      배열의 끝에 추가할 요소.

```jsx
var sports = ["축구", "야구"];
var total = sports.push("미식축구", "수영");

console.log(sports); // ['축구', '야구', '미식축구', '수영']
console.log(total); // 4
```

### Array.prototype.fill()

배열의 인덱스 범위 내에 있는 모든 요소를 정적 값으로 변경합니다. 그리고 수정된 배열을 반환합니다.

- 사용법

  fill(value)
  fill(value, start)
  fill(value, start, end)

  - 매개변수

    - value

      배열을 채울 값입니다. 배열의 모든 요소는 정확히 이 값이 될 것입니다. value가 객체인 경우, 배열의 각 슬롯은 해당 객체를 참조합니다.

    - start (Optional)

      채우기를 시작할 0 기반 인덱스로, 정수로 변환됩니다.

      음수 인덱스는 배열의 끝부터 거꾸로 셉니다. start < 0인 경우, start + array.length가 사용됩니다.
      start < -array.length 또는 start가 생략된 경우, 0이 사용됩니다.
      start >= array.length이면, 아무 인덱스도 채워지지 않습니다.

    - end (Optional)

      채우기를 끝낼 0 기반 인덱스로, 정수로 변환됩니다. fill()은 end까지 채우며, end는 포함하지 않습니다.

      음수 인덱스는 배열의 끝부터 거꾸로 셉니다. end < 0인 경우, end + array.length가 사용됩니다.
      end < -array.length 이면, 0이 사용됩니다.
      end >= array.length 이거나 end가 생략된 경우, array.length가 사용되어 끝까지 모든 인덱스가 채워집니다.
      end가 정수로 변환된 후, after보다 앞에 위치하면, 아무 인덱스도 채워지지 않습니다.

```jsx
console.log([1, 2, 3].fill(4)); // [4, 4, 4]
console.log([1, 2, 3].fill(4, 1)); // [1, 4, 4]
console.log([1, 2, 3].fill(4, 1, 2)); // [1, 4, 3]
console.log([1, 2, 3].fill(4, 1, 1)); // [1, 2, 3]
console.log([1, 2, 3].fill(4, 3, 3)); // [1, 2, 3]
console.log([1, 2, 3].fill(4, -3, -2)); // [4, 2, 3]
console.log([1, 2, 3].fill(4, NaN, NaN)); // [1, 2, 3]
console.log([1, 2, 3].fill(4, 3, 5)); // [1, 2, 3]
console.log(Array(3).fill(4)); // [4, 4, 4]

// 배열의 각 슬롯이 참조하는 단일 객체
const arr = Array(3).fill({}); // [{}, {}, {}]
arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
```

### Array.prototype.filter()

주어진 배열의 일부에 대한 얕은 복사본을 생성하고, 주어진 배열에서 제공된 함수에 의해 구현된 테스트를 통과한 요소로만 필터링 합니다.

- 사용법

  filter(callbackFn)
  filter(callbackFn, thisArg)

  - 매개변수

    - callbackFn

      배열의 각 요소에 대해 실행할 함수입니다. 결과 배열에 요소를 유지하려면 참 값을 반환하고 그렇지 않으면 거짓 값을 반환해야 합니다. 이 함수는 다음 인수를 사용하여 호출됩니다.

      - element

        배열에서 처리 중인 현재 요소.

      - index

        배열에서 처리 중인 현재 요소의 인덱스.

      - array

        filter()가 호출된 배열.

    - thisArg (Optional)

      callbackFn을 실행할 때 this 값으로 사용할 값입니다.

### Array.prototype.reverse()

열의 순서를 반전합니다. 첫 번째 요소는 마지막 요소가 되며 마지막 요소는 첫 번째 요소가 됩니다.

- 사용법

  a.reverse();

```jsx
const a = [1, 2, 3];
console.log(a); // [1, 2, 3]

a.reverse();
console.log(a); // [3, 2, 1]
```

### Array.prototype.join()

join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듭니다.

- 사용법

  arr.join([separator]);

  - 매개변수

    - separator Optional

      배열의 각 요소를 구분할 문자열을 지정합니다. 이 구분자는 필요한 경우 문자열로 변환됩니다. 생략하면 배열의 요소들이 쉼표로 구분됩니다. separator가 빈 문자열이면 모든 요소들이 사이에 아무 문자도 없이 연결됩니다.

```jsx
var a = ["바람", "비", "불"];
var myVar1 = a.join(); // myVar1에 '바람,비,불'을 대입
var myVar2 = a.join(", "); // myVar2에 '바람, 비, 불'을 대입
var myVar3 = a.join(" + "); // myVar3에 '바람 + 비 + 불'을 대입
var myVar4 = a.join(""); // myVar4에 '바람비불'을 대입
```

### Array.prototype.sort()

배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환합니다.

- 사용법

  arr.sort([compareFunction]);

  - 매개변수

    - compareFunction Optional

      정렬 순서를 정의하는 함수. 생략하면 배열은 각 요소의 문자열 변환에 따라 각 문자의 유니 코드 코드 포인트 값에 따라 정렬됩니다.

```jsx
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function (a, b) {
  return a - b;
});
console.log(numbers);

// [1, 2, 3, 4, 5]
```

### Array.prototype.map()

배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.

- 사용법

  arr.map(callback(currentValue[, index[, array]])[, thisArg])

  - 매개변수

    - callback

      새로운 배열 요소를 생성하는 함수. 다음 세 가지 인수를 가집니다.

      currentValue

      처리할 현재 요소.

      index Optional

      처리할 현재 요소의 인덱스.

      array Optional

      map()을 호출한 배열.

  - thisArg Optional

    callback을 실행할 때 this로 사용되는 값.

```jsx
[1, 2, 3, 4].map((v, i) => console.log(v, i));
```

|  1  |  0  |
| :-: | :-: |
|  2  |  1  |
|  3  |  2  |
|  4  |  3  |

### Array.prototype.reduce()

배열의 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.

- 사용법

  arr.reduce(callback[, initialValue])

  - 매개변수

    - callback

      배열의 각 요소에 대해 실행할 함수. 다음 네 가지 인수를 받습니다.

      accumulator

      누산기는 콜백의 반환값을 누적합니다. 콜백의 이전 반환값 또는, 콜백의 첫 번째 호출이면서 initialValue를 제공한 경우에는 initialValue의 값입니다.

      currentValue

      처리할 현재 요소.

      currentIndex Optional

      처리할 현재 요소의 인덱스. initialValue를 제공한 경우 0, 아니면 1부터 시작합니다.

      array Optional

      reduce()를 호출한 배열.

    - initialValue Optional

      callback의 최초 호출에서 첫 번째 인수에 제공하는 값. 초기값을 제공하지 않으면 배열의 첫 번째 요소를 사용합니다. 빈 배열에서 **초기값 없이 reduce()를 호출하면 오류가 발생합니다.**

```jsx
[0, 1, 2, 3, 4].reduce(function (
  accumulator,
  currentValue,
  currentIndex,
  array
) {
  return accumulator + currentValue;
},
10);
```

|            | accumulator | currentValue | currentIndex |      array      | 반환값 |
| :--------: | :---------: | :----------: | :----------: | :-------------: | :----: |
| 1번째 호출 |     10      |      0       |      0       | [0, 1, 2, 3, 4] |   10   |
| 2번째 호출 |     10      |      1       |      1       | [0, 1, 2, 3, 4] |   11   |
| 3번째 호출 |     11      |      2       |      2       | [0, 1, 2, 3, 4] |   13   |
| 4번째 호출 |     13      |      3       |      3       | [0, 1, 2, 3, 4] |   16   |
| 5번째 호출 |     16      |      4       |      4       | [0, 1, 2, 3, 4] |   20   |

이 때 reduce()가 결과로 반환하는 값은 20입니다.

객체 배열에서의 값 합산 하는 법

```jsx
var initialValue = 0;
var sum = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce(function (
  accumulator,
  currentValue
) {
  return accumulator + currentValue.x;
},
initialValue);

console.log(sum); // logs 6
```

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

    **검색을 시작할 0 기반 인덱스로, 정수로 변환됩니다.**

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
