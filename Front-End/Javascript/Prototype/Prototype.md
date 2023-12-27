## Prototype

사전 검색을 해보면 한국어로는 원형정도로 번역되는 prototype은 말 그대로 객체의 원형이라고 할 수 있습니다.자바스크립트에서 함수는 객체입니다. 그러므로 생성자로 사용될 함수도 객체입니다. 객체는 프로퍼티를 가질 수 있는데 prototype이라는 프로퍼티는 그 용도가 약속되어 있는 특수한 프로퍼티로서 prototype에 저장된 속성들은 생성자를 통해서 객체가 만들어질 때 그 객체에 연결됩니다.

### Prototype vs Class

클래스(Class)라는 것은 Java, Python, Ruby등 객체지향언어에서 빠질 수 없는 개념입니다. 그런데 중요한 점은 자바스크립트도 객체지향언어라는 것입니다. 자바스크립트에는 클래스라는 개념이 없었지만, 최근의 ECMA6 표준에서는 Class 문법이 추가되었습니다. 하지만 문법이 추가되었다는 것이지, 자바스크립트가 클래스 기반으로 바뀌었다는 것은 아닙니다.

자바스크립트에는 프로토타입(Prototype)이라는 것이 존재합니다. 클래스가 없었으니 기본적으로 상속기능도 없었습니다. 그래서 보통 프로토타입을 기반으로 상속을 흉내 내도록 구현해 사용합니다.

### 사용법

그럼 프로토타입을 언제 쓰는지 알아봅시다.
자바스크립트에 클래스는 없지만 함수(function)와 new를 통해 클래스를 비슷하게 흉내 낼 수 있습니다.

```jsx
function Person() {
  this.eyes = 2;
  this.nose = 1;
}

var kim = new Person();
var park = new Person();

console.log(kim.eyes); // => 2
console.log(kim.nose); // => 1

console.log(park.eyes); // => 2
console.log(park.nose); // => 1
```

kim과 park은 eyes와 nose를 공통적으로 가지고 있는데, 메모리에는 eyes와 nose가 두 개씩 총 4개 할당됩니다. 객체를 100개 만들면 200개의 변수가 메모리에 할당되겠죠? 바로 이런 문제를 프로토타입으로 해결할 수 있습니다.

```jsx
function Person() {
...
}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

var kim = new Person();
var park = new Person();

console.log(kim.eyes); // => 2
```

Person.prototype이라는 빈 Object가 어딘가에 존재하고, Person 함수로부터 생성된 객체(kim, park)들은 어딘가에 존재하는 Object에 들어있는 값을 모두 갖다 쓸 수 있습니다.즉, eyes와 nose를 어딘가에 있는 빈 공간에 넣어놓고 kim과 park이 공유해서 사용하는 것 입니다.

### Prototype Link와 Prototype Object

자바스크립트에는 Prototype Link와 Prototype Object라는 것이 존재합니다. 그리고 이 둘을 통틀어 Prototype이라고 부릅니다.

#### Prototype Object

객체는 언제나 함수(Function)로 생성됩니다.

```jsx
function Person() {} // => 함수

var personObject = new Person(); // => 함수로 객체를 생성
```

personObject 객체는 Person이라는 함수로 생성된 객체입니다. 이렇듯 언제나 객체는 함수에서 시작됩니다.

```jsx
var obj = {};
```

얼핏 보면 함수랑 전혀 상관없는 코드로 보이지만 위 코드는 사실 다음 코드와 같습니다.

```jsx
var obj = new Object();
```

위 코드에서 Object가 자바스크립트에서 기본적으로 제공하는 함수입니다.

Object도 함수입니다. Object와 마찬가지로 Function, Array도 모두 함수로 정의되어 있습니다. 이것이 첫 번째 포인트입니다.
그렇다면 이것이 Prototype Object랑 무슨 상관이 있느냐? 함수가 정의될 때는 2가지 일이 동시에 이루어집니다.

- 해당 함수에 Constructor(생성자) 자격 부여

  Constructor 자격이 부여되면 new를 통해 객체를 만들어 낼 수 있게 되는데 이것이 함수만 new 키워드를 사용할 수 있는 이유입니다.

constructor가 아니면 new를 사용할 수 없습니다.

- 해당 함수의 Prototype Object 생성 및 연결

  함수를 정의하면 함수만 생성되는 것이 아니라 Prototype Object도 같이 생성이 됩니다.

함수를 정의하면 이렇게 됩니다 그리고 생성된 함수는 prototype이라는 속성을 통해 Prototype Object에 접근할 수 있습니다. Prototype Object는 일반적인 객체와 같으며 기본적인 속성으로 constructor와 **proto**를 가지고 있습니다.

prototype 속성으로 Prototype Object에 접근하면 constructor는 Prototype Object와 같이 생성되었던 함수를 가리키고 있습니다. 여기에서 **proto**는 Prototype Link입니다.

이제 위에서 kim과 park이 나왔던 예제를 다시 보겠습니다.

```jsx
function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

var kim = new Person();
var park = new Person():

console.log(kim.eyes); // => 2
```

Person.prototype 객체에 eyes와 nose 속성이 추가되었습니다.
Prototype Object는 일반적인 객체이므로 속성을 마음대로 추가/삭제 할 수 있습니다. kim과 park은 Person 함수를 통해 생성되었으니 Person.prototype을 참조할 수 있게 됩니다. 함수가 정의될 때 이루어지는 일들을 이해하는 것이 두 번째 포인트, Prototype Object를 이해하는 것이 세 번째 포인트입니다.

#### Prototype Link

kim에는 eyes라는 속성이 없는데도 kim.eyes를 실행하면 2라는 값을 참조하는 것을 볼 수 있습니다. 위에서 설명했듯이 Prototype Object에 존재하는 eyes 속성을 참조한 것인데, 바로 kim이 가지고 있는 딱 하나의 속성 **proto**가 그것을 가능하게 해주는 열쇠입니다.

prototype 속성은 함수만 가지고 있던 것과는 달리(Person.prototype 기억나시죠?) **proto**속성은 모든 객체가 빠짐없이 가지고 있는 속성입니다.
**proto**는 객체가 생성될 때 조상이었던 함수의 Prototype Object를 가리킵니다. kim객체는 Person함수로부터 생성되었으니 Person 함수의 Prototype Object를 가리키고 있는 것입니다.
**proto**를 열어 보니 역시 Person 함수의 Prototype Object를 가리키고 있었습니다.

- 객체, 함수, Prototype Object의 관계

kim객체가 eyes를 직접 가지고 있지 않기 때문에 eyes 속성을 찾을 때까지 상위 프로토타입을 탐색합니다. 최상위인 Object의 Prototype Object까지 도달했는데도 못 찾았을 경우 undefined를 리턴합니다. 이렇게 **proto**속성을 통해 상위 프로토타입과 연결되어있는 형태를 프로토타입 체인(Chain)이라고 합니다.

- 프로토타입 체인, 최상위는 Object

  이런 프로토타입 체인 구조 때문에 모든 객체는 Object의 자식이라고 불리고, Object Prototype Object에 있는 모든 속성을 사용할 수 있습니다. 한 가지 예를 들면 toString함수가 있겠습니다.

Object속성인 toString함수를 kim도 사용가능합니다. **proto**와 프로토타입 체인을 이해하는 것이 네 번째 포인트입니다.

### 결론

자바스크립트는 프로토타입 기반 언어입니다.
객체의 원형, 즉 객체의 부모가 가지는 유전자 즉, 상속받은 데이터, 메서드 등

함수 객체에는 프로토타입이라는 특수한 유형의 객체 프로퍼티(속성)가 존재합니다.
(객체와 프로터티가 같은 의미가 아닙니다.)

이러한 prototype 프로퍼티를 통해 생성자 함수는 인스턴스에게 프로토타입 객체에 있는 데이터, 메소드를 상속합니다. (인스턴스는 사용 가능합니다.)

인스턴스 객체의 key에 접근할 때, 해당 객체에게 key가 없다면 그 다음으로 상위 프로토타입(원형) 속성에서 key가 있는지 확인합니다.
없다면 그것을 찾기 위해 더 상위의 프로토타입(부모)에서 찾는데 이것을 프로토타입 체인이라고 합니다. (자바스크립의 실행컨텍스트 에서 스코프 체인 기능이 같습니다.)

### 참고자료

- [프로토타입(Prototype) 이해하기](https://whales.tistory.com/136)
