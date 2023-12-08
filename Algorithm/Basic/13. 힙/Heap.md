## Heap

이진 트리 형태를 가지며 우선 순위가 높은 요소가 먼저 나가기 위해 요소가 삽입, 삭제 될 때 바로 정렬되는 특징이 있다.

**우선순위 큐 != 힙**
우선순위 큐를 힙이 아니라 배열 또는 연결리스트를 이용하여 구현할 수도 있다.

### 특징

- 우선순위가 높은 요소가 먼저 나가는 특징을 가진다.
- 루트가 가장 큰 값이 되는 최대 힙(Max Heap)과 루트가 가장 작은 값이 되는 최소 힙(Min Hep)이 있다.
- 아쉽게도 자바스크리브에선 직접 구현해서 사용해야 한다.

### Heap 요소 추가 알고리즘

- 요소가 추가될 때는 트리의 가장 마지막에 정점에 위치한다.
- 추가 후 부모 정점보다 우선순위가 높다면 부모 정점과 순서를 바꾼다.
- 이 과정을 반복하면 결국 가장 우선순위가 높은 정점이 루트가 된다.
- 완전 이진 트리의 높이는 logN이기에 힙의 요소 추가 알고리즘은 O(logN) 시간복잡도를 가진다.

#### MaxHeap

```jsx
class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (parentIndex !== 0 && this.heap[parentIndex] < value) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = value;
      this.heap[currentIndex] = temp;

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }
}

const heap = new MaxHeap();
heap.push(45);
heap.push(36);
heap.push(54);
heap.push(27);
heap.push(63);
console.log(heap.heap);
// Result is [null, 63, 54, 45, 27, 36]
```

## Heap 요소 제거 알고리즘

- 요소 제거는 루트 정점만 가능하다.
- 루트 정점이 제거된 후 가장 마지막 정점이 루트에 위치한다.
- 루트 정점이 두 자식 정점 중 더 우선 순위가 높은 정점과 바꾼다.
- 두 자식 정점이 우선 순위가 더 낮을 때 까지 반복한다.
- 완전 이진 트리의 높이는 logN이기에 힙의 요소 제거 알고리즘은 O(logN) 시간복잡도를 가진다.

```jsx
pop() {
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;
    while (
        this.heap[currentIndex] < this.heap[leftIndex] ||
        this.heap[currentIndex] < this.heap[rightIndex]
    ) {
        if (this.heap[leftIndex] < this.heap[rightIndex]) {
            const temp = this.heap[currentIndex];
            this.heap[currentIndex] = this.heap[rightIndex];
            this.heap[rightIndex] = temp;
            currentIndex = rightIndex;
        } else {
            const temp = this.heap[currentIndex];
            this.heap[currentIndex] = this.heap[leftIndex];
            this.heap[leftIndex] = temp;
            currentIndex = leftIndex;
        }
        leftIndex = currentIndex * 2;
        rightIndex = currentIndex * 2 + 1;
    }

    return returnValue;
}

//Heap state: [null, 63, 54, 45, 27, 36]
const array = [];
array.push(heap.pop()); // 63
array.push(heap.pop()); // 54
array.push(heap.pop()); // 45
array.push(heap.pop()); // 36
array.push(heap.pop()); // 27
console.log(array);
// Result is [63, 54, 45, 36, 27] - Heap Sort!
```

#### MinHeap

```jsx
class MinHeap {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length - 1;
  }

  getMin() {
    return this.heap[1] ? this.heap[1] : null;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  heappush(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = (curIdx / 2) >> 0;
    // 최소힙이므로 부모노드가 제일 작아야 한다. 즉 부모노드가 현재노드보다 큰 지 검사하며 반복한다.
    while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
      this.swap(parIdx, curIdx);
      // 구조분해 할당을 이용해 부모와 자식을 swap 한다. 따로 함수로 빼주어 작성해도 좋다.
      curIdx = parIdx;
      // 정수값만 얻을 때 사용하는 것.
      parIdx = (curIdx / 2) >> 0;
    }
  }

  heappop() {
    const min = this.heap[1]; // 배열 첫 원소를 비워두므로 root는 heap[1]에 항상 위치한다.
    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();
    // 배열 마지막 원소를 root 위치에 먼저 배치하는 과정이다.
    // if-else로 분기되는 이유는 추후 heap이 비었는지 아닌지 확인하기 위해 size 체크 함수를 만들때 -1을 통해 0을 만들어주기 때문.

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    if (!this.heap[leftIdx]) return min;
    // 왼쪽 자식이 없다는 것은 오른쪽 자식도 없는, 즉 루트만 있는 상태이므로 바로 반환!
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx] < this.heap[curIdx]) {
        this.swap(leftIdx, curIdx);
        // 오른쪽 자식이 없다면 왼쪽 자식하나만 있다는 것을 의미한다.
      }
      return min;
    }
    // 위에 조건에 걸리지 않는 경우 왼쪽과 오른쪽 자식이 모두 있는 경우이다.
    // 따라서 현재 노드가 왼쪽 또는 오른쪽 보다 큰 지 작은지를 검사하며 반복한다.
    while (
      // 왼쪽과 오른쪽 자식 중에 더 작은 값과 현재 노드를 교체하면 된다.
      this.heap[leftIdx] < this.heap[curIdx] ||
      this.heap[rightIdx] < this.heap[curIdx]
    ) {
      const minIdx =
        this.heap[leftIdx] > this.heap[rightIdx] ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return min;
  }
}
```
