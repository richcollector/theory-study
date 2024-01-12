## 크로스 브라우징(cross browsing)

- 웹 페이지 제작 시에 모든 브라우저에서 깨지지 않고 의도한 대로 올바르게(호환성) 나오게 하는 작업을 말합니다.
- HTML5, CSS3, Javascript 작성 시 W3C의 웹 규격에 맞는 코딩을 함으로써 어느 브라우저, 기기에서 사이트가 의도된 대로 보여지고 작동되는 기법입니다.

### 크로스 브라우징이 작업마다 필요한 원인

브라우저마다 랜더링 엔진이 다르기 때문입니다.

- 작동하지 않은 HTML5, Javascript 코드가 존재
- 해석하지 못하는 CSS 코드 존재
- 브라우저 버그들이 존재
- 브라우저 자체적인 CSS 스타일

### 랜더링 엔진(or 레이아웃 엔진) 종류

페이지를 랜더링할 때 실질적으로 작업을 하게 되는 엔진입니다.
같은 엔진을 사용하면 다른 브라우저여도 비슷하게 출력됩니다.

#### 레이아웃 엔진의 종류

트라이던트(Trident), 게코(Gecko), 웹킷(Webkit), 프레스토(Presto), 블링크(Blink), 듀얼 엔진.

|        엔진         |                                                                                                                                                                                                                                              |       회사        |
| :-----------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------: |
| 트라이던트(Trident) |                                                                                IE, 아웃룩 이메일 클라이언트나 윈도우 프로그램의 미니 브라우저등에 사용됩니다.                                                                                |  마이크로 소프트  |
|     게코(Gecko)     |                                                                                    파이어 폭스, 모질라 재단의 이메일 클라이언트인 선더버드에 사용됩니다.                                                                                     |      모질라       |
|    웹킷(Webkit)     | 초기 애플사가 사파리 엔진으로 사용하기 위해 차용했으나 현재는 웹킷 프로젝트로 분리되어 개발되고 있습니다.<br/> 크롬에서도 사용되었던 엔진이며 iOS나 안드로이드의 기본 브라우저들이 이 웹킷 엔진을 사용합니다.<br/> 점유율이 높은 엔진입니다. |      애플사       |
|  프레스토(Presto)   |                                                                                                 오페라 15버전부터 더이상 사용하지 않습니다.                                                                                                  | 오페라 소프트웨어 |
|    블링크(Blink)    |              웹킷 엔진을 사용하던 구글이 크롬이 개발, 사용하고 있는 엔진입니다.<br/> 웹킷에서 줄기를 가져 왔기 때문에 웹킷엔지과 비슷한 모습이 보여집니다.<br/> 프레스토 엔진을 버린 오페라가 블링크 엔진을 사용하고 있습니다.               |       구글        |
|      듀얼 엔진      |      국내 이스트소프트의 스윙(Swing) 브라우저를 예로 들면 크롬과 같은면서도 액티브X를 지원하는데, 독자적인 엔진이 아닌 두가지 엔진을 번갈아 사용하는 방식이기 때문에 가능합니다.<br/> 보통 트라이던트와 웹킷or블링크 엔진을 사용합니다.      |                   |

### IE를 버전마다 크로스 브라우징하는 이유

최신 버전으로 자동 업데이트가 되는 브라우저가 많으나 IE는 해당되지 않습니다.
IE는 사용자가 직접 업데이트를 진행해야 하며, 윈도우 버전에 따라 최대 버전이 한정되어 있습니다.

### 브라우저 대응 순서, 어떤 브라우저에 초점을 둬야하는가?

타겟이 되는 (가장 점유율이 높은) 브라우저부터 맞추는 것이 좋습니다.
보통 기준이 되는 %이하인 브라우저는 지원에서 제외하기도 합니다.

[점유율 조사 사이트](http://gs.statcounter.com/)

각 나라별로 사용자들의 순위가 다르며 모바일과 데스크탑 등 다양한 환경에 따라 점유율 또한 달라집니다.
그래서 프로젝트 진행시에 타겟과 정책을 잘 잡아야 하며,
아래와 같은 방법으로 크로스 브라우징 작업을 진행할 수 있습니다.

### 크로스 브라우징 작업

- 도움이 되는 사이트를 이용하여 브라우저에 맞게 작업합니다.
  [캔아이유즈](https://caniuse.com)

#### 브라우저별 벤터프리픽스 (Vender Prefix)

- 크롬 : -webkit-
- 사파리 : -webkit-
- 파이어폭스 : moz- (mozila라는 단체가 파이어폭스를 만들었기 때문에)
- 오페라 : -o-, -webkit-
- 익스플로러 : -ms-

```css
.selector {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
```

#### 초기화 작업 (CSS 초기화 작업)

'웹 브라우저'마다 default 값으로 스타일이 적용되어 있기 때문에 우리는 브라우저마다의 기본 디폴트 스타일 값이 아니라 동일한 CSS 스타일을 보여주기 위해 default 디폴트 값을 초기화 해주어야 합니다.

<details>

<summary>예시코드</summary>

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

html {
  font-size: 10px;
}

body {
  line-height: 1;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1.4rem;
}
body,
input,
button,
select,
textarea,
th,
td {
  color: #222;
}

a {
  text-decoration: none;
  color: inherit;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
```

</details>

#### 핵(Hack)

스타일을 줄 때 특수문자를 넣어서 다른브라우저들에서는 인식이 안되지만 IE 특정 버전에서는 인식되도록 하는 방법입니다. 이 방법은 추천하지 않습니다. IE8 이상의 브라우저에서 구분해내기가 어려우며 CSS 유지 보수를 어렵게 합니다.

<details>

<summary>예시코드</summary>

- 크롬 핵

```css
@media screen and (-webkit-min-device-pixel-ratio:0){
	여기에 css 작업
}

파이어폭스 핵
@-moz-document url-prefix() {
	여기다 쓸 css 넣기
}
```

- 선택자핵

```css
/* IE 6 이상 */
* html #uno {
}

/* IE 7 이상 */
*:first-child + html #dos {
}

/* IE 7 과 현대 브라우저 */
html > body #tres {
}

/* 현대 부라우저 (IE 7 빼고) */
html>/**/body #cuatro {
}

/* 오페라 9.27 이상 */
html:first-child #cinco {
}

/*사파리,크롬,오페라 다수브라우저핵*/

html[xmlns*=""] body:last-child #seis {
}

/*사파리 3+, 크롬 1+, 오페라 9+, 불여우 3.5+ */
html[xmlns*=""] body:last-child #seis {
}

/*사파리 3+, 크롬 1+, 오페라 9+, 불여우 3.5+ */
body:nth-of-type(1) #siete {
}

/* 사파리 3+, 크롬 1+, 오페라 9+, 불여우 3.5+ */
body:first-of-type #ocho {
}

/* 사파리 3, 크롬 1+ */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
}
```

</details>

#### IE용 주석을 이용한 방법 (Conditional comments)

|                               |      |
| :---------------------------: | :--: |
|        lt (less than)         | 미만 |
|  lte(less than or equal to)   | 이하 |
|       gt(greater than)        | 초과 |
| gte(greater than or equal to) | 이상 |

📌 IE용 주석을 이용하는 방법 (IE는 단종)

```jsx
<!-- [if IE 7]>
<link href="ie7.css" type="text/css" rel="stylesheet"/>
<![endif]-->

<!-- [if IE 8]>
	<p> 이 문구는 IE8이 포함되지 않은 하위 브라우저, 즉 IE7,6에서 보여지게 됩니다.</p>
<![endif]-->
```

#### 메타 태그를 이용한 IE모드

📌 메타 태그를 이용한 IE 모드

```jsx
<head>
  // ...
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  //...
</head>
```

`<head>` 요소 안에 넣어두며 IE가 문서를 읽고 랜더링 할 때 원하는 모드로 랜더링을 하게 해줍니다.
만약 content에 값이 "IE=edge"라면 해당브라우저가 할 수 있는 가장 최신의 모드로 랜더링합니다.

### 크로스 브라우징 작업, 어느정도 맞춰야하나?

IE 하위버전에서 html5를 사용하려고 라이브러리를 사용하는 것은 성능을 저하시킬수 있습니다.
보통, IE의 버전이 낮을 수록 컴퓨터 성능도 최신이 아닐 가능성이 큽니다.

그러므로 성능 저하는 더 치명적일 가능성이 큽니다.
크로스 브라우징의 의미를 정확히 알고 작업해야 합니다. (동일성이 아닌 동등성!)

### 참고 자료

- [크로스 브라우징(cross browsing)이란?](https://tlsdnjs12.tistory.com/57)
