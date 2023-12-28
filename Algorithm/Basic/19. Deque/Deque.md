## Dequeue

Double-ended Queue 의 약자입니다.
스택과 큐를 합친 자료구조여서 양 끝에서 데이터를 넣거나 추출할 수 있습니다.

```jsx
class Dequeue {
  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
  }
  push_front(item) {
    if (this.arr[0]) {
      for (let i = this.arr.length; i > 0; i--) {
        this.arr[i] = this.arr[i - 1];
      }
    }
    this.arr[this.head] = item;
    this.tail++;
  }
  push_back(item) {
    this.arr[this.tail++] = item;
  }
  pop_front() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[this.head++];
      return result;
    }
  }
  pop_back() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[--this.tail];
      return result;
    }
  }
}

let dequeue = new Dequeue();
dequeue.push_front(1); // arr: [1] head: 0 tail: 1
dequeue.push_front(2); // arr: [2, 1] head: 0 tail: 2
console.log(dequeue.pop_front()); // 2, head: 1 tail: 2
dequeue.push_front(3); // arr: [2, 3, 1] head: 1 tail: 3
console.log(dequeue.pop_front()); // 3, head: 2 tail: 3
console.log(dequeue.pop_front()); // 1, head: 3 tail: 3
console.log(dequeue.pop_front()); // null
dequeue.push_back(5); // arr: [5] head: 3 tail: 4
// 실제 배열 출력은 arr: [2, 3, 1, 5] 이지만 배열 요소 2, 3, 1은 pop_front()를 하였기에 shift()가 된 요소로 생각할 수 있다.
console.log(dequeue.pop_back()); // 5, head: 3 tail: 3
console.log(dequeue.pop_back()); // null
dequeue.push_back(6); // arr: [6] head: 3 tail: 4
// 실제 배열 출력은 arr: [2, 3, 1, 6] 이지만 배열 요소 2, 3, 1 은 pop_front()를 하였기에 shift()가 된 요소로, 배열 요소 5는 pop_back()을 실행해서 pop()가 된 요소로 생각할 수 있다.
dequeue.push_front(9); // arr: [9, 6] head: 3 tail: 5
```
