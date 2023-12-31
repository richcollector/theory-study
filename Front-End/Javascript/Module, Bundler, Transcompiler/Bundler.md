## 번들러(Bundler)

### 3.1.1. JavaScript의 성장에 따른 모듈화의 필요성

- 구글 V8엔진의 등장 이후 브라우저 이외의 환경에서도 JS 사용을 고려하기 시작
- 큰 규모에서 js코드를 사용하기 위해 모듈의 필요성 대두
  - 최초의 모듈 시스템은 HTML에서 JS원본소스를 제공하고, 브라우저에서 순서대로 로드하는 방식 사용
  - 하나의 HTML 파일에서 여러 JS파일을 불렀을 때 모듈 간 스코프 구분이 안 돼 다른 파일을 오염
  - CommonJS, AMD, UMD 등의 모듈에 대한 명세가 나오기 시작, ES6에서 JS의 표준 모듈 시스템 ES6 Module을 명세

### 3.1.2. 또 다른 의존성 발생

- ES6에서 표준 모듈 명세가 나왔지만 구형 브라우저에서는 사용하지 못해 또 다른 라이브러리에 의존하는 상황 발생
- 구형 브라우저에도 동작하게끔 코드를 컴파일(트랜스파일)하는 도구 등장

### 3.1.3. 코드를 프로덕션 환경에서 바로 사용할 수 있게 준비

- 여러가지 의존성과 전처리를 도와줄 테스크러너가 등장
- 테스크러너의 기능 중 모듈을 하나의 파일로 묶어주는 번들링 등장
- 번들러가 단순히 모듈을 하나로 묶어주는 기능을 넘어 \*트리쉐이킹과 같은 최적화 작업을 수행하도록 발전
- 번들러 자체에서 개발과 빌드, 최적화 플러그인 제공으로 별도의 테스크 러너 없이 번들러만 사용 가능

### 트리쉐이킹(tree shaking)

import되었지만 실제 사용되지 않는 코드를 분석하고 제거하는 코드 최적화 기술

###

3.2.4. 번들러 선정
많은 서드파티를 필요로 하는 복잡한 애플리케이션이라면 웹팩
최소한의 서드파티로 라이브러리를 만들고 싶다면 롤업
복잡한 설정을 피하고 비교적 간단한 애플리케이션을 만들고 싶다면 파셀
각 번들러의 장단점을 비교할 수 있는 사이트 [Overview | Tooling.Report](https://bundlers.tooling.report/)

### 참고자료

- [[PBL-FE] 1.3. 번들러(Bundler)의 이해와 활용](https://velog.io/@fffo/PBL-FE-1.3.-%EB%B2%88%EB%93%A4%EB%9F%ACBundler%EC%9D%98-%EC%9D%B4%ED%95%B4%EC%99%80-%ED%99%9C%EC%9A%A9)
