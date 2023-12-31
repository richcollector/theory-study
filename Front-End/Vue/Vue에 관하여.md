## Vue.js

Angular와 React의 장점을 살리고 단점을 보완하여 만든 오픈 소스 자바스크립트 프론트엔드 프레임워크로, 사용자 인터페이스(UI) 개발에 초첨을 맞춰 복잡하고 동적인 웹 페이지를 쉽게 개발할 수 있는 개발도구는 무엇일까요? 네, 바로 ‘Vue js’입니다.

Vue js는 대표적인 프론트엔드 개발 프레임워크로 Angular, React와 함께 프론트엔드 개발도구 3대장으로 뽑히는데요. 실시간 대시보드, 소셜 미디어 애플리케이션, 전자상거래 플랫폼 개발 등 다양한 플랫폼 개발에 사용되며, 프론트엔드 개발자들 사이에서 매우 인기 있는 프레임워크입니다.

Vue js의 가벼운 크기와 직관적인 문법으로 인해, SPA 개발에 매우 적합한 프레임워크입니다. 여기서 SPA는 Single Page Application(단일 페이지 애플리케이션)을 의미하는데, 페이지 전환 없이 동적으로 콘텐츠를 로드하고 업데이트하는 웹 애플리케이션을 뜻합니다.

기존의 다중 페이지 애플리케이션은 사용자가 링크를 클릭할 때마다 서버로부터 새로운 페이지를 로드하는 방식이었습니다. 하지만 SPA는 초기에 전체 페이지를 로드하고, 사용자 인터랙션에 따라 필요한 데이터만 서버로부터 비동기적으로 로드하여 업데이트합니다. 이를 통해 사용자 경험을 향상시키고 애플리케이션의 성능을 개선할 수 있습니다.

### Vue js가 개발된 이유

Evan You는 Google의 개발자로 AngularJS를 사용하여 프론트엔드 개발을 진행하다가 AngularJS의 단점을 개선한 새로운 프레임워크를 선보이게 되었습니다. 이것이 바로 ‘Vue js’입니다.

AngularJS는 기능이 많고 강력하지만, 이로 인해 사용하기 어렵고 프로젝트 구성이 복잡해지는 단점이 있었습니다. Evan You는 더 가벼우면서도 간단하고 유연한 프론트엔드 개발 도구를 원했습니다. 특히 작은 규모의 프로젝트부터 대규모의 복잡한 프로젝트까지 모두 효과적으로 개발할 수 있는 프레임워크가 필요했습니다.

AngularJS의 복잡성으로 인해 개발자들이 프로젝트를 구성하고 유지하기 위해 많은 시간과 노력을 투자해야 하는 문제를 해결하길 원했고, 이러한 동기로 Evan You는 결국 2014년에 Vue js를 개발하게 되었습니다.

### 장점

Vue js는 가벼우면서도 유연한 프론트엔드 라이브러리로서, React와 Angular의 좋은 점들을 차용하면서도 배우기 쉽고 프로젝트 구성이 간단하다는 장점을 가지고 있습니다. Vue는 Angular와 같이 컴포넌트 기반의 SPA를 개발하기 위한 프레임워크라는 점에서는 공통점이 있지만 다음과 같은 차이점/개선점이 있습니다.

- Angular보다 가벼운 프레임워크

Angular는 많은 기능을 제공하지만, 초보자가 사용하기에는 어렵습니다. 또한, 프로젝트 구성이 복잡하며, 타 프레임워크에 비해 용량이 많이 발생하는 프레임워크입니다. 이와 대비하여 Vue js는 단순하고 직관적인 문법을 가지고 있어 배우기 쉽고 개발을 더 간편하게 할 수 있습니다.

- 가상DOM을 사용하여 렌더링 성능 향상

  Angular는 가상 DOM을 사용하지 않고 실제 DOM을 직접 조작합니다. 이로 인해 애플리케이션의 크기와 복잡성에 따라 렌더링 속도가 저하될 수 있습니다. 하지만 Vue js는 가상 DOM(Virtual DOM)을 사용하여 효율적인 렌더링을 구현하고, DOM 조작을 최소화하여 성능을 향상시킵니다. Vue js는 **React의 가상 DOM과 유사한 접근 방식을 채택하여 장점을 채용하였습니다.**

많은 부분이 동적으로 변경 표시되는 웹페이지 화면의 경우, 직접적으로 브라우저의 DOM을 다시 그리게 되면 성능상의 저하가 일어날 수 있습니다. 가상 DOM(Virtual DOM)을 이용해 메모리 상에서 가상 DOM을 변경하고, 최종 브라우저의 실제 DOM에 변경되는 부분은 이전 DOM 과의 차이가 나는 부분만 계산하여, DOM 변경을 최소화하는 기법을 사용합니다. 이러한 기법을 이용해서 브라우저의 렌더링 성능을 향상시킵니다.

### 선호하는 이유

웹 애플리케이션 개발 시, 프론트엔드 개발에 주로 사용되는 프레임워크는 Vue js 외에도 React, Angular가 있습니다. 웹 프론트엔드를 개발한다고 할 때, 개발자들이 고민하는 것 중에 하나가 이 3가지 프레임워크 중에 무엇을 사용할 것인가입니다.

Vue js는 React에 이어 2번째로 대중적인 프론트엔드 자바스크립트 프레임워크입니다. React가 가장 인기 있는 웹 프론트엔드 프레임워크이지만, 새로운 JSX 문법을 익혀야 하는 등 Vue js보다 학습 난이도가 높습니다. 이에 비해 Vue js는 배우기 쉽고, 다양한 라이브러리를 제공하며, 빠른 성능을 제공하기 때문에 많은 기업에서 사용하고 있습니다.

- 기존 웹 애플리케이션 구성과 유사성

  Vue js의 장점은 무엇보다 배우기 쉽다는 데 있습니다. 기존에 html, css, javascript를 알고 있는 개발자라면, Vue js에 쉽게 적용할 수 있습니다. Vue js가 제공하는 Template 형식은 기존 html, css 기반의 웹페이지 구성과 흡사하기 때문에 기존에 개발되어 있는 프로젝트를 새롭게 포팅 하는데 용이합니다.

- 개발자의 신규 프레임워크에 대한 높은 적응도

  또한, 기존 개발 기술을 가지고 있는 개발자가 현대적인 기술의 프론트엔드 프레임워크를 사용하는 신규 프로젝트를 맡았을 때, 배우기 쉬운 Vue js를 가장 많이 선택하고 있습니다.

- 웹개발을 위한 통합 프레임워크

  Vue js는 React와 다르게 프레임워크으로 필요한 구성요소를 자체적으로 제공합니다. React는 라이브러리로 UI 렌더링 요소에 집중한 반면, Vue js는 필요한 도구를 자체적으로 포함하고 있습니다.

예를 들어 React는 전역적 상태 관리를 하려면 redux라는 3rd party 모듈을 사용하여야 하고, 페이지 전환을 하려면 3rd party 도구인 react router를 사용하여야 합니다. 하지만, Vue js는 자체적으로 상태 관리 도구인 Vue jsx를 내장하고 있으며, 또한 페이지 전환을 위한 기능으로 Vue js Router를 제공하고 있습니다.

### 특징

쉬운 사용법과 통합 프레임워크의 개발 도구 지원으로 프론트엔드 개발자들이 선호하는 Vue js는 어떤 특징을 가지고 있을가요? Vue js의 대표적인 특징을 뽑자면, **‘양방향 데이터 바인딩’, ‘컴포넌트 기반 아키텍처’, ‘가볍고 빠른 실행 속도’**를 뽑을 수 있는데요. 각각 어떤 특징을 가지고 있는지 자세하게 알려드리겠습니다!

- 양방향 데이터 바인딩

  양방향 데이터 바인딩이란, 데이터의 변경사항은 자동으로 UI 화면에 반영되며(데이터 → UI 화면), 또한 UI화면에서 입력한 사용자의 입력 정보가 데이터를 업데이트한다는 것을 의미합니다. (UI화면 → 데이터)

  이러한 특징은 **단방향 데이터 바인딩을 사용하는 React와는 다른 처리방식**으로 Angular와 유사한 방식입니다. 양방향 데이터 바인딩은 데이터의 변화가 자동으로 화면에 반영되는 장점이 있어서 개발자가 데이터와 UI를 별도로 동기화할 필요가 없습니다. 이로 인해 코드의 양이 줄어들고, 프로젝트를 더 빠르게 구축할 수 있습니다. 특히 사용자 입력과 같은 상호작용이 많은 폼 컨트롤 등의 UI 요소를 다룰 때 매우 유용합니다.

- 컴포넌트 기반 아키텍처

  웹 화면을 살펴보면 많은 요소로 구성되어 있습니다. 버튼과 입력폼, 이미지 등은 한 번만 사용되는 요소도 있지만, 여러 페이지에 통일되게 사용되거나, 또는 동일한 페이지안에서 반복적으로 사용되는 것들도 많이 있습니다.

  Vue js는 컴포넌트 기반 아키텍처를 사용하여 UI를 재사용 가능한 작은 컴포넌트로 조립하여 전체 화면을 구성할 수 있도록 해줍니다. 작은 요소를 컴포넌트화할 수 있어서, 큰 규모의 웹페이지 개발 프로젝트라도, 마치 레고 블록을 조립하여 커다란 집을 완성하는 것 같은 형태로 개발이 가능합니다.

- 가벼움과 빠른 실행속도

  Vue js는 가상 DOM(Virtual DOM)을 사용하여 효율적인 렌더링을 구현합니다. 가상 DOM을 통해 변경된 부분만 업데이트하고 필요한 최소한의 DOM 조작을 수행하여 빠른 렌더링 속도와 효율적인 업데이트 관리를 제공합니다.

### 코드 상의 개발 편의성

Vue js가 가지는 특징은 앞서 살펴본 대로 ‘성능상의 이점’, ‘컴포넌트 아키텍처’, ‘자체 내장 지원 도구’ 등 다양하게 제공합니다. 또한 개발 편의성이 뛰어난 프레임워크인데요. 코드적인 측면에서 또 다른 프론트엔드 개발도구인 React와 어떤 차이가 있는지 살펴보겠습니다.

- 기존 html과 유사한 Template 형식 제공

  Vue js의 Template 문법이 기존 html 개발 방식과 유사하여 새로운 SPA 웹 애플리케이션을 도입하고자 하는 기업에 손쉽게 적용이 가능합니다. Vue js가 html과 유사한 Tag 기반 Template을 제공하여, html에 익숙한 개발자에게 좀 더 직관적으로 다가옵니다.

- 개발 방식의 단순함(통일된 방식)

  특정 웹 페이지를 표시하는 데 있어서, React는 여러가지 다른 형태로 개발이 가능하여, 개발자마다 서로 다르게 개발할 수 있어서, 초급 개발자에게는 어렵게 느껴질 수 있습니다. 하지만, Vue js에서는 특정 형태를 개발하는 방식이 한 가지로 쉽게 개발이 가능하며, 여러 개발자가 공동으로 작업할 때도, 코드의 통일성을 가져올 수 있어 협업에 유리합니다.

  예를 들어 특정 상황(데이터)에 따라 화면에 특정 내용(요소)을 표시할 때도 있고, 표시하지 않을 때도 있는 동적인 화면을 개발하는 경우, Vue js는 동적인 표시를 위해 v-if라는 문법만 제공하여 개발하게 됩니다.

  이와 같이 Vue js는 쉽게 배울 수 있어 초급 개발자에게 특히 인기 있는 도구이며, 숙련된 개발자와 초급 개발자가 함께 프로젝트 할 경우에도 Vue js를 선택하여 프로젝트를 함께 진행할 수 있습니다.

### Vue js의 다양한 생태계와 도구

- Vue js Router

  Vue js 애플리케이션의 라우팅을 관리하기 위한 공식 라우터 라이브러리입니다. 페이지 간의 전환과 URL을 기반으로 뷰를 동적으로 로딩하고 관리하는 기능을 제공합니다.

- Vue jsx

  Vue js 애플리케이션의 상태 관리를 위한 공식 상태 관리 라이브러리입니다. 중앙 집중식 스토어로 애플리케이션의 데이터와 상태를 효율적으로 관리하고 상태 변경을 추적하는 데 사용됩니다.

- Vue jstify

  Vue js 애플리케이션에 사용자 인터페이스를 디자인하기 위해 재사용 가능한 컴포넌트와 스타일을 제공하는 머티리얼 디자인 컴포넌트 프레임워크입니다.

- Nuxt.js

  Vue js 애플리케이션을 위한 프레임워크로서, 서버 사이드 렌더링(SSR)과 코드 스플리팅을 지원하여 SEO에 우수하고 더 빠른 로딩 속도를 제공합니다.

이 외에도 Vue js 커뮤니티에서는 다양한 도구와 라이브러리가 지속적으로 개발되고 있으며, 프로젝트의 요구사항에 맞춰 선택적으로 사용할 수 있습니다.

### Vue js를 활용하여 개발하기 좋은 프로젝트

손쉽고 빠른 웹 애플리케이션 개발, 다양한 반응형 동적 요소가 필요한 사용자 인터랙티브 웹 화면 인터페이스 개발, 그리고 컴포넌트 기반의 웹 애플리케이션 개발에 Vue js를 도입하면 **뉴스 사이트, 전자상거래 사이트, 대시보드 제작 등 다양한 프로젝트**를 진행할 수 있는데요. Vue js의 어떤 기능이 각각의 프로젝트 제작에 도움이 되는지 살펴보겠습니다.

- 블로그 혹은 뉴스 사이트

  블로그나 뉴스 사이트는 컨텐츠 중심의 웹 애플리케이션으로, 사용자에게 다양한 정보를 제공하는 것이 주된 목적입니다. Vue js의 컴포넌트 기반 아키텍처는 컨텐츠를 작은 조각들로 분리하여 개발할 수 있습니다. 예를 들어, 뉴스 목록, 뉴스 상세 페이지, 사이드바, 헤더 등 각각을 독립적인 컴포넌트로 구성할 수 있습니다. 이렇게 구성하면 코드의 재사용성이 증가하고 유지 보수가 용이해집니다.

- 전자상거래 애플리케이션

  Vue js는 상품 목록, 장바구니, 주문 과정, 결제 등의 기능을 다루는 전자 상거래 애플리케이션을 개발할 때 사용하기 좋습니다. 전자 상거래 애플리케이션은 복잡한 웹 기능이 필요한 애플리케이션이므로, 컴포넌트 기반의 다양한 개발자가 함께 사용하기 좋은 Vue js가 좋은 선택지가 될 수 있습니다.

  Vue js의 컴포넌트 기반 아키텍처를 활용하면 UI를 작은 조각들로 분리하여 개발할 수 있으며, 이러한 컴포넌트들을 조합하여 전체 애플리케이션을 구축할 수 있습니다. 또한 Vue js를 사용하여 상품 목록을 동적으로 표시하고, 상품 검색, 필터링, 정렬 기능을 구현하며, Vue jsx를 활용하여 장바구니 상태를 관리할 수 있습니다.

- 대시보드

  대시보드는 다양한 데이터와 그래프, 통계 등을 시각화하여 사용자에게 보여주는 대시보드 애플리케이션입니다. 다양한 그래프와 차트가 동적으로 업데이트되어야 하며, 애니메이션과 화려한 UI가 사용자 경험을 향상시키는데 중요한 역할을 합니다. 따라서 가볍고 빠른 실행 속도를 제공하는 동적인 Vue js는 대시보드 개발에 적합한 선택지가 될 수 있습니다.

Vue js는 가상 DOM(Virtual DOM)을 사용하여 변경된 부분만 업데이트하고 렌더링 하여 빠른 실행 속도를 제공합니다. 이로 인해 대규모의 그래프와 데이터를 효율적으로 처리할 수 있으며, 사용자가 대시보드를 사용할 때 빠른 응답성과 부드러운 애니메이션을 제공할 수 있습니다.

또한 Vue js는 컴포넌트 기반 아키텍처를 사용하여 UI를 작은 조각들로 분리할 수 있기 때문에, 각 그래프와 차트를 독립적인 컴포넌트로 구현하여 코드의 재사용성과 유지 보수성을 높일 수 있습니다. 이를 통하여 대시보드의 복잡한 구성 요소들을 쉽게 관리하고 개선할 수 있습니다.

### 용어설명

- 3rd party 모듈

  특정 프로그래밍 환경에서 기본적으로 제공되지 않는 외부 제작자 또는 개발자가 만든 소프트웨어 패키지를 말합니다. 이러한 모듈은 주로 다양한 기능을 제공하거나 특정 작업을 수행하기 위해 사용됩니다.
