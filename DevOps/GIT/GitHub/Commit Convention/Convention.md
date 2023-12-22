## Convention

### Commit 메시지 구조

커밋 메시지 구조는 제목, 본문, 꼬리말 세가지 파트로 나누고, 각 파트는 빈줄을 두어 구분을 하는데, type에 깃모지를 넣어 줄 수 있습니다.

> type :art:: subject
>
> body
>
> footer

### Commit Type

타입은 태그와 제목으로 구성되고, 태그는 영어로 쓰되 첫 문자는 대문자로 합니다.

#### 태그

제목의 형태이며, :뒤에만 space가 있다.

- Init: 초기화
- Feat: 새로운 기능 추가
- Add: 내용추가
- Update: 기능 보완 (업그레이드)
- Fix: 버그 수정
- Docs: 문서 수정
- Style: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- Refactor: 코드 리펙토링
- Test: 테스트 코드, 리펙토링 테스트 코드 추가
- Chore: 빌드 업무 수정, 패키지 매니저 수정
- Design: CSS 등 사용자 UI 디자인 변경
- Rename: 파일 혹은 폴더명 수정하거나 옮기는 경우
- Remove: 파일을 삭제하는 작업만 수행하는 경우
- Comment: 필요한 주석 추가 및 변경

### Subject

제목은 최대 50글자가 넘지 않도록 하고 마침표 및 특수기호는 사용하지 않습니다.
영문으로 표기하는 경우 동사(원형)를 가장 앞에 두고 첫 글자는 대문자로 표기합니다.(과거 시제를 사용하지 않는다.)
제목은 개조식 구문으로 작성합니다. --> 완전한 서술형 문장이 아니라, 간결하고 요점적인 서술을 의미합니다.

- Fixed --> Fix
- Added --> Add
- Modified --> Modify

### Body

⑴ 본문은 한 줄 당 72자 내로 작성한다.
⑵ 무엇을(what) 왜(why)를 중심으로 작성한다.
⑶ 다른 개발자가 보더라도 알아 볼 수 있게 자세히 작성한다.

### footer

⑴ 꼬리말은 선택사항(optional)이며, 이슈 트래커 ID를 작성한다.
⑵ 꼬리말은 "유형: #이슈 번호" 형식으로 사용한다.
⑶ 여러 개의 이슈 번호를 적을 때는 쉼표(,)로 구분한다.

Fixes: 이슈 수정중 (아직 해결되지 않은 경우)
Resolves: 이슈를 해결했을 때 사용
Ref: 참고할 이슈가 있을 때 사용
Related to: 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)
ex) Fixes: #45 Related to: #34, #23

### Commit 예시

Feat: "회원 가입 기능 구현"

SMS, 이메일 중복확인 API 개발

Resolves: #123
Ref: #456
Related to: #48, #45

### Commit Message Emogji

ex)Feat 🎨: TodoController create 기능 구현

[다양한 깃모지 참고](https://gitmoji.dev/)
