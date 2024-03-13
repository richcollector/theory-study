- 문제 설명

  아래와 같이 5와 사칙연산만으로 12를 표현할 수 있습니다.

  12 = 5 + 5 + (5 / 5) + (5 / 5)
  12 = 55 / 5 + 5 / 5
  12 = (55 + 5) / 5

  5를 사용한 횟수는 각각 6,5,4 입니다. 그리고 이중 가장 작은 경우는 4입니다.
  이처럼 숫자 N과 number가 주어질 때, N과 사칙연산만 사용해서 표현 할 수 있는 방법 중 N 사용횟수의 최솟값을 return 하도록 solution 함수를 작성하세요.

- 제한사항

  - N은 1 이상 9 이하입니다.
  - number는 1 이상 32,000 이하입니다.
  - 수식에는 괄호와 사칙연산만 가능하며 나누기 연산에서 나머지는 무시합니다.
  - 최솟값이 8보다 크면 -1을 return 합니다.

- 입출력 예

  |  N  | number | return |
  | :-: | :----: | :----: |
  |  5  |   12   |   4    |
  |  2  |   11   |   3    |

- 예제 #1

  문제에 나온 예와 같습니다.

- 예제 #2

  11 = 22 / 2와 같이 2를 3번만 사용하여 표현할 수 있습니다.

### 문제풀이

```javascript
function solution(N, number) {
  var answer = -1;
  // 1. 각 N의 개수별 만들 수 있는 수를 저장하는 자료구조 Set를 만든다.
  const makeNumberSet = [];

  if (N === number) {
    answer = 1;
  } else {
    // 2. N의 개수를 1씩 증가시키며, 개수별 만들 수 있는 수의 리스트를 Set에 저장한다.
    makeNumberSet[1] = new Set().add(N);
    for (let i = 2; i < 9; i++) {
      calculateResult(i);
      // 3. 만들 수 있는 수의 리스트에 number가 포함되어 있으면, 현재 개수를 반환한다.
      // 만들지 못할 경우, -1을 반환한다.
      if (makeNumberSet[i].has(number)) {
        answer = i;
        break;
      }
    }
  }

  function calculateResult(count) {
    makeNumberSet[count] = new Set();
    let connectValue = N.toString();
    for (let i = 1; i < count; i++) {
      connectValue += N.toString();
      const [left, right] = [i, count - i];

      for (let leftValue of makeNumberSet[left]) {
        for (let rightValue of makeNumberSet[right]) {
          makeNumberSet[count].add(leftValue + rightValue);
          makeNumberSet[count].add(leftValue - rightValue);
          makeNumberSet[count].add(leftValue * rightValue);
          if (rightValue !== 0) {
            makeNumberSet[count].add(Math.floor(leftValue / rightValue));
          }
        }
      }
    }
    makeNumberSet[count].add(parseInt(connectValue));
  }
  return answer;
}
```
