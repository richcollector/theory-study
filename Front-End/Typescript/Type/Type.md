## Type

### 타입 추론

- Type이 지정 되지 않았을 때 변수에 마우스를 올려보면 Typescript가 타입을 추론하여 알려준다.

  ex) let aaa: string

```jsx
let aaa = "안녕하세요";
aaa = "";

let bbb: string = "반갑습니다";
bbb = "10";

//타입 명시가 필요한 상황
let ccc: number | string = 1000;
ccc = "1000원";
```

### 숫자타입

```jsx
let ddd: number = 10;
ddd = 1;
```

### 불린 타입

```jsx
let eee: boolean = true;
eee = false;
eee = "false"; //true로 작동
```

### 배열 타입

```jsx
let fff: number[] = [1, 2, 3, 4, 5];
let ggg: string[] = ["철수", "영희", "훈이"];
let hhh = ["철수", 10]; //타입이 궁금하면 타입추론해서 어떤 타입을 사용하는지 알아보기
```

### 객체 타입

```jsx
interface IProfile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string;
}
//?있어도 되고 없어도 되는 것들 사용할 때

const profile: IProfile = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
};

//타입추론으로 위의 것들만 가능
profile.name = "훈이";
profile.age = 9;
profile.hobby = "완이";
```

### any타입 : 자바스크립트와 동일

```jsx
let qqq: any = "철수";
qqq = 123;
qqq = true;
```

### 함수타입

```jsx
function add(num1: number, num2: number, unit: string): string {
  return num1 + num2 + unit;
}

// return type을 정하여 자동으로 result 타입이 정해짐.
const result = add(100, 2000, "원");

const add2 = (num1: number, num2: number, unit: string): string => {
  return num1 + num2 + unit;
};

// return type을 정하여 자동으로 result 타입이 정해짐.
const result2 = add2(100, 2000, "원");
```
