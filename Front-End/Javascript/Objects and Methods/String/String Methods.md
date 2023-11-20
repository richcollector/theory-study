## String

### String.prototype.substr()

문자열에서 특정 위치에서 시작하여 특정 문자 수 만큼의 문자들을 반환합니다.

- 사용법

  str.substr(start[, length])

  - 매개변수

    - start

      추출하고자 하는 문자들의 시작위치입니다. 만약 음수가 주어진다면, 문자열총길이 + start의 값으로 취급합니다. 예를 들면, start에 -3을 설정하면, 자동적으로 문자열총길이 - 3으로 설정하게 됩니다.

    - length

      옵션값. 추출할 문자들의 총 숫자.

```jsx
var str = "abcdefghij";

console.log("(1, 2): " + str.substr(1, 2)); // '(1, 2): bc'
console.log("(-3, 2): " + str.substr(-3, 2)); // '(-3, 2): hi'
console.log("(-3): " + str.substr(-3)); // '(-3): hij'
console.log("(1): " + str.substr(1)); // '(1): bcdefghij'
console.log("(-20, 2): " + str.substr(-20, 2)); // '(-20, 2): ab'
console.log("(20, 2): " + str.substr(20, 2)); // '(20, 2): '
```
