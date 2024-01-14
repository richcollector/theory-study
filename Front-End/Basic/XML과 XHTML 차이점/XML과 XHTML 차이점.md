## XML과 XHTML 차이점

### XHTML

XHTML(Extensible Hypertext Markup Language)는 HTML과 동등한 표현 능력을 지닌 “XML” 마크업 언어로 HTML 보다 ”엄격한“ 문법을 가집니다. HTML과 사용 방법등은 거의 동일하지만 디테일한 부분에서 약간의 차이가 있습니다.

- XHTML은 향상된 웹사이트 검색기능과 복잡한 데이터 처리가 가능
- 엄격한 규칙을 사용하고 있어, 문서가 손상 될 가능성이 있음
- Application/xhtml+xml 또는 text/xml로 제공되는 경우 자동으로 XHTML로 처리

### XML

'Extensible Markup Language'의 약자로 W3C에서 개발되었으며, 다른 특수한 목적을 갖는 마크업 언어를 만드는데 사용하도록 권장하는 '다목적 마크업 언어'입니다.
동일 목적의 SGML(Standard Generalized Markup Language)가 기존에 있긴 했지만, 인터넷 환경에 맞게 확장을 한 것이 XML입니다.

- 특히 인터넷에 연결된 시스템끼리 데이터를 쉽게 주고 받을 수 있게 하여 HTML의 한계를 극복
- 웹에서 HTML의 고정된 어휘 이상의 것을 사용하고 싶은 욕구에서 시작
- 데이터의 의미를 부여하는 '메타에디터' 기술 가능
- XML의 X는 extensible 즉, 확장성의 의미를 담고 있으며, 이는 미리 정의된 태그가 아닌 커스텀 태그를 정의해 사용될 수 있다는 장점을 의미
- HTML과 같은 문서의 형태를 보여주는 것이 아닌, Data 전달 및 표현에 초점
- XML은 표현과 내용이 완전 분리되어 Data 구조 및 내용 기술이 가능하며, Stylesheet를 사용하여 다방면의 데이터 표현이 가능

#### HTML 과 XHTML 의 차이

1. 태그 닫는 방식 HTML은 태그가 닫히지 않는 방식을 허용합니다.
   XHTML은 모든 태그가 닫혀있어야 하고 종료 태그가 반드시 있어야 합니다. `<img src=‘…/xxx.jpg’ >` => `<img src=‘…/xxx.jpg’ />` img 와 같이 종료태그가 별도로 없는 태그들은 /> 를 사용해서 닫아줘야합니다.

2. 속성과 값의 표기 방식 HTML은 속성과 값의 단축 표기를 허용합니다. (true와 같은 것들을 생략이 가능합니다.) XHTML은 속성과 값의 단축 표기를 허용하지 않습니다. `<div contenteditable></div>` => `<div contenteditable =‘true’></div>`

3. 속성과 값의 표기 방식 HTML은 속성의 값들을 따옴표로 감싸지 않아도 됩니다. XHTML 은 속성과 값들을 반드시 따옴표로 감싸줘야 합니다. `<div contenteditable=true></div>` => `<div contenteditable=‘true’> </div>`

4. 대소문자 구분HTML 은 요소나, 속성의 대소문자를 구분하지 않습니다. XHTML 은 요소나 속성의 대소문자를 구분합니다. `<DiV></DiV>` => `<div></div>`
   위에서 언급했듯이 XML 기반이기 때문에 xml이 대소문자를 구분해서 XHTML도 구분해줘야합니다.

5. 중첩 HTML은 중첩이 잘못되어있어도 랜더링에 영향을 미치지 않습니다. XHTML은 잘못된 중첩을 허용하지 않습니다. `<p>This is <em>some</p> text</em>` => `<p>This is </p><em>some text</em>`

### 그럼 XHTML을 사용해야하나요?

- XHTML과 HTML은 후속버전이 아니라 별개의 분리된 표준임
- XHTML은 HTML을 거의 포함하기 때문에 구형의 브라우저에도 사용 가능

HTML -> XHTML -> HTML5 이 순서로 사용해왔는데 현재는 주로 HTML5 를 대부분 사용하기 때문에 좀 느슨하게 프로그래밍을 해도 동작을 합니다. HTML이 느슨하게 동작하는 것은 코드를 적게 사용하기 위함입니다. 코드를 적게 사용 = 태그가 적어짐 = 웹사이트 크기 작아짐 = 빠른 로딩이 가능합니다.

### 참고 자료

- [HTML 과 XHTML 의 차이](https://j-ungry.tistory.com/351)
- [XML과 XHTML은 뭐가 다른가요?](https://velog.io/@kseon329/XML%EA%B3%BC-XHTML%EC%9D%80-%EB%AD%90%EA%B0%80-%EB%8B%A4%EB%A5%B8%EA%B0%80%EC%9A%94)
