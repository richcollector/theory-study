## CSS (Cascading Style Sheets)

HTML, XHTML 등의 디자인 레이아웃을 설정할 때 사용되는 언어입니다.
주로 요소의 너비, 색상, 위치 등등을 지정합니다.
이전에는 HTML만으로 뼈대, 디자인을 설정하여 웹을 제작하였지만, 이 방식은 작성한 코드의 양이 많아질 경우 수정 시에 매우 번거롭습니다. 이런 문제점을 해결하기 위해 CSS가 생겨났고, CSS로 스타일을 지정하기 시작하면서 유지보수 및 수정이 용이해졌습니다.

### 선택자

#### 자식 선택자(child combinator)

\> 기호는 자식 선택자(child combinator)를 나타냅니다. 이것은 특정 요소의 직계 자식만을 선택하라는 의미입니다.

예를 들어, `.frame > img`는 클래스가 "frame"인 요소의 직계 자식으로 있는 `<img>`요소를 선택합니다.

```html
<div class="frame">
  <img src="example.jpg" alt="Example Image" />
  <p>This is some content.</p>
</div>
```

위의 CSS 규칙은 .frame 클래스를 가진 `<div>` 안에 있는 `<img>` 태그만 선택하게 됩니다. `<p>` 태그는 직계 자식이 아니므로 선택되지 않습니다.

### CSS 적용 방식

#### 인라인 방식 (Inline style)

HTML 요소 중 style 속성을 이용하여 CSS를 태그에 직접 넣는 방식입니다.
지정한 요소에만 CSS를 적용할 수 있기때문에 수정이 힘들고, 재사용이 불가능합니다.
스타일 시트의 장점을 살릴 수 없기 때문에 꼭 필요한 부분에만 인라인 방식을 적용해야 합니다.

```html
<body>
  <p style="colorL red;"></p>
</body>
```

#### 내부 스타일 시트 (Internal style sheet)

HTML의 head태그 안에 `<style></style>` 태그를 활용하여 css를 적용하는 방법입니다.
여러 태그들의 스타일을 한 번에 수정할 수 있는 장점이 있지만, 다른 HTML 파일에는 스타일을 적용할 수 없습니다.
내부 스타일 시트도 양이 많아 질수록 유지보수가 어려워 집니다.

```html
<head>
  <style>
    p {
      color: red;
    }
  </style>
</head>
```

#### 외부 스타일 시트 (External style sheet / Linking style sheet)

스타일 시트를 따로 만들어 HTML문서에 연결하여 적용시키는 방식입니다.
.css라는 확장자명을 사용하여 스타일시트를 만듭니다.
HTML 내부의 head 태그 안에 연결시켜야 하고 적용하고 싶은 HTML 파일에 `<link>` 태그를 통해 외부 스타일 시트를 가져옵니다. `<link rel="stylesheet" href="style.css">`
웹 제작 시 구조의 일관성을 위해 같은 스타일을 사용하는 경우가 많은데 내부 스타일 시트, 인라인 방식을 사용하는 경우 코드의 양이 많아집니다. 이처럼 유지보수의 문제와 용량으로 인한 페이지 로드에 문제가 생기기 때문에 외부 스타일 시트를 만들어 별도로 관리하는 것이 좋습니다.

### 참고자료

- [[CSS] CSS란 무엇인가? / CSS 적용 방식](https://devyuna.tistory.com/entry/CSS-CSS%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-CSS-%EC%A0%81%EC%9A%A9-%EB%B0%A9%EC%8B%9D)
