## String

문자열(문자의 나열)의 생성자입니다.

- 사용법

  String(thing);

```jsx
var s_prim = "foo";
var s_obj = new String(s_prim);

console.log(typeof s_prim); // Logs "string"
console.log(typeof s_obj); // Logs "object"
```

```jsx
var s1 = "2 + 2"; // creates a string primitive
var s2 = new String("2 + 2"); // creates a String object
console.log(eval(s1)); // returns the number 4
console.log(eval(s2)); // returns the string "2 + 2"
```

### String.prototype.matchAll()

캡처 그룹을 포함하여 정규 표현식, String과 비교하여 이 문자열과 일치하는 모든 결과의 반복자를 반환합니다.

- 사용법
  matchAll(regexp)

  - 매개변수

    - regexp

      정규식 개체 또는 Symbol.matchAll메서드가 있는 개체입니다.

      regexp가 객체 가 아니고 RegExp메서드도 없는 경우 를 사용하여 Symbol.matchAll암시적으로 로 변환됩니다 .RegExpnew RegExp(regexp, 'g')

      regexp 가 regex인 경우 전역( g) 플래그가 설정되어 있어야 하며 그렇지 않으면 a가 TypeError발생합니다.

```jsx
const regexp = /foo[a-z]*/g;
const str = "table football, foosball";
let match;

while ((match = regexp.exec(str)) !== null) {
  console.log(
    `Found ${match[0]} start=${match.index} end=${regexp.lastIndex}.`
  );
}
// Found football start=6 end=14.
// Found foosball start=16 end=24.
```

### String.prototype.match()

문자열이 정규식과 매치되는 부분을 검색합니다.

- 사용법

  str.match(regexp);

  - 매개변수

    - regexp

      정규식 개체입니다. RegExp가 아닌 객체 obj가 전달되면, new RegExp(obj)를 사용하여 암묵적으로 RegExp로 변환됩니다. 매개변수를 전달하지 않고 match()를 사용하면, 빈 문자열:[""]이 있는 Array가 반환됩니다.

```jsx
var str = "For more information, see Chapter 3.4.5.1";
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);

console.log(found);

// logs [ 'see Chapter 3.4.5.1',
//        'Chapter 3.4.5.1',
//        '.1',
//        index: 22,
//        input: 'For more information, see Chapter 3.4.5.1' ]

// 'see Chapter 3.4.5.1'는 완전한 매치 상태임.
// 'Chapter 3.4.5.1'는 '(chapter \d+(\.\d)*)' 부분에 의해 발견된 것임.
// '.1' 는 '(\.\d)'를 통해 매치된 마지막 값임.
// 'index' 요소가 (22)라는 것은 0에서부터 셀 때 22번째 위치부터 완전 매치된 문자열이 나타남을 의미함.
// 'input' 요소는 입력된 원래 문자열을 나타냄.
```

### String.prototype.toString()

객체의 문자열 표현을 반환합니다.

- 사용법

  toString();

```jsx
var x = new String("Hello world");

console.log(x.toString()); // logs 'Hello world'
```

- 2진수로 변경하는 방법

```jsx
let baseTenInt = 10;
console.log(baseTenInt.toString(2));
// "1010"이 출력됩니다
```

### String.prototype.localeCompare()

참조 문자열이 정렬 순으로 지정된 문자열 앞 혹은 뒤에 오는지 또는 동일한 문자열인지 나타내는 수치를 반환합니다.

- 사용법

  localeCompare(compareString);
  localeCompare(compareString, locales);
  localeCompare(compareString, locales, options);

  - 매개변수

    - compareString

      referenceStr가 비교되는 문자열.

    - locales와 options

      이러한 인수는 함수의 동작을 사용자 정의하여 응용 프로그램에서 포맷 규칙을 사용할 언어를 지정합니다. "locales"와 "options"의 인자를 무시하는 구현에서는 사용되는 로케일과 반환되는 문자열의 형식은 완전히 구현에 의존합니다. 매개변수의 상세 및 사용 방법은 Intl.Collator() constructor (en-US)를 참조하세요.

  - 반환 값

    compareString 전에 referenceStr가 위치하는 경우 음수, compareString 후에 referenceStr가 위치하는 경우 양수, 동등할 경우 0이 됩니다.

```jsx
// "a"는 "c" 전에 위치하므로 음수 값을 반환
"a".localeCompare("c"); // -2 혹은 -1 (또는 다른 음수 값)

// 알파벳 순으로 단어 "check"는 "against"보다 뒤에 위치하므로 양수 값을 반환
"check".localeCompare("against"); // 2 혹은 1 (또는 다른 양수 값)

// "a"와 "a"는 서로 동등하므로 중립 값 0을 반환
"a".localeCompare("a"); // 0
```

```jsx
let items = ["réservé", "Premier", "Cliché", "communiqué", "café", "Adieu"];
items.sort((a, b) => a.localeCompare(b, "fr", { ignorePunctuation: true }));
// ['Adieu', 'café', 'Cliché', 'communiqué', 'Premier', 'réservé']
```

### String.prototype.lastIndexOf()

진 값과 일치하는 부분을 fromIndex로부터 역순으로 탐색하여, 최초로 마주치는 인덱스를 반환합니다. 일치하는 부분을 찾을 수 없으면 -1을 반환합니다.

- 사용법

  str.lastIndexOf(searchValue[, fromIndex])

  - 매개변수

    - searchValue

    탐색할 문자열. 빈 값을 제공할 경우 fromIndex를 반환합니다.

    - fromIndex (Optional)

    탐색의 시작점으로 사용할 인덱스. 기본값은 +Infinity입니다. fromIndex >= str.length인 경우 모든 문자열을 탐색합니다. fromIndex < 0인 경우엔 0을 지정한 것과 동일합니다.

```jsx
"canal".lastIndexOf("a"); //  3 반환
"canal".lastIndexOf("a", 2); //  1 반환
"canal".lastIndexOf("a", 0); // -1 반환
"canal".lastIndexOf("x"); // -1 반환
"canal".lastIndexOf("c", -5); //  0 반환
"canal".lastIndexOf("c", 0); //  0 반환
"canal".lastIndexOf(""); //  5 반환
"canal".lastIndexOf("", 2); //  2 반환
```

### String.prototype.charCodeAt()

지정된 인덱스에서 UTF-16 코드 단위를 나타내는 정수 String를 반환합니다 .

- 사용법

  charCodeAt(index)

```jsx
"ABC".charCodeAt(0); // returns 65
```

### String.prototype.fromCharCode()

지정된 UTF-16 코드 단위 시퀀스에서 생성된 문자열을 반환합니다.

- 사용법

  String.fromCharCode()
  String.fromCharCode(num1)
  String.fromCharCode(num1, num2)
  String.fromCharCode(num1, num2, /_ …, _/ numN)

```jsx
String.fromCharCode(65, 66, 67); // returns "ABC"
```

### String.prototype.charAt()

charAt() 함수는 문자열에서 특정 인덱스에 위치하는 유니코드 단일문자를 반환합니다.

- 사용법

  str.charAt(index);

```jsx
var anyString = "Brave new world";
console.log("The character at index 0   is '" + anyString.charAt() + "'");
// No index was provided, used 0 as default

console.log("The character at index 0   is '" + anyString.charAt(0) + "'");
console.log("The character at index 1   is '" + anyString.charAt(1) + "'");
console.log("The character at index 2   is '" + anyString.charAt(2) + "'");
console.log("The character at index 3   is '" + anyString.charAt(3) + "'");
console.log("The character at index 4   is '" + anyString.charAt(4) + "'");
console.log("The character at index 999 is '" + anyString.charAt(999) + "'");

// The character at index 0   is 'B'
// The character at index 1   is 'r'
// The character at index 2   is 'a'
// The character at index 3   is 'v'
// The character at index 4   is 'e'
// The character at index 999 is ''
```

### String.prototype.concat()

매개변수로 전달된 모든 문자열을 호출 문자열에 붙인 새로운 문자열을 반환합니다.

- 사용법

  str.concat(string2, string3[, ..., stringN])

```jsx
var hello = "Hello, ";
console.log(hello.concat("Kevin", ". Have a nice day."));
/* Hello, Kevin. Have a nice day. */

var greetList = ["Hello", " ", "Venkat", "!"];
"".concat(...greetList); // "Hello Venkat!"

"".concat({}); // [object Object]
"".concat([]); // ""
"".concat(null); // "null"
"".concat(true); // "true"
"".concat(4, 5); // "45"
```

### String.prototype.replace()

a 와 일치하는 항목 중 하나 또는 전부가 a 로 대체된 String 새 문자열을 반환합니다. a는 문자열 또는 가 될 수 있으며 , a는 각 일치 항목에 대해 호출되는 문자열 또는 함수가 될 수 있습니다. 문자열인 경우 첫 번째 항목만 대체됩니다. 원래 문자열은 변경되지 않고 그대로 유지됩니다.

- 사용법

  replace(pattern, replacement)

  - 매개변수

    - pattern

      문자열이거나 Symbol.replace메소드가 있는 객체일 수 있습니다. 일반적인 예는 정규 표현식 입니다 . 메서드 가 없는 모든 값은 Symbol.replace문자열로 강제 변환됩니다.

    - replacement

      문자열일 수도 있고 함수일 수도 있습니다.

      문자열인 경우 와 일치하는 하위 문자열을 대체합니다 pattern. 다양한 특수 교체 패턴이 지원됩니다. 아래의 대체 문자열로 문자열 지정 섹션을 참조하세요 .
      함수인 경우 일치하는 모든 항목에 대해 호출되며 해당 반환 값은 대체 텍스트로 사용됩니다. 이 함수에 제공되는 인수는 아래 대체 함수로 함수 지정 섹션에 설명되어 있습니다.

```jsx
const paragraph = "I think Ruth's dog is cuter than your dog!";

console.log(paragraph.replace("Ruth's", "my"));
// Expected output: "I think my dog is cuter than your dog!"

const regex = /Dog/i;
console.log(paragraph.replace(regex, "ferret"));
// Expected output: "I think Ruth's ferret is cuter than your dog!"
```

### String.prototype.repeat()

문자열을 주어진 횟수만큼 반복해 붙인 새로운 문자열을 반환합니다.

- 사용법

  str.repeat(count);

  - 매개변수

    - count

      문자열을 반복할 횟수. 0과 양의 무한대 사이의 정수.

```jsx
"abc".repeat(-1); // RangeError
"abc".repeat(0); // ''
"abc".repeat(1); // 'abc'
"abc".repeat(2); // 'abcabc'
"abc".repeat(3.5); // 'abcabcabc' (count will be converted to integer)
"abc".repeat(1 / 0); // RangeError

({ toString: () => "abc", repeat: String.prototype.repeat }).repeat(2);
// 'abcabc' (repeat() is a generic method)
```

### String.prototype.split()

지정한 구분자를 이용하여 여러 개의 문자열로 나눕니다.

- 사용법

  split();
  split(separator);
  split(separator, limit);

  - 매개변수

    - separator Optional

      원본 문자열을 끊어야 할 부분을 나타내는 문자열을 나타냅니다. 실제 문자열이나 정규표현식을 받을 수 있습니다. 문자열 유형의 separator가 두 글자 이상일 경우 그 부분 문자열 전체가 일치해야 끊어집니다. separator가 생략되거나 str에 등장하지 않을 경우, 반환되는 배열은 원본 문자열을 유일한 원소로 가집니다. separator가 빈 문자열일 경우 str의 각각의 문자가 배열의 원소 하나씩으로 변환됩니다.

    - limit Optional

      끊어진 문자열의 최대 개수를 나타내는 정수입니다. 이 매개변수를 전달하면 split() 메서드는 주어진 separator가 등장할 때마다 문자열을 끊지만 배열의 원소가 limit개가 되면 멈춥니다. 지정된 한계에 도달하기 전에 문자열의 끝까지 탐색했을 경우 limit개 미만의 원소가 있을 수도 있습니다. 남은 문자열은 새로운 배열에 포함되지 않습니다.

```jsx
var myString = "Hello World. How are you doing?";
var splits = myString.split(" ", 3);

console.log(splits);
//    ["Hello", "World.", "How"]
```

### String.prototype.slice()

문자열의 일부를 추출하면서 새로운 문자열을 반환합니다.

- 사용법

  str.slice(beginIndex[, endIndex])

  - 매개변수

    - beginIndex

      추출 시작점인 0부터 시작하는 인덱스입니다. 만약 음수라면, beginIndex는 strLength(문자열 길이) + beginIndex로 취급됩니다. (예를 들어 beginIndex가 -3이면 시작점은 strLength - 3).
      만약 beginIndex가 strLength 보다 크거나 같은 경우, slice()는 빈 문자열을 반환합니다.

    - endIndexOptional

      0부터 시작하는 추출 종료점 인덱스로 그 직전까지 추출됩니다. 인덱스 위치의 문자는 추출에 포함되지 않습니다.
      만약 endIndex가 생략된다면, slice()는 문자열 마지막까지 추출합니다. 만약 음수라면, endIndex는 strLength(문자열 길이) + endIndex 로 취급됩니다(예를 들어 endIndex가 -3이면 종료점은 strLength - 3).

```jsx
var str1 = "The morning is upon us.", // the length of str1 is 23.
  str2 = str1.slice(1, 8),
  str3 = str1.slice(4, -2),
  str4 = str1.slice(12),
  str5 = str1.slice(30);
console.log(str2); // OUTPUT: he morn
console.log(str3); // OUTPUT: morning is upon u
console.log(str4); // OUTPUT: is upon us.
console.log(str5); // OUTPUT: ""
```

### String.prototype.toLowerCase()

문자열을 소문자로 변환해 반환합니다.

- 사용법

  str.toLowerCase();

```jsx
console.log("ALPHABET".toLowerCase()); // 'alphabet'
```

### String.prototype.toUpperCase()

문자열을 대문자로 변환해 반환합니다.

- 사용법

  str.toUpperCase();

```jsx
console.log("alphabet".toUpperCase()); // 'ALPHABET'
```

### String.prototype.substring()

시작 인덱스로 부터 종료 인덱스 전 까지 문자열의 부분 문자열을 반환합니다.

- 사용법

  .substring(indexStart[, indexEnd])

  - 매개변수

    - indexStart

      반환문자열의 시작 인덱스

    - indexEnd

      옵션. 반환문자열의 마지막 인덱스 (포함하지 않음.)

```jsx
var str = "abcdefghij";

console.log("(1, 2): " + str.substr(1, 2)); // '(1, 2): bc'
console.log("(-3, 2): " + str.substr(-3, 2)); // '(-3, 2): hi'
console.log("(-3): " + str.substr(-3)); // '(-3): hij'
console.log("(1): " + str.substr(1)); // '(1): bcdefghij'
console.log("(-20, 2): " + str.substr(-20, 2)); // '(-20, 2): ab'
console.log("(20, 2): " + str.substr(20, 2)); // '(20, 2): '
```
