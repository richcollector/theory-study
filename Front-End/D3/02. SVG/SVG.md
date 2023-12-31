## SVG란?

**확장 가능한 벡터 그래픽(scalable vector graphics)으로 XML 기반의 2차원 그래픽입니다. HTML 태그의 집합으로 이루어져 있습니다. 즉, css와 javascript로 컨트롤이 가능합니다.**

### 1.1 SVG의 장점

아무리 확대를 해도 이미지가 깨지지 않습니다. 또한, 이미지의 크기를 키워도 용량이 늘어나지 않습니다.

### 1.2 SVG의 단점

코드로 이루어진 이미지이기 때문에 복잡한 이미지일수록 파일 사이즈가 커집니다. 단순한 모양일수록 효율이 좋습니다. 복잡한 이미지를 굳이 SVG로 표현하고자 하면 오히려 용량이 너무 거대해져 역효과가 날 수 있습니다. 그렇기 때문에 주로 단순한 아이콘, 로고, 도형 등을 구현할 때 많이 사용합니다.

### 2. HTML에 SVG를 적용하는 여러가지 방법들

기존에 가지고 있던 이미지를 아래와 같은 사이트에서 svg로 변환이 가능합니다.

아래 4가지 방법 중 내부 요소 조작이 필요할 때에는 3번과 4번을, 조작이 필요하지 않을 때에는 1번과 2번을 사용하시면 됩니다.

- 2.1. img 태그로 사용하기
  src="" 속성값으로 svg 파일을 연결합니다.
  ```jsx
  <img src="frog.svg" alt="">
  ```
  ​
  2- .2. css background로 사용하기
  background-image 속성값으로 svg 파일을 연결합니다.
  ```jsx
  .cont-svg {
  width: 100vw;
  height: 100vh;
  background: url(frog.svg) no-repeat 0 0;
  background-size: contain;
  }
  ```
  ​
- 2.3. 인라인으로 구현하기
  svg 파일의 코드를 그대로 html 코드 안에서 사용합니다.

  ```jsx
  <svg width="624" height="465" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m446.529 308.502 79.386-37.479c-37.824-34.863-111.48-58.521-196.146-58.521-123.264 0-223.191 50.142-223.191 112.002 0 61.857 99.927 112.002 223.191 112.002 94.674 0 175.575-29.586 208.011-71.334l-91.251-56.67Z"
      fill="#00A249"
    />
    .. 중략 ...
    <path
      d="M383 129c0 16.016-13.208 29-29.5 29S324 145.016 324 129s13.208-29 29.5-29 29.5 12.984 29.5 29Z"
      stroke="#000"
    />
    <ellipse class="eye-right" cx="353.5" cy="129" rx="12.5" ry="12" fill="#000" />
  </svg>
  ```

- 2.4. Object 태그 사용하기
  아래처럼 object 태그로 사용하면 내부 요소에 접근할 수 있습니다.
  ```jsx
  <object data="./image.svg" type="image/svg+xml"></object>
  ```
