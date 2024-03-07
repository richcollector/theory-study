## sort

요소들을 일정한 순서대로 열거하는 알고리즘

### 특징

- 정렬 기준은 사용자가 정할 수 있다.
- 크게 비교식과 분산식 정렬로 나눌 수 있다.
- 대부분의 언어가 빌트인으로 제공해준다.
- 삽입, 선택, 버블, 머지, 힙, 퀵 정렬 등 다양한 정렬 방식이 존재한다.

### 어떤 정렬이 제일 빠를까?

(정렬 속도 확인 사이트)[https://www.toptal.com/developers/sorting-algorithms]에서 확인 가능

### 비교식 정렬

#### 버블 정렬

- 가장 간단하고 기본적인 알고리즘 중 하나로, 이름에서도 알 수 있듯이 배열의 요소를 '거품(Bubble)'처럼 서로 교환해 가며 정렬하는 방식입니다. 즉, 서로 인접한 두 원소를 비교해가며 오름차순이나 내림차순으로 정렬을 진행합니다.

- 만약 숫자 배열을 오름차순으로 정렬하는 상황에서 더 큰 숫자가 한 번에 하나씩 뒤로 이동하는 방법입니다.
  기본적으로 어떤 항목이 더 크면 교환하고, 다음 항목과 비교하고, 다음 항목보다 더 크면 또 교환을 하고, 다시 다음 항목과 비교하면서 반복을 합니다.오름차순의 상황에서는 가장 큰 값이 상단을 향해서 값을 정렬하는 방식으로 목록을 만듭니다.

- 배열의 각 항목마다 n번의 비교를 하고 배열의 다른 모든 항목 하나하나 비교하기 때문에 일반적으로 버블 정렬의 시간 복잡도는 O(N^2)입니다. 그러나 데이터가 거의 정렬되었거나 이미 정렬이 완료된 상태에서 noSwaps 변수가 있는 코드를 사용하면 선형 시간(Linear Time)에 가까워집니다. 예를 들어, [1, 2, 3, 4, 5]와 같은 이미 오름차순으로 정렬된 배열에서는 첫 번째 패스 동안 어떠한 교환도 발생하지 않아 알고리즘이 즉시 종료됩니다. 따라서 이 경우 버블정렬의 시간 복잡도는 O(N)으로 줄어들게 됩니다. 다만 주목해야 할 점은 이러한 최적화 사항들은 '최선'의 경우에 해당하며 일반적인 상황에서 버블정렬은 여전히 O(N^2)의 시간 복잡도를 가진다는 것입니다.

```jsx
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

#### 선택 정렬

- 정렬되지 않은 원소 중 가장 작은 원소를 찾아 정렬된 요소의 끝에 배치한다. 즉, 배열의 요소 중에서 최소값을 발견한 다음, 이 최소값을 배열의 첫번째 요소와 교환환다. 첫번째 요소를 제외한 나머지 요소들 중에서 가장 작은 값을 선택하고 이를 두번째 요소와 교환한다. 이 과정을 배열이 정렬될 때까지 반복한다. 선택 정렬은 가장 이해하기 쉬운 정렬 방법이고 **매번 가장 작은 것을 선택**한다는 의미에서 선택 정렬(Selection Sort)이라 한다.

- 선택 정렬은 소스코드 상으로 간단한 형태의 2중 반복문이 사용되었는데 n−1번 만큼 가장 작은 값을 찾아서 맨 앞으로 교체해야 한다. 그리고 가장 작은 값을 찾는 과정이 매번 내부 루프안에서 발생한다.연산 횟수는 (n - 1) + (n - 2) + ... + 1로 볼 수 있다. 이는 n(n−1)/2 로 표현할 수 있고, 빅오 표기법으로 간단히 O(n²)이라고 표현할 수 있다. 따라서 선택 정렬의 시간 복잡도는 O(N²) 이다.

```jsx
const selectionSort = (dataList) => {
  for (let i = 0; i < dataList.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < dataList.length; j++) {
      if (dataList[minIdx] > dataList[j]) minIdx = j;
    }
    [dataList[minIdx], dataList[i]] = [dataList[i], dataList[minIdx]];
  }
  return dataList;
};

const dataList = [43, 21, 40, 18, 25, 24, 47, 8, 5, 35];
console.log(selectionSort(dataList));
```

- 선택 정렬의 장단점

  - 장점

    적은 개수의 원소를 정렬할 때 성능이 좋다.
    in-place 정렬 알고리즘이기 때문에 원소들의 개수보다 무시할만한 저장공간을 더 사용한다(추가적인 메모리 공간 사용이 적다).

  - 단점

    많은 개수의 데이터를 처리할 때 효율성(efficiency)이 떨어진다.

#### 삽입 정렬

- 삽입 정렬은 선택 정렬처럼 동작 원리를 직관적으로 이해하기 쉬운 알고리즘이다. 삽입 정렬은 특정한 데이터를 적절한 위치에 삽입한다는 의미에서 삽입 정렬(Insertion Sort)이라고 한다. 삽입 정렬은 필요할 때만 위치를 바꾸므로 데이터가 거의 정렬 되어 있을 때 훨씬 효율적이다. 선택 정렬은 현재 데이터의 상태와 상관없이 무조건 모든 원소를 비교하고 위치를 바꾸는 반면 삽입 정렬은 그렇지 않다.

- 삽입 정렬은 손안의 카드를 정렬하는 방법과 유사하다. 새로운 카드가 들어오면 새로운 카드를 기존의 정렬된 카드 사이의 올바른 자리를 찾아 삽입 함으로써 정렬이 유지되게 한다. 이와 같은 작업을 카드의 수만큼 반복하게 되면 전체 카드가 정렬된다. 삽입 정렬은 특정한 데이터가 적절한 위치에 들어가기 이전에, 그 앞까지의 데이터는 이미 정렬되어 있다고 가정한다. 정렬되어 있는 데이터 리스트에서 적절한 위치를 찾은 뒤, 그위치에 삽입된다는 점이 특징이다.

- 삽입 정렬은 두 번째 데이터부터 시작한다. 왜냐하면 이전 데이터(시작할 때는 첫 번째 데이터)는 그 자체로 정렬되어 있다고 판단하기 때문이다. 정렬되어 있지 않은 부분의 첫 번째 데이터가 정렬된 부분의 어느 위치에 삽입되어야 하는가를 판단한 후 해당 위치에 이 데이터를 삽입하게 되면, 정렬된 부분의 크기는 하나 커지게 되고 정렬되지 않은 부분의 크기는 하나 줄게된다.

- 삽입 정렬의 시간 복잡도는 O(N²) 이다. 소스코드 상으로 간단한 형태의 2중 반복문이 사용되었기 때문이다. 데이터 리스트가 어느 정도 정렬되어 있는 경우 매우 빠르게 동작하는데 이때 알고리즘의 시간복잡도는 O(N)이다.

```jsx
const insertionSort = (data) => {
  for (let i = 1; i < data.length; i++) {
    for (let j = i - 1; j > 0; j--) {
      if (data[j] < data[j - 1])
        [data[j], data[j - 1]] = [data[j - 1], data[j]];
    }
  }
  return data;
};

const dataList = [43, 21, 40, 18, 25, 24, 47, 8, 5, 35];
console.log(insertionSort(dataList));
```

- 삽입정렬의 장단점

  - 장점

    알고리즘이 단순하다.
    데이터 리스트가 이미 정렬되어 있는 경우, 매우 효율적이다.
    in-place 정렬 알고리즘이기 때문에 공간 낭비가 적다.

  - 단점

    다른 정렬 알고리즘과 비교해 성능이 나쁘다.
    많은 데이터의 이동을 포함하기 때문에 정렬해야 할 데이터가 많고 클 경우 경우에 알맞지 않다.
    적은 수의 데이터를 정렬할 때만 유용하다.

### 분산식 정렬

#### 합병 정렬

- 분할 정복 기법(Divide and Conquer)과 재귀 용법을 활용한 정렬 알고리즘이다. 정렬할 원소 목록을 원소가 하나 밖에 남지 않을 때까지 절반으로 잘라 비슷한 크기의 두 부분으로 계속 나눈다. 정렬할 때는 각 절반의 가장 작은 요소를 비교하여 수행된다. (각 목록의 첫 번째 요소가 가장 먼저 비교된다.) 더 작은 값으로 시작되는 것을 정렬된 목록에 추가한다.

- divide

  나눠진 수들을 합치면서 정렬을 한다.
  요소들을 나누는 작업을 하여, 절반으로 나누고 요소가 1개가 남을 때 까지 진행한다.

- conquer

  합칠 때, 두 요소 중 작은 것을 먼저 배치한다. 이런식으로 모두 합쳐 질 때까지 진행한다.

- 합병 정렬의 장단점

  - 장점

    항상 동일한 시간이 소요되므로 어떤 경우에도 좋은 성능을 낼 수 있다.
    퀵 정렬과 달리 기준값(pivot)을 설정하는 과정이 없어 기준값에 따라 성능이 달라지는 경우가 없다.

  - 단점

    in place 정렬 알고리즘이 아니기 때문에 데이터의 양이 많은 경우 이동횟수가 많아진다.
    임시 배열에 원본을 계속해서 옮기며 정렬을 하는 방식이기 때문에 추가적인 메모리가 필요하다.

```jsx
const merge = (left, right) => {
  let merged = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }

  return [...sorted, ...left, ...right];
};

const mergeSort = (data) => {
  if (data.length < 2) return data;

  let mid = Math.floor(data.length / 2);
  let left = mergeSort(data.slice(0, mid));
  let right = mergeSort(data.slice(mid));

  return merge(left, right);
};

const dataList = [43, 21, 40, 18, 25, 24, 47, 8, 5, 35];
console.log(mergeSort(dataList));
// [5, 8, 18, 21, 24, 25, 35, 40, 43, 47]
```

#### 퀵 정렬

- 평균적으로 매우 빠른 수행 속도를 자랑하는 정렬 알고리즘이다. 퀵 정렬은 합병 정렬과 비슷하게 전체 데이터 리스트를 2개의 부분 리스트로 분할하고, 각각의 부분 리스트를 다시 퀵정렬하는 분할 정복법(Divide-and-Conquer)을 사용한다. 그러나 퀵 정렬은 합병 정렬과 다르게 데이터 리스트를 비균등하게 분할한다. 퀵 정렬과 합병 정렬은 대부분의 프로그래밍 언어에서 정렬 라이브러리의 근간이 되는 알고리즘이다.

- N이 2의 거듭제곱이라고 가정하고 만약에 퀵정렬에서의 리스트 분할이 항상 리스트의 가운데에 서 이루어진다고 가정하면 합병 정렬의 복잡도 분석과 마찬가지로 N개의 레코드를 가지는 리스트는 N/2,N/4,N/8,...,N/2ⁱ의 크기로 나누어질 것이다. 크기가 1이 될 때까지 나누어지므로 N/2k=1일 때까지 나누어질 것이고 따라서 k=logN개의 패스가 필요하게 된다. 각각의 패스에서는 전체 리스트의 대부분의 레코드를 비교하기 때문에 평균 N번 정도의 비교가 이루어지므로 퀵 정렬은 비교 연산을 총 N log N번 실행하게 되어 O(N log N)의 시간 복잡도를 가지는 알고리즘이 된다.

- 퀵 정렬에서는 피벗(pivot)이 사용된다. 큰 숫자와 작은 숫자를 교환할 때, 피벗은 기준이 된다. 데이터 리스트에서 첫 번째 데이터를 피벗으로 정한다. left 변수는 피벗보다 큰 수를 만나거나 피벗을 만나면 멈추고, right 변수는 피벗보다 작은 수를 만나거나 피벗을 만나면 멈춘다. left와 right가 멈췄을 때, left가 right보다 왼쪽에 있다면 즉, left와 right가 엇갈리지 않았다면 left의 데이터와 right의 데이터를 서로 교체한다. 반대로 left가 right보다 오른쪽에 있다면 즉, left와 right가 엇갈렸다면 피벗의 데이터와 right의 데이터를 서로 교체한다.

- 퀵 정렬의 장단점

  - 장점

    데이터가 무작위로 입력되는 경우 매우 빠르게 동작한다.
    많은 데이터를 처리할 때 적합하다.
    in-place 정렬 알고리즘이므로 추가적인 메모리가 필요하지 않다.

  - 단점

    최악의 경우O(n²)의 시간 복잡도를 갖는다.
    데이터가 이미 정렬되어 있다면 매우 느리게 동작한다.
    정렬할 데이터가 정수라면 기수정렬이 더 효율적이다.

```jsx
const array = [5, 9, 10, 3, 8, 3, 2];
// 다음과 같이 그냥 정렬하면 ASCII 문자 순서로 정렬되어, 우리가 원하는 숫자 크기대로 정렬되지 않는다.
array.sort();
console.log(array); // 10, 2, 3, 3, 5, 8, 9
// 10이 먼저 나오는 이유는 ACII 문자 '1'이 '2'보다 작기 때문

array.sort((a, b) => a - b); //오름차순 정렬
console.log(array); // 2, 3, 3, 5, 8, 9, 10

array.sort((a, b) => b - a); // 내림차순 정렬
console.log(array); //10, 9, 8, 5, 3, 3, 2
```

```jsx
function quickSort(dataList, start, end) {
  if (end <= start) return;

  const pivot = start;
  let left = start + 1;
  let right = end;

  while (left <= right) {
    console.log(dataList);
    while (left <= end && dataList[left] <= dataList[pivot]) left++;
    while (start < right && dataList[pivot] <= dataList[right]) right--;

    if (right < left) {
      [dataList[right], dataList[pivot]] = [dataList[pivot], dataList[right]];
    } else {
      [dataList[left], dataList[right]] = [dataList[right], dataList[left]];
    }
  }
  quickSort(dataList, start, right - 1);
  quickSort(dataList, right + 1, end);
}

const dataList = [6, 8, 10, 1, 4, 2, 7, 3, 5, 9];
quickSort(dataList, 0, dataList.length - 1);
console.log(dataList); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

아래 코드는 퀵 정렬을 짧게 작성한 코드이다. 피벗과 데이터를 비교하는 연산 횟수가 증가하므로 시간 면에서 비효율적이긴 하지만 코드가 직관적이고 기억하기 쉽다.

```jsx
const quickSort = (dataList) => {
  if (dataList.length <= 1) return dataList;

  const pivot = dataList[0];
  const leftSide = [];
  const rightSide = [];

  for (let i = 1; i < dataList.length; i++) {
    if (dataList[i] <= pivot) leftSide.push(dataList[i]);
    else rightSide.push(dataList[i]);
  }

  return [...quickSort(leftSide), pivot, ...quickSort(rightSide)];
};
const dataList = [6, 8, 10, 1, 4, 2, 7, 3, 5, 9];
console.log(quickSort(dataList)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
