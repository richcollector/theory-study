## Box model

문서(document)의 레이아웃을 계산할 때, 브라우저의 렌더링 엔진은 표준 CSS Box Model을 참고로 합니다.
모든 HTML 요소는 box로 이루어져 있으며, CSS에서 이것으로 요소의 크기, 위치, 속성(색, 배경, 테두리 모양 등)을 결정할 수 있습니다. 이것을 CSS Box Model 이라고 합니다.
박스모델은 요소와 요소 간의 레이아웃을 짜거나 크기와 위치 등을 정할 때 중요하게 작용하며,
content(콘텐츠), padding(안쪽 여백), border(테두리), margin(바깥 여백) 으로 이루어져 있습니다.
개발자도구 Computed(스타일 계산 결과) 탭에서 확인이 가능하고, Elements 탭에서 아무 태그나 눌러 Styles 탭 하단으로 가서도 확인할 수 있습니다.

### Box model 영역

- content(내용)

  - 보통 태그가 차지하는 공간으로 텍스트나 이미지 등의 실질적인 콘텐츠가 표시되는 영역입니다.
  - ex) test라고 태그를 기술했을 때 div앨리먼트의 content는 test 콘텐츠 영역의 크기는 콘텐츠 너비(콘텐츠 박스 너비)와 콘텐츠 높이(콘텐츠 박스 높이)배경색과 배경 이미지를 가지고 있기도 합니다.
    box-sizing 속성의 값이 기본값인 content-box 요소가 블록 레벨 요소인 경우, 콘텐츠 영역의 크기를 width, min-width, max-width, height, min-height, max-height 속성을 사용해 사용해 명시적으로 설정할 수 있다.

- border(테두리)

  - 요소의 테두리
  - 테두리는 margin과 padding의 경계입니다.
  - 테두리의 굵기와 색상과 스타일을 지정할 수 있습니다.
  - 테두리의 두께는 border-width와 단축 속성인 border가 결정합니다.
  - box-sizing 속성의 값이 border-box라면 테두리 영역의 크기를 width, min-width, max-width, height, min-height, max-height 속성을 사용해 명시적으로 설정합니다.
  - 박스의 배경(background-color 또는 background-image)은 테두리의 바깥 경계까지 늘어나고, 그릴 땐 테두리에 가려집니다. (이 동작 방식은 background-clip 속성으로 바꿀 수 있습니다.)

- padding(안쪽여백)

  - 테두리와 컨텐츠 간의 여백입니다.
  - 콘텐츠 영역을 요소의 안쪽 여백까지 포함하는 크기로 확장합니다.
  - 안쪽 여백의 두께는 padding-top, padding-right, padding-bottom, padding-left와 단축 속성인 padding이 결정합니다.

- margin(바깥여백)

  - 요소와 요소 간의 여백입니다.
  - 위 아래에 인접한 엘리먼트 간에는 margin의 값이 더 큰 쪽의 margin이 적용됩니다. (좌우는 아님)
  - 바깥 여백 영역의 크기는 margin-top, margin-right, margin-bottom, margin-left와 단축 속성인 margin이 결정합니다.

### box-sizing 속성

box-sizing 프로퍼티는 width, height 프로퍼티의 대상 영역을 변경할 수 있습니다.
box-sizing 프로퍼티의 기본값은 content-box입니다. 이는 width, height 프로퍼티의 대상 영역이 content 영역을 의미한다. box-sizing 프로퍼티의 값을 border-box
로 지정하면 마진을 제외한 박스 모델 전체를 width, height 프로퍼티의 대상 영역으로 지정할 수 있어서 CSS Layout을 직관적으로 사용할 수 있게 합니다.

### Box model 종류

- 블록 레벨 엘리먼트(block-level element)

  - 한줄에 하나의 엘리먼트만 표시되는 종류의 엘리먼트
  - 다른 인라인 엘리먼트 뿐 아니라 블록 레벨 엘리먼트도 컨텐츠로 포함할 수 있습니다.
  - DIV, H1~H6, P, FORM, UL, LI, ADDRESS, BLOCKQUOTE, FIELDSET, TABLE, HR 등

- 인라인 엘리먼트(inline element)

  - 한줄에 여러개의 엘리먼트가 표시되는 종류의 엘리먼트
  - 인라인 엘리먼트만 포함 할 수 있고, 블록레벨 엘리먼트의 자식이어야 합니다.
  - a, img, em, strong등
  - 인라인 엘리먼트도 박스모델의 적용을 받지만, 마진과 패딩의 값은 좌, 우에만 적용이 되고 상하관계는 무시됩니다.
  - 컨텐츠의 크기를 사용자가 임의로 지정할 수 없고, 그 컨텐츠 자체의 크기에 자동으로 맞춰집니다.

### 참고자료

- [[개발기록] Box model (CSS 박스 모델)](https://velog.io/@parkksss/%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D-css%EB%B0%95%EC%8A%A4%EB%AA%A8%EB%8D%B8)
