## CSS-in-JS vs CSS-in-CSS

HTML이 처음 등장하고 웹 이용자들이 늘어나면서 디자인에 대한 요구가 늘어났고, HTML을 꾸며주는 언어의 필요성에 CSS가 등장하게 되었습니다.

더 나아가 웹이 복잡해지고 동적 기능 요구가 증가하면서 HTML과 CSS만으로는 화면의 모든 스타일을 제어할 수 없는 상황에 이르게 됩니다.

이를 해결하기 위한 여러가지 스타일 구성 방식이 나타났고, 크게 CSS-in-JS와 CSS-in-CSS로 나눌 수 있습니다.

### CSS-in-JS

JavaScript 안에서 CSS 스타일을 작성하고 조작하는 방법을 의미합니다.
이 방식은 주로 컴포넌트 기반의 JavaScript 라이브러리나 프레임워크 (예: React, Vue.js 등)에서 많이 사용됩니다.

CSS-in-JS는 JavaScript의 변수와 함수를 활용하여 동적인 스타일링을 가능하게 합니다.
이는 애플리케이션의 상태에 따라 스타일이 바뀌어야 하는 경우에 특히 유용합니다.

CSS-in-JS는 JavaScript 번들의 일부로 스타일을 로드합니다.
이는 별도의 HTTP 요청 없이 스타일을 로드할 수 있음을 의미합니다.

대부분의 CSS-in-JS 라이브러리는 브라우저에서 JavaScript를 실행하여 동적으로 style 태그를 생성하고, 이 태그에 스타일을 삽입합니다.

### CSS-in-CSS

전통적인 CSS 방식을 가리키는 말로, 보통은 별도의 CSS 파일에 스타일을 작성하고 이를 HTML에 연결(link)하여 사용하는 방식을 말합니다.

CSS를 모듈화 한다는 의미입니다. CSS 클래스를 만들면 자동으로 고유한 클래스네임을 만들어서 스코프를 지역적으로 제한합니다.

CSS 모듈은 동일 프로젝트 소스 안에 CSS 클래스 이름이 중복되어도 새로운 이름이 입혀져 중복 및 관리의 위험성이 적고 CSS 네이밍 규칙이 간소화 됩니다.

다만 한 곳에서 모든 것을 작성하지 않기 때문에 별도로 많은 CSS 파일을 만들어 관리해야 하는 단점이 있습니다.

모듈화 된 CSS는 번들러를 통해 모든 CSS를 하나의 CSS 파일로 병합하거나, 자바스크립트 번들에 포함시킵니다. 브라우저는 이 CSS를 로딩하고 적용합니다.

### 빈번한 리렌더링이 발생하는 컴포넌트의 경우, 적합한 스타일링 방식은 무엇일까?

- CSS-in-CSS

  스타일 시트가 별도로 로드되며, 이는 브라우저가 CSSOM (CSS Object Model)을 생성하게 합니다. CSSOM이 한 번 생성되고 나면, 다시 렌더링 될 때는 해당 스타일 시트를 다시 파싱할 필요가 없으므로 렌더링 성능이 향상될 수 있습니다. 또한, 렌더링이 빈번하게 발생하더라도 스타일이 변경되지 않는다면, CSS-in-CSS 방식이 더 효율적일 수 있습니다.

- CSS-in-JS

  컴포넌트가 렌더링 될 때마다 새로운 스타일을 동적으로 생성합니다. 따라서, 상태 변경이나 prop 변경에 따라 스타일이 자주 변경되는 컴포넌트의 경우 CSS-in-JS가 더 효율적일 수 있습니다. 그러나, 이 방식은 JavaScript 실행 비용이 추가되므로, 매우 빈번한 렌더링이 발생하는 경우에는 성능에 부담을 줄 수 있습니다.

  따라서, 빈번한 리렌더링이 발생하더라도 스타일이 자주 변경되지 않는다면 CSS-in-CSS가 성능적으로 더 유리하고, 스타일이 빈번하게 변경되는 경우 CSS-in-JS가 더 적합할 수 있습니다.

  CSS 파일이 추출되는 CSS 모듈 방식은 자바스크립트 해석 과정이 따로 없기 때문에 페이지가 훨씬 빨리 전환됩니다.

### 참고 자료

- [CSS-in-JS vs CSS-in-CSS : 성능 비교를 중심으로](https://velog.io/@sunfkkc/CSS-in-JS-vs-CSS-in-CSS-%EC%84%B1%EB%8A%A5-%EB%B9%84%EA%B5%90%EB%A5%BC-%EC%A4%91%EC%8B%AC%EC%9C%BC%EB%A1%9C)