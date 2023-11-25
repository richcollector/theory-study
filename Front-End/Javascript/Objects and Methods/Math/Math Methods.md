## Math

### Math.abs()

주어진 숫자의 절대값을 반환합니다. x가 양수이거나 0이라면 x를 리턴하고, x가 음수라면 x의 반대값, 즉 양수를 반환합니다.

- 사용법

  Math.abs(x);

```jsx
Math.abs("-1"); // 1
Math.abs(-2); // 2
Math.abs(null); // 0
Math.abs(""); // 0
Math.abs([]); // 0
Math.abs([2]); // 2
Math.abs([1, 2]); // NaN
Math.abs({}); // NaN
Math.abs("string"); // NaN
Math.abs(); // NaN
```

### Math.pow()

base^exponent처럼 base 에 exponent를 제곱한 값을 반환합니다.

- 사용법

  Math.pow(base, exponent);

  - 매개변수

    - base

      밑 값.

    - exponent

      밑 을 제곱하기 위해 사용하는 지수.

### Math.sqrt()

숫자의 제곱근을 반환합니다.

```jsx
// 간단한 예
Math.pow(7, 2); // 49
Math.pow(7, 3); // 343
Math.pow(2, 10); // 1024
// 분수 지수
Math.pow(4, 0.5); // 2 (4의 제곱근)
Math.pow(8, 1 / 3); // 2 (8의 세제곱근)
Math.pow(2, 0.5); // 1.4142135623730951 (2의 제곱근)
Math.pow(2, 1 / 3); // 1.2599210498948732 (2의 세제곱근)
// 양의 지수
Math.pow(7, -2); // 0.02040816326530612 (1/49)
Math.pow(8, -1 / 3); // 0.5
// 양의 밑
Math.pow(-7, 2); // 49 (제곱의 결과값은 양수입니다.)
Math.pow(-7, 3); // -343 (세제곱은 음수가 될 수 있습니다.)
Math.pow(-7, 0.5); // NaN (음수는 실제 제곱근을 가지지 않습니다.)
// "짝수"와 "홀수" 근이 서로 가깝게 놓여 있고
// 부동소수점 정밀도의 한계로 인해,
// 밑이 음수이며 지수가 분수라면 언제나 NaN을 반환합니다.
Math.pow(-7, 1 / 3); // NaN
```

- 사용법

  Math.sqrt(x);

```jsx
Math.sqrt(9); // 3
Math.sqrt(2); // 1.414213562373095

Math.sqrt(1); // 1
Math.sqrt(0); // 0
Math.sqrt(-1); // NaN
```

### Math.random()

0 이상 1 미만의 구간에서 근사적으로 균일한(approximately uniform) 부동소숫점 의사난수를 반환하며, 이 값은 사용자가 원하는 범위로 변형할 수 있다. 난수 생성 알고리즘에 사용되는 초기값은 구현체가 선택하며, 사용자가 선택하거나 초기화할 수 없다.

- 사용법

  Math.random();

```jsx
Math.random() * 45;
// 1 ~ 45
```

### Math.min()

주어진 숫자들 중 가장 작은 값을 반환합니다.

- 사용법

  Math.min([value1[, value2[, ...]]])

```jsx
var x = 10,
  y = -20;
var z = Math.min(x, y);
console.log(z); // -20
```

### Math.max()

입력값으로 받은 0개 이상의 숫자 중 가장 큰 숫자를 반환합니다.

- 사용법

  Math.max()
  Math.max(값0)
  Math.max(값0, 값1)
  Math.max(값0, 값1, ... , 값N)

```jsx
Math.max(10, 20); //  20
Math.max(-10, -20); // -10
Math.max(-10, 20); //  20
```

### Math.ceil()

주어진 숫자보다 크거나 같은 숫자 중 가장 작은 숫자를 integer 로 반환합니다

- 사용법

  Math.ceil(x);

```jsx
Math.ceil(0.95); // 1
Math.ceil(4); // 4
Math.ceil(7.004); // 8
Math.ceil(-0.95); // -0
Math.ceil(-4); // -4
Math.ceil(-7.004); // -7
```

### Math.floor()

주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수를 반환합니다.

- 사용법

  Math.floor(x);

```jsx
Math.floor(45.95); //  45
Math.floor(45.05); //  45
Math.floor(4); //   4
Math.floor(-45.05); // -46
Math.floor(-45.95); // -46
```
