## Date

1970년 1월 1일 UTC(국제표준시) 자정으로부터 지난 시간을 밀리초로 나타내는 UNIX 타임스탬프를 담습니다.

- 사용법

  ```js
  new Date();
  new Date(value);
  new Date(dateString);

  new Date(year, monthIndex);
  new Date(year, monthIndex, day);
  new Date(year, monthIndex, day, hours);
  new Date(year, monthIndex, day, hours, minutes);
  new Date(year, monthIndex, day, hours, minutes, seconds);
  new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds);
  ```

- 매개변수

  - 매개변수 없음

    매개변수를 제공하지 않으면, 생성 순간의 날짜와 시간을 나타내는 Date 객체를 생성합니다.

  - UNIX 타임스탬프 값

    value
    UNIX 타임스탬프, 즉 1970년 1월 1일 00:00:00 UTC(UNIX 시간)부터의 시간을 밀리초 단위로 표현하되 윤초는 무시한 정수 값입니다. 대부분의 UNIX 타임스탬프 함수는 초 단위까지만 정확함을 유의하세요.

  - 개별 날짜 및 시간 구성 요소

    최소한 연도와 월이 주어졌을 때, Date()의 이 형태는 Date 객체를 생성할 때 모든 구성 요소(연, 월, 일, 시, 분, 초, 밀리초)를 모두 매개변수에서 가져옵니다. 누락한 요소에는 가장 낮은 값(day는 1, 나머지는 0)을 사용합니다. 모든 매개변수 값은 UTC가 아닌 현지 시간으로 취급합니다.

    - year

      연도를 나타내는 정수 값입니다.0부터 99까지는 1900부터 1999로 처리합니다. 다른 모든 값은 그대로 사용합니다. 예제를 참고하세요.

    - monthIndex

      월을 나타내는 정수 값입니다. 1월을 나타내는 0부터 12월을 나타내는 11까지 사용할 수 있습니다.

    - day Optional

      일을 나타내는 정수 값입니다. 기본값은 1입니다.

    - hours Optional

      시를 나타내는 정수 값입니다. 기본 값은 자정을 나타내는 0입니다.

    - minutes Optional

      분을 나타내는 정수 값입니다. 기본 값은 정각을 나타내는 0입니다.

    - seconds Optional

      초를 나타내는 정수 값입니다. 기본 값은 0초입니다.

    milliseconds Optional

    밀리초를 나타내는 정수 값입니다. 기본 값은 0밀리초입니다.

```jsx
let today = new Date();
let birthday = new Date("December 17, 1995 03:24:00");
let birthday = new Date("1995-12-17T03:24:00");
let birthday = new Date(1995, 11, 17); // 월은 0부터 시작
let birthday = new Date(1995, 11, 17, 3, 24, 0);
```
