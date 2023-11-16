## 큐

First in First Out이라는 개념을 가진 선형 자료구조다.
Linear Queue와 Circular Queue가 존재한다.

- Front 맨 앞
- Rear 맨 뒤
- EnQueue (추가)
- DeQueue (빼는 것)

### Linear Queue

- Array로 표현하기
  Front가 빠져나가고 배열을 재정리하는데, 선형 시간이 걸림.

  ```jsx
  class Queue {
    constructor() {
      this.queue = [];
      this.front = 0;
      this.rear = 0;
    }

    enqueue(value) {
      this.queue[this.rear++] = value;
    }

    dequeue() {
      const value = this.queue[this.front];
      delete this.queue[this.front];
      this.front += 1;
      return value;
    }

    peek() {
      return this.queue[this.front];
    }

    size() {
      return this.rear - this.front;
    }
  }
  ```

- Linear Queue를 Linked List로 표현할 수 있다.
  Head는 Front가 되고, Tail은 Rear이 된다.

  ```jsx
  class Mode {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }

  class Queue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }

    enqueue(newValue) {
      const newValue = new Node(newValue);
      if (this.head === null) {
        this.head = this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.size += 1;
    }

    dequeue() {
      const value = this.head.value;
      this.head = this.head.next;
      this.size -= 1;
      return value;
    }

    peek() {
      return this.head.value;
    }
  }
  ```

#### shift 함수는 쓰지 않기

shift 함수는 선형시간이 걸리기때문에 queue에서 원하는 로직이 되지 않음.

```jsx
const queue = [1, 2, 3];
queue.push(4);
const value = queue.shift(); // O(n) !!
console.log(value); // 1
```

### Circulat Queue

Front와 Rear가 이루어져있는 Queue.
Circular Queue는 Linked List로 구현했을 때 이점이 없다.

```jsx
class Queue {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.queue = [];
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enqueue(value) {
    if (this.isFull()) {
      console.log("Queue is full");
      return;
    }
    this.queue[this.rear] = value;
    this.rear = (this.rear + 1) % this.maxSize;
    this.size += 1;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front = (this.front + 1) % this.maxSize;
    this.size -= 1;
    return value;
  }

  isFull() {
    return this.size === this.maxSize;
  }

  peek() {
    return this.queue[this.front];
  }
}
```
