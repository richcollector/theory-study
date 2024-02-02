## Framer

### 단축키

- `f` frame
- `s` Colums
- `t` text
- `ctrl + enter` 한 그룹으로 묶기
- `ctrl + k` create component 등등
- `ctrl + ;` 숨기기, 비활성화
- `0` opacity 조절

width같은 수치는 안에서 96-15처럼 연산이 가능합니다.

#### Reset Override

Tablet, Phone에서 우클릭 => Reset Override을 해주면 Primary 상태로 복구할 수 있습니다.

### Publish

우측 상단에 위치하여 클릭하면 들어갈 수 있는 링크를 생성해줍니다.
수정하고 클릭하면, update하여 링크에 변경사항을 전달할 수 있습니다.

### Desktop (Primary), Tablet, Phone

Primary인 Desktop을 기준으로 Tablet, Phone 레이아웃이 변경됩니다.
공통적인 부분은 Desktop에서 작업을 해주고, 나머지 반응형으로 수정되는 부분은 Tablet, Phone에서 작업합니다.

### Link

- `Link to`

  누르면 이동하는 곳을 설정할 수 있습니다.

- `new tap`

  yes로 하여, 새로운 페이지에서 열리도록 설정할 수 있습니다.

- `Section`

  설정한 Section을 기준으로 Link를 설정해주면 해당 기준으로 이동합니다.

  - `Scroll`

    - `Smooth`

      부드럽게 이동이 됩니다.

- Style

  Text같은 Top bar에 있는 요소는 Style에서 Default, Hover, Current 상황에 따른 스타일을 적용할 수 있습니다.

### Position

- `Relative`

  고정

- `Absolute`

  이동시켜킨 위치에 고정

- `Fixed`

  스크롤을 해도 고정 (고정된 상단바는 투명도를 높여주어 답답함을 사라지게 할 수 있습니다.)
  제일 상단 레이어에 있어야 적용이 가능하다.
  왼쪽과 아래쪽을 활성화하고 적용해야 모니터마다 다른 것들을 적용할 수 있습니다. (하단을 기준으로 정렬이 되기에)

- `Sticky`

  상위 레이어는 모두 Visible로 적용해야 보입니다.
  상위 레이어에 맞춰서 범위가 적용됩니다.

### Size

- Fixed

  고정된 크기

- Fill 크기에 맞춰짐

  전체 크기에 %비율로 맞춰줄 수 있습니다.

- Relative 반응형으로 크기가 맞춰짐

  Desktop, Tablet, Phone별로 달라지는 크기에 유동적으로 맞춰줄 수 있습니다.

- Fit Content

  안에 들어있는 Content에 맞춰서 크기가 조절됩니다.

- Min / Max

  Min Max로 최소 최대 크기를 정할 수 있습니다.

### Layout

상위 레이어의 Layout를 누르면, 안의 Content들이 정렬됩니다.
섹션사이의 간격을 넣을때는 빈 Frame을 하나 추가하는 것이 편리하지만, Gap이나 Padding을 이용할 수 도있습니다.

- `Stack` / `Grid`

  - `Stack`

    가장 기본

  - `Grid`

    - 전체적인 Rows와 Columns를 미리 설정할 수 있습니다.

- `Direction`

  - `Horizontal`

    가로 나열

  - `Vertical`

    세로 나열

- `Distribute`

  - `Start`
  - `Center`
  - `End`
  - `Space Between`
  - `Space Around`
  - `Space Evenly`

- `Align`

  기준점에 맞춰서 Content들을 정렬해줍니다.

- `Wrap`

- `Gap`

  Content 사이에 간격을 일정하게 조절해 줍니다.

- `Padding`

  왼쪽 아이콘은 전체적인 Padding을, 오른쪽 아이콘을 누르면 Top / Bottom / Right / Left 수치를 각각 줄 수 있습니다.

### Effects

- `Appear`
- `Hover`
- `Press`
- `Loop`
- `Drag`
- `Scroll Animation`
- `Scroll Speed`
- `Scroll Transform`

  스크롤 이벤트에 따라서 변경됩니다.

- `Trigger`

  Section in View 선택하면 아까 Scroll Section을 말하는 것

- `Viewport`

  기준을 정하여 시작점을 위, 중간, 아래로 정할 수 있습니다.

- `Section`

  지정한 것으로 영역을 설정할 수 있습니다.

- `From / Enter`

  지정한 Section(Scroll Section)의 윗면 기준

- `To / Exit`

  지정한 Section의 아랫면 기준

- `Transition`

  `Spring`를 추가하여 부드럽게 만들어 줄 수 있습니다.

### Overlays

Component에서 Interactions => New Event를 누르면 Home화면에서 Overlays(팝업창)가 추가가 됩니다.

- `Enter`: in
- `Exit`: out
- `Spring`: 부드러운 전환

### Style

- `Opacity`

  투명도를 설정할 수 있습니다.

- `Visible`

  해당 Content를 표시할지를 설정 할 수 있습니다.

- `Fill`
  Fill에서 Sizing을 Fit로 바꿔주면 크기에 맞게 맞춰짐
  Fill을 선택안하면 투명창
  unsplash에서 무료이미지 반영 가능

  - `Resolution`

        Auto로 하면 화면에 뜨는 시간이 늦어질 수 있어 용도에 따른 설정을 해주는 것이 좋습니다.
        고화질은 Large

    로고 같은 작은 것은 Medium

  - `Type`
  - `Position`
  - `Alt Text`

- `Overflow`
  Overflow를 눌러서 영역 넘어선 것들도 보이게 할 수 있음

  - `Hidden`
  - `Visible`
  - `Scroll`

- `Radius`

- `Rotation`

  회전을 주어 Content를 원하는 각도로 돌릴 수 있습니다.

- `Border`

  - `Color`
  - `Width`
  - `Style`

- `Shadows`

  - `Type`
  - `Position`
  - `Color`
  - `X`
  - `Y`
  - `Blur`
  - `Spread`

- `Z Index`

  우선순위를 정하여, 제일 먼저 보여질 것을 설정할 수 있습니다.

- `Perspective`

상단 + 버튼 여러 효과를 넣을 수 있다.

### Text

- `Styles`
- `Content`
- `Font`

  직접 업로드한 Fonts는 각 프로젝트 한정하여 사용할 수 있습니다.

- `Weight`

- `Color`

  자주 사용하는 색을 저장하여 사용할 수 있습니다.

- `Size`
- `Letter`
- `Line`
- `Align`
- `Paragraph`

  글자 간격 조절 가능합니다.

### Scroll Section

name을 꼭 설정해줘야 다른 곳에서 Section을 적용할 수 있습니다.

### Accessibility

### Code Overrides

## Insert

### Icons

- `Hero`

  name => ArrowCircleUp처럼 아이콘 모양을 바꿀 수 있습니다.
  Style에서 Blending => Difference를 해주면 배경에 따른 아이콘 색 변경 가능합니다.

## Layout

- `Frame`: 자유정렬
- `Colums`: 가로정렬
- `Rows`: 세로정렬
- `Grid`: 가로 세로 정렬 수 설정

### 참고자료

- [유튜브 방구석 프레이머](https://www.youtube.com/watch?v=zWeM5G5AmOQ)
