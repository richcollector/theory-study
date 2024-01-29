## Static Routing, Dynamic Routing

### 정적라우팅(static routing)

```jsx
const router = useRouter();
router.push("이동할 경로"); // 정적 라우팅
```

- 관리자가 직접 라우팅 테이블에 경로를 설정
- 사전에 지정된 주소로 이동하는 방법
- 네트워크 환경 변화와는 무관하게 항상 같은 경로로만 라우팅 경로의 설정 및 유지 => 고정적이므로, 만약 토폴로지 변화 때 수동으로 직접 작업해야합니다.

- 장점

  보안이 높고 cpu 부담이 적음

- 단점

  대규모 네트워크의 경우 관리자가 직접 라우팅 테이블에 경로를 설정하는 것에 대한 부담

### 동적라우팅(dynamic routing)

```jsx
const router = useRouter()
router.push(`이동할 경로/${동적으로 변할 부분}`) // 동적 라우팅
```

- 라우팅 프로토콜에 의해서 경로를 자동으로 설정하는 과정

- 장점

  최적 경로 자동 설정

- 단점

  라우터 토폴리지가 변경이 될 때 변경사항을 다른 모든 라우터에게 정송

### 라우터 객체

라우터는 라우팅을 하는 녀석으로, 페이지 이동과 관련된 기능을 가지고 있는 객체
이 객체들을 이용해서 A페이지에서 B페이지로 이동할 때 'B페이지로 라우팅한다' 라고 합니다.

```jsx
next/Router 모듈에서 useRouter 훅을 불러와 사용할 수 있다.
import { useRouter } from 'next/router' //useRouter를 import 해서 사용
```

### 용어공부

- 토폴로지

  컴퓨터 네트워크의 요소(링크, 노드)들을 물리적으로 연결해 놓은 것, 또는 그 연결 방식을 말합니다.
  `/page/number/[폴더명]`
  [ ] 대괄호로 폴더명을 감싸면 해당 페이지는 동적으로 경로가 지정되는 페이지가 되며 [ ] 안에 동적 페이지가 존재하는 경로에 임의의 주소를 대입하면 대입한 주소를 쿼리명으로 갖는 페이지로 이동합니다.

### 참고자료

- [Static Routing & Dynamic Routing](https://velog.io/@hjthgus777/08-%EC%A0%95%EC%A0%81%EB%9D%BC%EC%9A%B0%ED%8C%85-%EB%8F%99%EC%A0%81%EB%9D%BC%EC%9A%B0%ED%8C%85)
