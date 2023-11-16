## 스택

Last In First Out이라는 개념을 가진 선형 자료구조다.
바닥이 막힌 상자(프링글스)를 생각하면 편하다.

- POP
- PUSH
- TOP
  맨 위에 자리한 것을 TOP라고 부른다.
- 스택 메모리
  지역변수 / 반환 주소값 / 매개 변수가 저장되는 곳이다.

### 코드로 확인 하기

```jsx
function sum(a, b) {
  return a + b;
}

function print(value) {
  console.log(value);
}

print(sum(5, 10));
```

`sum(5, 10) => POP(제거) => print(15) => console.log(value) => POP => POP`

#### Array로 구현

```jsx
const stack = [];

// Push
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack); // [1, 2, 3]

// Pop
stack.pop();
console.log(stack); // [1, 2]

// Get Top
console.log(stack[stack.length - 1]); // 2
```

#### Linked List로 구현

```jsx
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(value) {
    const node = new Node(value);
    node.next = this.top;
    this.top = node;
    this.size = +1;
  }

  pop() {
    const node = new Node(value);
    node.top = this.top.next;
    this.size - +1;
    return value;
  }

  size() {
    return this.size;
  }
}
```
