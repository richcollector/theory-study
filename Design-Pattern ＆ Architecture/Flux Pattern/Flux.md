## Flux 패턴

Flux 패턴은 2014년 페이스북 F8 컨퍼런스에서 발표된 아키텍처로, Client-Side 웹 애플리케이션을 만들기 위해 사용하는 디자인 패턴입니다.

- 등장 배경

페이스북은 왜 Flux 패턴이 필요했던 걸까요? 그 답은 대규모 애플리케이션에서 데이터 흐름을 일관성 있게 관리함으로써 프로그램의 **예측가능성(Predictability)을 높이기 위함**이었습니다.

![](./img/mvc.png)

### MVC 패턴

MVC는 Model, View, Controller의 약자입니다. Model에 데이터를 저장하고, Controller를 이용하여 Model의 데이터를 관리(CRUD)합니다. Model의 데이터가 변경되면 View로 전달되어 사용자에게 보여집니다. 또한 중요한 점은 사용자가 View를 통해 데이터를 입력하면 View 역시 Model을 업데이트할 수 있다는 점입니다. 즉 데이터가 양방향으로 흐를 수 있다는 것이죠.

애플리케이션의 규모가 커지고 커져서 다음과 같은 구조를 가지게 되었다고 생각해봅시다.

![](./img/mvc1.png)

View가 다양한 상호작용을 위해 여러 개의 Model을 동시에 업데이트하고 Model 역시 여러 개의 View에 데이터를 전달하는 상황이 발생합니다. 한 Model이 업데이트되면 그에 따라 View가 업데이트되고, 업데이트된 View가 또 다른 Model을 업데이트하는 식의 복잡한 데이터 흐름을 가지게 됩니다. 이렇게 많은 의존성을 가지면 Model의 개수가 많아질수록 각 Model에서 발생한 이벤트가 애플리케이션 전체로 퍼져나갈 때 이를 예측하기 힘들어 집니다.

페이스북은 “MVC는 정말 눈 깜짝할 사이에 복잡해진다”고 말하며 이 문제의 해결 방안으로 단방향 데이터 흐름을 가지는 Flux 패턴을 고안해냈습니다.

### Flux 패턴

Flux는 사용자 입력을 기반으로 Action을 만들고 Action을 Dispatcher에 전달하여 Store(Model)의 데이터를 변경한 뒤 View에 반영하는 단방향의 흐름으로 애플리케이션을 만드는 아키텍처입니다. 구조는 다음의 그림과 같습니다.

![](./img/flux.png)

- Action

  데이터를 변경하는 행위로서 Dispatcher에게 전달되는 객체를 말합니다. Action creator 메서드는 새로 발생한 Action의 타입(type)과 새로운 데이터(payload)를 묶어 Dispatcher에게 전달합니다.

```jsx
{
type: 'SET_PROFILE',
data: {
'name': 'Harry',
'age': 458
}
}
```

- Dispatcher

  모든 데이터의 흐름을 관리하는 중앙 허브입니다. Dispatcher에는 Store들이 등록해놓은 Action 타입마다의 콜백 함수들이 존재합니다. Action을 감지하면 Store들이 각 타입에 맞는 Store의 콜백 함수를 실행합니다. Store의 데이터를 조작하는 것은 오직 Dispatcher를 통해서만 가능합니다. 또한 Store들 사이에 의존성이 있는 상황에서도 순서에 맞게 콜백 함수를 순차적으로 처리할 수 있도록 관리합니다.

- Store (Model)

  상태 저장소로서 상태와 상태를 변경할 수 있는 메서드를 가지고 있습니다. 어떤 타입의 Action이 발생했는지에 따라 그에 맞는 데이터 변경을 수행하는 콜백 함수를 Dispatcher에 등록합니다. Dispatcher에서 콜백 함수를 실행하여 상태가 변경되면 View에게 데이터가 변경되었음을 알립니다.

- View

  리액트 컴포넌트로 생각하면 됩니다. Store에서 View에게 상태가 변경되었음을 알려주면 최상위 View(Controller View)는 Store에서 데이터를 가져와 자식 View에게 내려보냅니다. 새로운 데이터를 받은 View는 화면을 리렌더링합니다. 또한 사용자가 View에 어떤한 조작을 하면 그에 해당하는 Action을 생성합니다.

![](./img/flux1.png)

각 요소들은 단방향 흐름에 따라 순서대로 역할을 수행하고, View로부터 새로운 데이터 변경이 생기면 처음부터 다시 이 순서대로 실행합니다. 이렇게 함으로써 예외 없이 데이터를 처리할 수 있게 되었습니다.

### 참고자료

- [Flux 패턴이란?](https://velog.io/@andy0011/Flux-%ED%8C%A8%ED%84%B4%EC%9D%B4%EB%9E%80)
