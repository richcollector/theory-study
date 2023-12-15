## Context switch

컨텍스트 스위치는 한 프로세스로 부터 CPU를 다른 프로세스로 넘겨주는 행동입니다.
Context는 CPU가 해당 프로세스를 실행하면서 가지는 정보 등을 뜻 하는데, 이를 다른 프로세스로 바꾸겠다는 뜻입니다.

초당 100번에서 1000번까지 일어나는 매우 빈번한 동작이기 때문에 성능에 매우 민감합니다.

### Context

- PCB

  Context는 앞서 말했듯이 CPU가 해당 프로세스를 실행하기 위한 정보들입니다. 이러한 정보들은 프로세스의 PCB (process control block)에 저장됩니다. 그래서 switching이 발생하였을 때 이전에 하던 일을 이어서 할 수 있게 됩니다.

- Overheads

  이러한 과정에서 아래와 같은 오버헤드가 발생합니다.

CPU의 레지스터와 메모리맵의 정보를 PCB에 모두 저장하고, 불러옵니다.
메모리 캐시를 flushing하고 reloading합니다.
다양한 테이블과 리스트를 갱신합니다.

### Context Switching의 과정

- Interrupt에 의해 요청이 발생한다
- 프로세스P0 실행 상태의 context을 PCB0에 저장
- 다음 프로세스 p0 의 context를 PCB1에서 가져와 CPU에 할당
- 위 일련의 과정을 반복적으로 수행함으로 Context switch 가 발생

### 참고자료

- [[운영체제] 컨텍스트 스위치(Context Switch)란?](https://uzun.dev/92)
