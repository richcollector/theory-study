## display

display 태그는 화면에 어떻게 드러나게 할지를 결정하는 속성입니다. 즉, 요소 크기를 어떻게 결정할건가를 결정하는 속성입니다.

- display 속성값의 종류

  - none

    display 속성의 값을 none으로 하면 엘리먼트를 화면에서 보이지 않게 할 수 있습니다.
    이 속성값을 적용하면, 해당 코드를 아예 작성하지 않은 것과 같은 동일한 효과가 있습니다.
    비슷한 효과를 주는 것으로 `visibility: hidden`가 있는데,
    이것은 요소를 화면상에서 시각적으로 보이지 않게는 하지만 컨텐츠의 영역은 살아있습니다.

  - block

    일반적으로 설정하지 않아도 div가 갖게되는 기본값입니다. (태그에 따라 기본값이 다를 수 있습니다.)
    기본적으로 width 가 자신의 컨테이너의 100% 가 되게끔 합니다. 쉽게 말하자면, 가로 한 줄을 다 차지하게 됩니다.

  - display: inline

    컨텐츠를 딱 감쌀 정도의 크기만 갖게됩니다. block태그와 다르게 줄바꿈이 되지 않고, 반드시 컨텐츠를 감싸게 되고, 크기를 변화시킬 수 없습니다.

  - inline-block

    inline과 block의 특성을 합쳐놓은 속성으로, 기본적으로는 inline의 속성을 지니고 있지만, 임의로 크기를 바꿔줄 수 있습니다.

### 참고자료

- [[개발기록] Box model (CSS 박스 모델)](https://velog.io/@parkksss/%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D-css%EB%B0%95%EC%8A%A4%EB%AA%A8%EB%8D%B8)
- [[CSS] display란? / display 속성 / display 종류 / 🖼](https://programming119.tistory.com/97)
