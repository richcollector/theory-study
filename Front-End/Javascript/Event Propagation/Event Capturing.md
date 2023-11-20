## 이벤트캡처링

이벤트 캡처링(Event Capturing)은 이벤트 버블링과 반대 방향으로 진행되는 이벤트 전파 방식입니다.

![](./event-capturing.png)

```jsx
<div class="outside">
  녹색 영역
  <div class="middle">
    하늘색 영역
    <div class="inner">
      핑크색 영역
      <div class="float">회색</div>
    </div>
  </div>
</div>;

const outside = document.querySelector(".outside");
const middle = document.querySelector(".middle");
const inner = document.querySelector(".inner");
const float = document.querySelector(".float");

function callback() {
  alert(this.className + " is Capturing!");
}

outside.addEventListener("click", callback, true);
middle.addEventListener("click", callback, true);
inner.addEventListener("click", callback, true);
float.addEventListener("click", callback, true);
```

위 코드는 이벤트 캡처링의 예시입니다. float을 클릭하면 가장 상위 부모요소인 outside의 이벤트부터 발생합니다. 이때 addEventListener함수의 두번째 인자로 전달된 true는 이벤트를 캡처링해야하는지 여부를 지정합니다.

```jsx
target.addEventListener(type, listener[, useCapture]);
```

- type : 이벤트의 이름을 지정하는 문자열. 대소문자 구별. (click, keypress 등..)
- listener : 이벤트가 발생할때 호출할 이벤트 리스너 함수.
- useCapture : 캡쳐링을 사용할지 여부를 지정하는 Boolean. default는 false 입니다. (선택사항)
