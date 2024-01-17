## CSS animation

transition과 비슷하게 다수의 스타일을 전환하는 애니메이션을 적용합니다. 단축속성(short hand)
`@keyframes` 규칙을 사용하여 세트를 만들고, 이를 animation에서 적용시킵니다.

### transition과 다른점

사용자의 action이 없어도 자동으로 동작하게 만들 수 있습니다.
한 가지의 상태로만 변환되는 것이 아니라 여러 상태를 거치며 변환시킬 수 있습니다.

```css
div {
  animation: name 2s linear infinite;
}
```

단축형식

- animation

  name | duration | timing-function | delay | iteration-count | direction | fill-mode;

name 은 필수 값이고, 순서들은 크게 상관 없으나, duration과 delay 순서는 맞춰야 합니다.

### 사용법

#### @keyframes

animation 중간 중간의 특정 지점들을 거칠 수 있는 키프레임들을 설정함으로써 CSS 애니메이션 과정의 중간 절차를 제어할 수 있게 합니다.

브라우저가 자동으로 처리하는것보다 세밀하게 조절할 수 있습니다.

시간에 따라 변환되므로 % 를 사용해 중간 지점들에 속성을 넣습니다.
**동일한 % 값이 여러번 입력될 경우 Cascading 법칙에 따라 아래쪽 속성만 적용됨을 주의해야합니다.**

키프레임은 순서대로 나열 가능하며, 지정된 %의 순서대로 처리됩니다.

최소한 from / to 혹은 0% / 100% 같은 시간에 대한 규칙은 포함해야 합니다.

작성된 키프레임 이름은 여러 요소에서 애니메이션으로 사용될 수 있습니다.

```css
/_ 두가지 상태만 적용할 경우 _/ @keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}

/_ 여러 상태들을 적용할 경우 _/ @keyframes identifier {
  0% {
    top: 0;
    left: 0;
  }
  30% {
    top: 50px;
  }
  68%,
  72% {
    left: 50px;
  }
  100% {
    top: 100px;
    left: 100%;
  }
}
```

두가지일때는 from { } 과 to { } 만 사용할수도 있습니다.
각 % { } 에 정의된 속성들이 하나의 적용되는 덩어리입니다.

#### animation-name

`@keyframes`에 선언된 애니메이션 이름을 호출해 적용할 수 있게 해줍니다.

@keyframes에 이름이 작성되어있지 않으면 값이 할당되지 않습니다.

a ~ z, 0 to 9, 언더바 (\_), 대시(-) 문자만 이름으로 사용이 가능합니다.
첫문자로 숫자는 올 수 없습니다.

#### animation-duration

애니메이션이 한 사이클을 완료하는 데 걸리는 시간을 지정합니다.

시간값은 양수 또는 0이어야하며 단위(s, ms)는 필수입니다.
기본값인 0의 값은 애니메이션이 작동하지 않아야 함을 나타냅니다.

transition의 duration과 동일합니다.

#### animation-delay

애니메이션이 시작할 시점을 지정합니다.

양수 값은 지정된 시간이 경과 한 후 애니메이션이 시작되어야 함을 나타냅니다.

음수 값은 애니메이션이 즉시 시작되지만 애니메이션 주기의 중간에서부터 시작됩니다.
`animation-delay: -1s` = 애니메이션 1초 이후 시점에서부터 시작됩니다.

#### animation-timing-function

애니메이션의 진행 방식을 지정합니다.
transition의 timing-function과 사용되는 값들도 동일합니다.
기본값은 ease 키워드값입니다.

#### animation-iteration-count

애니메이션의 사이클 반복 횟수를 지정합니다. (기본값은 1)
숫자로도 설정할 수 있고, infinite 값을 사용하여 무한 반복할수도 있습니다.

#### animation-direction

애니메이션이 정방향, 역방향 또는 앞뒤로 번갈아 재생되는지 여부를 지정합니다.

- Values

  - normal = 정방향 재생 (기본값)

  - reverse = 역재생, 애니메이션 반대로, 타이밍 기능 반대로

  - alternate = 시작-종료 반복 재생, 왔다갔다

  - alternate-reverse = alternate 에서 첫 시작을 반대로

#### animation-play-state

애니메이션의 동작 상태 여부를 지정합니다.
기본값은 running으로, 아래 두가지 값을 갖습니다.

- running

  애니메이션이 현재 재생중임을 나타냅니다.

- paused

  애니메이션이 현재 일시 정지중임을 나타냅니다.

#### animation-fill-mode

애니메이션의 실행 전/후에 대상에 스타일을 적용하는 방법을 지정합니다.

사용할 수 있는 값은 none (기본값), forwards, backwards, both 네 가지입니다.

- forwards

  실행된 애니메이션의 마지막 keyframe에 의해 설정된 스타일값을 유지합니다.

- backwards

  delay 가 일어나는 동안 keyframe에 의해 설정된 시작 스타일값을 적용시킵니다.

- none

  애니메이션 시작 전 요소에 할당된 스타일을 그대로 유지합니다. (기본값)

- both

  forwards & backwards가 동시에 적용됩니다.

### 참고자료

- [CSS animation 정리](https://velog.io/@mangozoo20/CSS-animation-%EC%A0%95%EB%A6%AC)
