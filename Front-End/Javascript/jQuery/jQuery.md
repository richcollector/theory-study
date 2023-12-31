## jQuery

사이트의 특정 기능에 이벤트를 부여할 때 브라우저 호환성 문제로 특정 브라우저에서 제대로 동작하지 않는 코드를 접할 수 있습니다. 호환성 때문에 코드가 제대로 작동하지 않을 경우, 문제를 해결하기 위해 코드를 분석하며 원인을 찾는 게 쉽지가 않습니다. 이벤트 기능을 구현할 때 **호환성 문제를 해결**해 줄 자바스크립트의 라이브러리가 jQuery입니다.

jQuery는 클릭 이벤트, 체인지 이벤트 등 웹 페이지 동작의 기능을 조작할 때 브라우저의 영향을 받지 않고 원하는 기능을 제작할 수 있습니다. 브라우저의 버전에 따라 작동하지 않는 코드를 jQuery로 변경해서 사용하면 브라우저 문제 없이 사용할 수 있습니다.

코드와의 호환성 문제를 많이 이르키는 브라우저들이 있습니다. 우리나라에서 많이 사용했던 IE(Internet Exploer)가 대표적인데요. IE에서는 버전이나 호환성의 문제로 코드가 제대로 작동하지 않을 때가 많았습니다. 이 문제를 해결하고자 ‘크로스 브라우징’ 기능을 가진 jQuery가 탄생했습니다. 크로스 브라우징이란 다양한 브라우저에서 같은 코드로 동일한 동작을 할 수 있게 하는 기능으로 코드가 브라우저에 따라 제대로 작동하지 않는 문제를 해결할 수 있습니다.

### 자바 스크립트의 라이브러리

jQuery는 자바 스크립트의 라이브러리로, html 요소를 간단하고 편리하게 사용하는 기능이 내재되어 있습니다. 학생 시절 발표를 위한 PPT를 만들 때, 움직이는 애니메이션 효과를 사용해서 몰입도를 높였던 경험 있으시죠? 이와 같은 역할을 하는 언어가 바로 ‘jQuery’입니다.

자바 스크립트는 동적인 기능 구현을 할 수 있지만 코드가 너무 길어지고 복잡해지는 단점이 있습니다. 하지만 jQuery를 사용하면 같은 기능도 간략하고 단순한 코드로 구현할 수 있죠. 쉬운 예시로 친구들끼리 대화를 할 때 줄임말을 써서 상대가 쉽게 알아듣게 만드는 것과 같다고 보시면 됩니다.

간략한 단어로도 빠르게 뜻을 전달할 수 있죠. 그래서 jQuery에는 자바 스크립트의 코드를 단순하게 변경하고, html 요소를 간단하게 구현하여 개발자들의 편의를 고려한 기능이 내재되었습니다.

### 기업들이 jQuery를 선호하는 이유

jQuery는 개발된 지 25년이 넘었습니다. 자바 스크립트는 개발 환경이 잘 갖추어져 있고 다양한 개발 생태계를 갖춘 프로그래밍 언어이기 때문에 React와 Vue 같은 프레임워크나 라이브러리가 계속해서 개발되고 있습니다.

하지만, 여전히 jQuery를 사용하는 기업들이 많은데요. 최신 도구들이 계속 개발되고 있는데, jQuery를 계속 사용하는 이유는 무엇일까요? 바로 **‘jQuery를 사용하는 웹사이트’가 많기 때문**입니다.

jQuery가 개발되기 전에 기업들은 복잡하고 어려운 코드를 사용해서 웹 사이트를 개발했는데요. 복잡하고 어려운 코드를 사용해야 했기 때문에 개발 기간이 오래 걸리고, 유지 보수에도 어려움을 겪었습니다.

하지만 jQuery가 니오면서 웹 사이트 개발이 편리해졌습니다. 간편하고 단순한 코드 진행으로 개발 시간이 단축되었고, 코드 공유가 수월해져서 유지 보수의 어려움도 줄었습니다. 이러한 이점 때문에 jQuery가 개발 되었을 때, 많은 기업들이 jQuery를 사용해서 웹 사이트를 개발했고 지금까지도 사용하고 있습니다. 그래서 현재에도 여전히 jQuery 개발자를 찾는 기업이 많습니다.

### jQuery의 특징

- 뛰어난 DOM 구조 탐색

  첫 번째로 jQuery는 DOM(Document Object Model) 구조 탐색이 매우 뛰어납니다. DOM은 문서 객체 모델로 트리 자료구조의 형태를 가지고 있는데요. 말 그대로 나무처럼 뻗어나가면서 하위로 펼쳐져서 내려가는 구조입니다.

  글을 작성할 때도 서론, 본론, 결론 속에 소제목을 쓰고 내용을 써 내려가는 것처럼 코드에서도 전개 순서가 필요합니다. 그 순서에 맞게 코드를 작성하는 것이 DOM이라고 하며 순서대로 작성된 코드 사이에서 원하는 위치의 값을 가져오거나 입력할 때 편리합니다.

  예를 들어, 표에서 2번째 행의 3번째 열에 1이라는 값을 넣어야 할 때, 코드로 작업할 때는 해당 위치를 찾아서 넣어야 합니다. 자바 스크립트 같은 경우에도 요소의 class나 Id 등으로 찾아올 수 있지만 원하는 위치의 정보를 정확히 불러오기에는 조금 복잡하죠.

  jQuery는 어떨까요? jQuery는 css 검색 스타일로 원하는 위치를 정확하게 뽑아내어 요소를 추가/삭제하기 때문에 더 간단하고 편리하게 원하는 요소를 찾아낼 수 있습니다.

  예를 들어 자바 스크립트로는 각 요소들마다 class나 Id 값을 줘서 해당 위치를 찾아와야 하는데, css 검색 스타일은 원하는 위치의 대상을 찾을 때 편리하게 자기 자신을 나타내는 $(this), 특정 요소를 모두 가져오는 $("element name") 등으로 상대적으로 Id나 class 값을 부여하지 않아도 위치 찾기를 쉽게 할 수 있도록 구성 되어있습니다.

- 크로스 브라우징

  두 번째는 ‘크로스 브라우징’입니다. 개발을 해본 사람들은 브라우저의 호환성 때문에 어려움을 겪었던 적이 있으실 겁니다. 브라우저에는 IE와 크롬, 사파리 등 다양한 브라우저가 있는데요. 동작에는 전혀 문제가 없는 정상적인 코드라도 특정 브라우저를 만나면 동작을 안 하는 경우가 있습니다. 이를 해결하기 위해 jQuery를 사용합니다.

  jQuery는 모든 브라우저를 지원하고 있어, 코드가 깨지지 않고 동작합니다. jQuery의 제일 큰 장점이라고도 할 수 있는데요. 예를 들어 jQuery를 사용하지 않았을 때, 홈페이지가 특정 브라우저에서 동작이 안되어 이를 해결하기 위해 코드 작업을 다시해야 하는 상황이 올 수 있습니다.

  최악의 경우 문제가 있는 부분의 앞단, 뒷단의 코드까지 확인해야되서 작업시간이 오래 걸립니다. 하지만 jQuery를 사용하면 해당 코드 확인을 위해 코드의 연결 구조를 확인하는 문제없이 원하는 기능을 구현이 가능합니다.

### jQuery의 단점

- 느린 구현 속도

  우선 첫 번째로 jQuery는 순수 자바 스크립트를 이용해 구현한 코드보다 속도가 현저히 느립니다. 우리가 버스 탈 때도 정류장을 들리지 않고 가는 급행 버스보다 정거장마다 들리는 시내버스가 더 시간이 오래 걸리는 것처럼 jQuery가 동작할 때는 라이브러리에 걸쳐 해당 브라우저에 맞는 네이티브 자바 스크립트로 변환 시켜야 하기에 코드가 많아지면 속도가 느려집니다.

  속도를 올리기 위해서는 동적인 이벤트를 주어야 할 때 적은 양의 코드를 사용하고, 요소의 Class보다는 Id로 쓰는 것이 좋습니다. Class 같은 경우에는 html 요소 중에 여러 요소에서 중복으로 사용이 가능해 특정 이벤트를 Class로 구현 시 같은 Class가 있는 모든 요소의 동작을 동시에 실행됩니다.

  반면 Id 같은 경우에는 한 가지 태그에서 밖에 사용 못 하기 때문에 특정 이벤트를 실행하여도 해당 Id에 있는 요소로만 동작을 하므로 Id를 쓰는 것이 속도를 개선하기에 더 좋습니다. 또한 DOM의 위치를 찾을 때 구체적인 위치를 제시해 주면 속도감을 조금 올릴 수 있습니다.

- 코드 관리의 어려움

  두 번째로 코드가 간결해서 쉽게 느낄 수도 있지만 코드를 관리하는 부분에서는 힘들 수도 있습니다. jQuery가 탄생한 이유는 자바 스크립트의 브라우저 호환성 문제와 복잡한 코드로 인한 문제를 해결하기 위해서입니다.

  자바 스크립트에 비해 간편하고 편리한 코드 구조 덕분에 개발자 사이에서 갑작스럽게 흥행하였고, jQuery를 배우는 개발자들이 급속도로 늘어났습니다. 하지만 자바 스크립트를 배우지 않고 바로 jQuery를 배우는 사람이 늘어나면서 jQuery의 원리를 모르고 코드를 잘못 사용하는 경우가 생기게 되었고, 이에 따라 프로젝트를 유지, 관리하는 데 어려움을 겪는 경우가 발생하고 있습니다.

### jQuery을 제대로 활용하기 위해

jQuery의 뛰어난 DOM 구조 탐색과 크로스 브라우징의 특징을 살리고 브라우징에 맞춘 코드 변환로 인한 느린 속도와 코드 관리 문제를 해결하려면 어떻게 해야 할까요?

바로 [html, css, 자바 스크립트의 개념을 이해]하고[ jQuery를 활용할 줄 아는 전문가]를 ‘채용’하는 것입니다. 웹사이트 제작에 필요한 구성 요소들을 제대로 파악하고 jQuery를 잘 다룰 줄 아는 전문가를 채용한다면, 코드의 흐름이 매끄럽게 다듬어져 jQuery의 요소들을 제대로 살린 웹사이트를 제작할 수 있습니다.

### jQuery를 통해 활용할 수 있는 기능들

jQuery는 ‘jQuery UI’라고 공식 홈페이지에서 배포해 준 라이브러리가 있기 때문에 사이트에 들어가서 원하는 UI를 보고 코드를 들고 와서 활용하여 구현을 할 수 있고, 홈페이지의 검색 기능도 사용자가 보기에 더 편리하도록 변경이 가능하여 웹 페이지 프로젝트에서 다양하게 활용할 수 있습니다.

- 최소, 최대 선택날짜를 지정한 데이트피커 옵션

  전체 코드에서 부분적으로 이벤트성 기능을 주기 좋기 때문에 보통 모달 팝업이나 날짜 달력 등 이벤트성 기능에 많이 사용됩니다. 웹페이지에 검색 기능을 예시로 들어보겠습니다. 검색 기능하면 무엇이 있죠? 날짜, 시간, 셀렉 박스의 특정 검색 조건 등의 기능을 넣을 수 있는데요.

  검색 기능을 보면 달력 날짜인 ‘데이트피커’ 기능을 활용할 수 있습니다. 검색할 때 날짜를 매번 직접 치는 것보다는 달력 UI를 활용하면 날짜와 요일을 한눈에 보고 직접 선택할 수 있고, 선택 가능한 기간 등을 설정할 수 있습니다.

- Clockpicker 기능

  시간은 시계 모양 UI인 Clockpicker 기능을 활용할 수 있습니다. 사내 게시판에 들어가는 내용에 야근, 연차 등 특정 일자에 시간을 지정 사용하기 때문에 시 오전, 오후 몇 시간 간격 조절이 가능해서 게시판에서 많이 사용을 하고 있습니다.

  셀렉 박스 검색 기능에 활용할 수 있습니다. 셀렉 박스에는 옵션을 넣을 수 있는데 옵션의 양이 많아지면 스크롤로 찾는 데 오래 걸리다 보니 셀렉 박스에서 내가 찾으려는 글자를 치면 아래에 관련된 옵션만 보이게 가능해서 옵션이 많은 웹페이지 검색 기능에 유용하게 사용됩니다.

### 참고자료

-[jQuery 란, 사용하는 이유부터 특징, 기능까지 모두 알려드립니다.](https://www.elancer.co.kr/blog/view?seq=176)
