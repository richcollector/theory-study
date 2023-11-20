/* 
    배열 생성 
*/
const arr1 = new Array();
const arr2 = [];
const arr3 = new Array(5);
const arr4 = new Array(5);
const arr5 = new Array(5).fill(5);
// v값, k인덱스
const arr6 = Array.from(Array(5), function (v, k) {});

const arr = [1, 2, 3, 4, 5];

/* 
    length 조작은 선호하지 않음 
*/

// 3개의 값만 남음
arr.length = 3;
// 빈 값으로 나머지 부분이 채워짐
arr.length = 10;

// join
// 합치기
console.log(arr.join(","));

// reverse
// 한 번 사용하면 원 배열에도 영향이 감
console.log(arr.reverse());

// concat
// 두 배열 합치기
console.log(arr1.concat(arr2));

// push
// 배열에 추가
arr.push(7);
arr.push(7, 8, 9);
console.log(arr);

// pop
// 배열에 삭제
arr.pop();
arr.pop();

// shift
// 처음 인덱스 삭제
arr.shift();

// unshift
// 요소가 처음 인덱스로 추가
arr.unshift();

// slice
// 시작과 끝 입력, 끝 index는 입력한 수의 전 값이 나옴
console.log(arr.slice(2, 4));

// splice
// 시작과 시작부터 삭제할 수 입력
arr.splice(2, 2);
console.log(arr);

// 배열의 순회
for (let i = 0; i < 6; i += 1) {
  console.log(arr[i]);
}

for (const item of arr) {
  console.log(item);
}

// 배열은 객체
// Object
console.log(arr);

arr["key"] = "value";
console.log(arr);
// 배열의 길이가 바뀌지 않음
console.log(arr.length);
