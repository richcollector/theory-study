## Number

### Number.prototype.toString()

정한 Number 객체를 나타내는 문자열을 반환합니다.

- 사용법

  numObj.toString([radix]);

  - 매개변수

    - radix Optional

      수의 값을 나타내기 위해 사용되기 위한 기준을 정하는 2와 36사이의 정수. (진수를 나타내는 기수의 값.)

### Number.isNaN()

주어진 값이 NaN인지 판별합니다. 기존부터 존재한 전역 isNaN() 함수의 더 엄격한 버전입니다.

- 사용법

  Number.isNaN(value);

```jsx
Number.isNaN(NaN); // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0); // true

// 예를 들면 이들은 global isNaN()으로는 true가 됐을 것임
Number.isNaN("NaN"); // false
Number.isNaN(undefined); // false
Number.isNaN({}); // false
Number.isNaN("blabla"); // false

// 모두
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN(37);
Number.isNaN("37");
Number.isNaN("37.37");
Number.isNaN("");
Number.isNaN(" ");
```

### Number.parseInt()

문자열 인자를 파싱하여 특정 진수(수의 진법 체계에서 기준이 되는 값)의 정수를 반환합니다.

- 사용법

  Number.parseInt(string);
  Number.parseInt(string, radix);

  - 매개변수

    - string

      파싱할 값입니다. 문자열이 아닐 경우 ToString 추상 연산을 사용해 문자열로 변환합니다. 문자열의 선행 공백은 무시합니다.

    - radix Optional

      string의 진수를 나타내는 2부터 36까지의 정수입니다.

      radix를 생략하거나 0을 지정한 경우, string이 0x 또는 0X로 시작하는 경우 16을 지정한 것으로 취급하고, 그 외의 경우 10으로 취급합니다.

```jsx
Number.parseInt("1"); // 숫자 1반환
```

### Number.isInteger()

주어진 값이 정수인지 판별합니다.

- 사용법

  Number.isInteger(value);

```jsx
Number.isInteger(0); // true
Number.isInteger(1); // true
Number.isInteger(-100000); // true
Number.isInteger(99999999999999999999999); // true

Number.isInteger(0.1); // false
Number.isInteger(Math.PI); // false

Number.isInteger(NaN); // false
Number.isInteger(Infinity); // false
Number.isInteger(-Infinity); // false
Number.isInteger("10"); // false
Number.isInteger(true); // false
Number.isInteger(false); // false
Number.isInteger([1]); // false
```
