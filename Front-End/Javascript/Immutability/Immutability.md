## Javascript 불변성

자바스크립트에서 불변성이란 객체가 생성된 이후 그 상태를 변경할 수 없는 것을 의미합니다.
여기서 상태를 변경할 수 있는 것과 값을 재할당하는 것은 다르다는 것을 알아야합니다.

```jsx
let a = 10;
let b = a;
a = 20;
console.log(a, b); //20 10
```

위의 코드는 a에 10을 할당하고 b를 a가 가리키는 주소를 가리킵니다.
이때 a의 값을 20으로 변경시켜줍니다.

만약 값을 직접 변경하는 것이라면 a와 b가 둘다 20을 출력해야합니다.

하지만 자바스크립트에서 Number값은 불변성을 유지하기 때문에 새롭게 20이라는 값을 가지는 주소를 a에 할당하게 되기 때문에 위와 같은 결과가 나오게 됩니다.

### immutable vs mutable

자바스크립트에서는 불변성을 유지하는 값들과 그렇지 않은 값들이 나누어져 있습니다.

Boolean, Number, String, null, undefined, Symbol과 같은 타입들은 불변성을 유지하는 타입들이고 Object타입들은 변경가능한 값들입니다.

이 말은 객체는 객체 내부의 값을 변경하면 객체를 참조하고 있는 다른 값들도 다 같이 변경된다는 의미입니다.

```jsx
var coke = {
  name: "coca",
  price: 2980,
};
var new_coke = coke;
coke.name = "pepsi";
console.log(coke.name, new_coke.name); //'pepsi' 'pepsi'
```

위와 같이 coke의 name값을 변경했는데 new_coke의 name까지 한번에 변경된 것을 볼 수 있습니다.

### 객체의 불변성 지키기

#### 스프레드 문법 사용

```jsx
var coke = {
  name: "coca",
  price: 2980,
};
var new_coke = { ...coke };
coke.name = "pepsi";
console.log(coke.name, new_coke.name); //'pepsi' 'coca'
```

스프레드 문법을 사용하여 객체를 복사해야지 객체가 불변성을 유지할 수 있습니다.
하지만 스프레드 문법은 1레벨 깊이에서만 유효하게 동작하기 때문에 객체 내부의 객체의 불변성까지는 유지할수 없습니다.

```jsx
var coke = {
  name: "coca",
  fake: {
    name: "pepsi",
  },
};
var new_coke = { ...coke };
coke.fake.name = "coca zero";
console.log(coke.fake.name, new_coke.fake.name);
//'coca zero' 'coca zero'
```

만약 레벨2 객체까지 불변성을 유지해주려면 아래와 같이 별도의 변수에 값을 재할당하고 넣어주는 번거러운 과정을 거쳐야 합니다.

```jsx
const coke = {
  name: "coca",
  fake: {
    name: "pepsi",
  },
};
const new_fake = { ...coke.fake };
const new_coke = { ...coke };
new_coke.fake = new_fake;
coke.fake.name = "coca zero";
console.log(coke.fake.name, new_coke.fake.name);
//'coca zero' 'pepsi'
```

### 참고자료

- [[JS] 불변성(Immutability)](https://velog.io/@co_mong/JS-%EB%B6%88%EB%B3%80%EC%84%B1Immutability)
