## 배열

연관된 데이터를 연속적인 형태로 구성된 구조를 가진다.
배열에 포함된 원소는 순서대로 번호(index)가 붙는다.

### 특징

고정된 크기를 가지며 일반적으론 동적으로 크기를 늘릴 수 없다.
**자바스크립트처럼 대부분의 스크립트 언어는 동적으로 크기가 증감 되도록 만들어져 있다.**
원하는 원소의 index를 알고 있다면, O(1)로 원소를 찾을 수 있다.
원소를 삭제하면 해당 index에 빈자리가 생긴다.

삭제 후 순서를 맞추려면 O(n)이 소요된다.

- 요소 추가
  중간에 요소를 추가하고 싶다면 O(n)이 소요된다.

**따라서 추가와 삭제가 반복되는 로직이라면 배열 사용을 권장하지 않는다!**

### 배열생성

```jsx
// 빈 Array를 생성할 수 있다.
let arr1 = [];
console.log(arr1);

// 미리 초기화된 Array를 생성할 수 있다.
let arr2 = [1, 2, 3, 4, 5];
console.log(arr2);

let arr3 = Array(10).fill(0);
console.log(arr3);

// 특정 로직을 사용하여 초기화할 경우 from을 사용할 수 있다.
let arr4 = Array.from({ length: 100 }, (_, i) => i);
console.log(arr4);
```

### 배열 요소 추가, 삭제

```jsx
const arr = [1, 2, 3];
console.log(arr);
// 4가 끝에 추가된다.
// 여러 개를 한 번에 추가할 수 있다.
arr.push(5, 6); // O(1)

arr.splice(3, 0, 128); // O(n)
console.log(arr);

// 3번 인덱스에 값을 제거한다.
arr.splice(3, 1); // O(n)
console.log(arr[3]);
```

### 특이점

```jsx
// 자바스크립트의 Array는 다른 언어의 Array와 조금 다르다.
// 자바스크립트의 Array는 동적이다.
const arr = [];
console.log(arr);
arr.push(1);
arr.push(1);
arr.push(2);
console.log(arr);

// 자바스크립트의 Array는 HashMap에 가깝다.
console.log(arr.length);
// index가 number가 아니어도 된다.
arr["string"] = 10;
arr[false] = 0;
console.log(arr);
console.log(arr.length);
arr[4] = 5;
console.log(arr.length);
```

**index와 무관한 값을 index로 사용한 경우길이에 영향을 미치지 않는다.**
