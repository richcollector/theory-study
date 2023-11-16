## Tree

하나의 Root에서 하위로 뻗어나가는 특징을 가지고 있다.
방향 그래프의 일종으로 정점을 가리키는 간선이 하나 밖에 없는 구조를 가지고 있다.
각 정점은 Node라고 부르며, 더이상 자식이 없는 Node를 Leaf Node라고 부른다.
Level은 Root로 부터 몇번째 깊이인지에 따라 쓰인다.
한 정점에서 뻗어나가는 간선 수는 차수(Degree)라고 표현한다.

### 특징

루트 정점을 제외한 모든 정점을 반드시 하나의 부모 정점을 가진다.
정점이 N개인 트리는 반드시 N-1개의 간선을 가진다.
루트에서 특정 정점으로 가는 경로는 유일하다.

### 종류

- 이진트리
  각 정점이 최대 2개의 자식을 가지는 트리를 의미한다.
- 완전 이진 트리
  마지막 레벨을 제외하고 모든 정점이 채워져 있는 트리
- 포화 이진 트리
  마지막 레벨까지 모든 정점이 채워져 있는 트리
- 편향 트리
  한 방향으로만 정점이 이어지는 트리

### 이진트리의 특징

- 정점이 N개인 이진 트리는 최악의 경우 높이가 N이 될 수 있다.
- 정점이 N개인 포화 또는 와전 이진 트리의 높이는 logN이다.
- 높이가 i인 포화 이진 트리는 2ⁱ - 1개의 정점을 가진다.
- 일반적인 이진 트리를 사용하는 경우는 많지 않다. 다음 자료구조에 응용된다.
  - 이진 탐색트리
  - 힙
  - AVL 트리
  - 레드 블랙 트리

### 트리의 구현 방법

그래프와 마찬가지로 인접 행렬, 인접 리스트 두 가지 방식으로 트리를 표현할 수 있다.

### 이진 트리의 구현 방법

배열 혹은 요소에 링크가 2개 존재하는 연결 리스트로 구현할 수 있다.

- 배열로 구현

```jsx
// 0번 인덱스는 편의를 위해 비워둔다.
// Left = Index * 2
// Right = Index * 2 + 1
// Parent = floor(Index / 2)
const tree = [
  undefined,
  // 1
  9,
  // 1*2, 1*2+1
  3,
  8,
  // 2*2, 2*2+1, 3*2, 3*2+1
  2,
  5,
  undefined,
  7,
  // 4*2, 4*2+1, 5*2, 5*2+1
  undefined,
  undefined,
  undefined,
  4,
];
```

- 연결 리스트

```jsx
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(node) {
    this.root = node;
  }

  display() {
    //Level Order
    const queue = new Queue();
    queue.enqueue(this.root);
    while (queue.size) {
      const currentNode = queue.dequeue();
      console.log(currentNode.value);
      if (currentNode.left) queue.enqueue(currentNode.left);
      if (currentNode.right) queue.enqueue(currentNode.right);
    }
  }
}

const tree = new Tree(new Node(9));
tree.root.left = new Node(3);
tree.root.right = new Node(8);
tree.root.left.left = new Node(2);
tree.root.left.right = new Node(5);
tree.root right.right = new Node(7);
tree.root.left.right.right = new Node(4);
```
