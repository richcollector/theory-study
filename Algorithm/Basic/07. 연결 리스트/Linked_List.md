## 연결리스트 (Linked List)

연결리스트는 각 요소를 포인터로 연결하여 관리하는 선형 자료구조다.
각 요소는 노드라고 부르며 데이터 영역과 포인터 영역으로 구성된다.

### 특징

- 메모리가 허용하는한 요소를 제한없이 추가할 수 있다.
- 탐색은 O(n)이 소요된다.
- 요소를 추가하거나 제거할 때는 O(1)이 소요된다.
- Singly Linked List(단일), Doubly Linked List(이중), Circular Linked List(환형)가 존재한다.

### 배열과 연결리스트의 차이

- 메모리차이
  배열은 순차적으로 삭제하여 메모리 영역을 연속적으로 사용하고, 연결 리스트는 각 데이터가 퍼져있다.
- 요소 삭제 O(1)
  삭제할 전 요소의 포인터를 삭제할 다음 요소의 포인터로 가리키게 한다.
- 요소 추가 O(1)
  삽입할 위치 다음 요소를 가리키는 포인터를 만들고, 전 요소의 포인터를 삽입한 위치의 포인터를 가리키게 한다.

#### 핵심로직

- 요소 찾기 O(n)
- 요소 추가 O(1)
- 요소 삭제 O(1)

### Singly Linked List

Head(첫번째 요소)에서 Tail(마지막 요소)까지 단방향으로 이어지는 연결 리스트
가장 단순한 형태인 연결 리스트이다.

Head Pointer: 첫번째 요소를 가리키는 포인터
Tail Pointer: Null

#### 코드로 확인하기

```jsx
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  find(value) {
    let currNode = this.head;
    while (currNode.value !== value) {
      currNode = currNode.next;
    }
    return currNode;
  }

  append(newValue) {
    cons newNode = new Node(newValue);
    if(this.head === null){
        this.head = newNode;
        this.tail = newNode;
    } else {
        this.tail.next = newNode;
        this.tail = newNode;
    }
  }

  insert(node, newValue) {
    const newNode = new Node(newValue);
    newNode.next = node.next;
    node.next = newNode;
  }

  remove(value) {
    let prevNode = this.head;
    while (prevNode.next.value !== value) {
        prevNode = prevNode.next;
    }

    if (prevNode.next !== null) {
        prevNode.next = prevNode.next.next;
    }
  }

  display() {
    let currNode = this.head;
    let displayString = "[]";
    while (currNode !== null) {
        displaySTring += `${currNode.value}, `;
        currNode = currNode.next;
    }
    displayString = displayString.substr(0, displayString.length - 2);
    displayString += "]";
    console.log(displayString);
  }
}
```

### Doubly Linked List

양방향으로 이어지는 연결리스트로 Singly Linked List보다 자료구조의 크기가 조금 더 크다.
다음 노드를 가리키는 포인터와 이전 노드를 가리키는 포인터가 존재한다.

### Circular Linked List

Singly 혹은 Doubly Linked List에서 Tail이 Head로 연결되는 연결 리스트로 메모리를 아껴쓸 수 있다.
