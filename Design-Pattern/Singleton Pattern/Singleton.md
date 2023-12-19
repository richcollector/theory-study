## Singleton pattern

소프트웨어 디자인 패턴에서 싱글턴 패턴(Singleton pattern)을 따르는 클래스는, 생성자가 여러 차례 호출되더라도 실제로 생성되는 객체는 하나이고 최초 생성 이후에 호출된 생성자는 최초의 생성자가 생성한 객체를 리턴한다. 이와 같은 디자인 유형을 싱글턴 패턴이라고 합니다. 주로 공통된 객체를 여러개 생성해서 사용하는 DBCP(DataBase Connection Pool)와 같은 상황에서 많이 사용됩니다.

간단히 설명하면 싱글톤 패턴은 객체의 인스턴스를 한개만 생성되게 하는 패턴입니다.

이러한 패턴은 주로 프로그램 내에서 하나로 공유를 해야하는 객체가 존재할 때 해당 객체를 싱글톤으로 구현하여 모든 유저 또는 프로그램들이 해당 객체를 공유하며 사용하도록 할 때 사용됩니다.

- 프로그램 내에서 하나의 객체만 존재해야 합니다.
- 프로그램 내에서 여러 부분에서 해당 객체를 공유하여 사용해야합니다.

### 싱글톤 패턴을 사용하는 이유

- 메모리 측면의 이점

  싱글톤 패턴을 사용하게 된다면 한개의 인스턴스만을 고정 메모리 영역에 생성하고 추후 해당 객체를 접근할 때 메모리 낭비를 방지할 수 있습니다.

2. 속도 측면의 이점

   생성된 인스턴스를 사용할 때는 이미 생성된 인스턴스를 활용하여 속도 측면에 이점이 있습니다.

3. 쉬운 데이터 공유

   전역으로 사용하는 인스턴스이기 때문에 다른 여러 클래스에서 데이터를 공유하며 사용할 수 있습니다. 하지만 동시성 문제가 발생할 수 있어 이 점은 유의하여 설계하여야 합니다.

### 싱글톤 패턴 구현하기

- 가장 간단한 싱글톤은 객체 리터럴의 이용

  동일한 키와 값을 똑같이 지정했더라도 참조하는 주소값이 다르기 때문에
  plus와 minus는 각각 유일하게 존재하는 서로 다른 객체입니다.

```jsx
const plus = { a: 1, b: 2 };
const minus = { a: 1, b: 2 };
```

- 비공개된 프로퍼티나 함수를 정의
  클로저(closure)를 사용해야 하고, 아래처럼 IIFE(즉시 실행 함수)로 비공개 변수를 가질 수 있게 만들어주면 됩니다.

  비공개 함수 init()의 return문에서 객체 리터럴로 정의되는 인스턴스가 싱글톤 객체입니다. SingletonClass 내부에 있는 getInstance 메서드는 생성된 인스턴스가 있으면 이미 생성된 객체를 리턴하고, 아니라면 객체를 생성해서 리턴합니다. 즉 객체를 여러번 생성하더라도 각자 다른 객체가 아니라 한 개의 동일한 객체를 가리키게 되는 것입니다.

  싱글톤 패턴에서는 이미 객체가 생성되었는지 여부를 판단하는 instance와 같은 내부 변수가 필요합니다. 클로저를 통해 getInstance 메서드가 호출되는 시점에 instance의 값에 접근할 수 있고, getInstance의 호출이 끝나더라도 변경된 instance의 값은 유지됩니다.

```jsx
const SingletonClass = (function () {
  let instance;

  function init() {
    // 싱글톤 객체를 리턴할 비공개 함수
    return {
      publictMethod: function () {
        return "public method";
      },
      publicProp: "public variable",
    };
  }

  return {
    getInstance: function () {
      if (instance) {
        return instance; // 있으면 그냥 반환
      }
      instance = init();
      return instance; // 없으면 객체 생성 후 반환 (이해를 위해 명시적으로 나눔)
    },
  };
})();

const a = SingletonClass.getInstance();
console.log(a.publicProp, "a"); // 'public variable'

const b = SingletonClass.getInstance();
console.log(a === b); // true
```

### 결론

싱글톤 패턴은 메모리, 속도, 데이터 공유 측면에서 이점이 있습니다. 하지만 그렇다고 해서 싱글톤 패턴이 무조건 좋은 것은 아닙니다. 앞서 말했듯이 multi-thread환경에서는 동시성 문제가 발생할 수 있기에 싱글톤 패턴을 사용하고자 한다면 사용하기 앞서 "해당 객체의 인스턴스가 한 개만 존재하여야 하는지?"의 여부와 "사용을 하였을 때의 동시성 문제가 발생하지 않는지"를 체크를 하며 사용해야 할 것 같습니다.

### 참고자료

- [싱글톤(Singleton) 패턴이란?](https://velog.io/@seongwon97/%EC%8B%B1%EA%B8%80%ED%86%A4Singleton-%ED%8C%A8%ED%84%B4%EC%9D%B4%EB%9E%80)
