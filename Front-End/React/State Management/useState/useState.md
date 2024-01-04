## useState

값을 반환을 하는 데 2개의 값을 항상 동시에 반환한다.
그 두 개의 값은 항상 [현재 state, state 를 변경하기 위한 함수]이다.

우리는 이것을 대부분 const [fooBar, setFooBar] = useState() 이렇게 받아서 쓴다.
즉, fooBar 이 state 그 자체인 것이고, setFooBar 은 이 state를 변경할 때 사용하는 함수인 것이다.

근데 아래와 같은 문법은 조금 새로울 것이다.
const foo = useState() 이 문법도 전혀 문제가 없다.

단지 우리가 기존에 [fooBar, setFooBar] 이라는 배열을 destructure (분리) 해서 받지 않고, 한꺼번에 먼저 받는 것일 뿐이다.
즉, 현재 상태에서 foo 라는 변수 안에는 배열이 들어가 있는데, 그 배열의 첫 번째 항목이 fooBar (즉, 현재 state), 두 번째 항목이 setFooBar (즉, state 를 바꿀 수 있는 함수) 인 것이다.

### useState 가 너무 많아져요!

state 는 아주 흔하게 쓰이는 react hook 이다 보니 useState() 가 하나의 컴포넌트 내에서 3-4개 이상씩도 쓰이는 경우가 있다.

```jsx
// 사용자의 이름, 나이, 학교를 보여주는 카드 컴포넌트

function UserCard() {
  const [name, setName] = useState("홍길동");
  const [age, setAge] = useState(20);
  const [school, setSchool] = useState("민국대학교");

  return (
    <div>
      <h1>이름: {name}</h1>
      <h2>나이: {age}</h2>
      <h3>학교: {school}</h3>
      <button
        onClick={() => {
          setName("홍길순");
          setAge("22");
          setSchool("한국대학교");
        }}
      >
        사람 변경
      </button>
    </div>
  );
}
```

매번 사람의 데이터를 변경할 때 마다 set~ 를 세 번씩, 각각 name, age, school 에 대해서 한 번씩 불러주어야 한다.
언뜻 보면 뭔가 반복되는 action 이 많아서 안 좋은 방법일 것 같은데, react 공식 문서에 따르면 이 방식은 나쁜 방식이 아니다.
나쁜 방식은 아니지만, 또 다른 방식도 존재한다. 이렇게 처음부터 object 하나에 필요한 요소들을 모두 정의하는 방식이다.
아래의 코드를 보자.

```jsx
function UserCardSquashed() {
  const [user, setUser] = useState({
    name: "홍길동",
    age: 20,
    school: "민국대학교",
  });

  return (
    <div>
      <h1>이름: {user.name}</h1>
      <h2>나이: {user.age}</h2>
      <h3>학교: {user.school}</h3>
      <button
        onClick={() => {
          setUser({
            name: "홍길순",
            age: 22,
            school: "한국대학교",
          });
        }}
      >
        사람 변경
      </button>
    </div>
  );
}
```

이것도 똑 같은 로직을 수행한다. 그러나 setUser 에서 한 번만 상태 변경을 해 주면 된다는 점이 다르다.
근데 만약 홍길순이라는 사람의 나이가 홍길동과 같아서 나이는 20에서 변경시킬 필요가 없다고 하자.

```jsx
function UserCardSquashed() {
  const [user, setUser] = useState({
    name: "홍길동",
    age: 20,
    school: "민국대학교",
  });

  return (
    <div>
      <h1>이름: {user.name}</h1>
      <h2>나이: {user.age}</h2>
      <h3>학교: {user.school}</h3>
      <button
        onClick={() => {
          setUser({
            name: "홍길순",
            // age 삭제
            school: "한국대학교",
          });
        }}
      >
        사람 변경
      </button>
    </div>
  );
}
```

위의 코드처럼 사용하면 안 된다.
useState 는 아예 새로운 객체로 바꿔 끼워 버리기 때문에 이럴 경우 age 에 해당하는 값이 존재하지 않기 때문에 user.age 에서 값을 가져올 수 없어 빈 칸이 되어 버린다.
즉, 이렇게 객체로 state 를 이용할 경우, 기존의 값들을 다시 한 번 가져와 주어야 하는 번거로움이 생긴다.
아래와 같이, 기존 user 을 spread 시킨 다음 변경을 원하는 값들을 다시 적어주면 override 가 되면서 변경하지 않을 값은 이전의 상태에서 가져올 수가 있게 된다.

```jsx
function UserCardSquashed() {
  const [user, setUser] = useState({
    name: "홍길동",
    age: 20,
    school: "민국대학교",
  });

  return (
    <div>
      <h1>이름: {user.name}</h1>
      <h2>나이: {user.age}</h2>
      <h3>학교: {user.school}</h3>
      <button
        onClick={() => {
          setUser({
            ...user,
            name: "홍길순",
            school: "한국대학교",
          });
        }}
      >
        사람 변경
      </button>
    </div>
  );
}
```

상황에 따라 하나의 object 로 묶을 만한 것이면 묶는 것이 더 좋을 수도 있다.
관련도가 낮은 항목들을, 단순히 개수만 많다는 이유로 object 로 묶게 되면, custom hook 으로의 분리가 어려워지며, 코드의 가독성이 오히려 떨어질 수도 있다.

### useState 사용 시 주의할 점

다른 모든 React hook 들에도 적용되는 주의점이기도 하다.
React hook 은 반드시 다음 조건들을 지켜야 한다.

- 반드시 컴포넌트 최상단 층위에서만 불러야 한다. 즉, 다음과 같은 useState() 는 허용되지 않는다.

```jsx
// 잘못 사용된 예

function App() {
  if (foo) {
    const [bar, setBar] = useState(0); // 조건문 안에서 hook 이 불림.
  }
}
// 잘못 사용된 예

function App() {
  while (foo) {
    const [bar, setBar] = useState(0); // 반복문 안에서 hook 이 불림.
  }
}
```

2. React '함수형' 컴포넌트 내부에서만 불러야 한다.

   앞서 본 class 형 컴포넌트의 경우 hook 없이도 원래 잘 작동해왔고, 해당 로직을 지금도 계속 이용한다.
   따라서 (거의 현재로서는 쓸 일은 없겠지만, ) class 형 컴포넌트 안에서 다음과 같이 hook을 사용해서는 안 된다.

```jsx
// 잘못 사용된 예

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    const [bar, setBar] = useState(0) // class 형 컴포넌트 안에서 hook 이 불림.
    render() {
        return (
            <div>Hello, World!</div>
        );
    }
}
```

### setState

state의 값을 바꾸면 기본적으로 리렌더링이 되지만, 불필요한 리렌더링을 방지하기 위해 임시저장공간에 함수값들을 저장하고 마지막에 1번 실행된다. 함수가 끝나야 값이 저장이 된다.
