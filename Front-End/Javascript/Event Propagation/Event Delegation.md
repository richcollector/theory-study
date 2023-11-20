## Event Delegation

### 막는법

이벤트 버블링과 캡처링를 막기 위해서 `e.stopPropagation()`을 사용합니다. 해당 웹 API를 통해 이벤트가 전파되는 것을 막을 수 있습니다.

### 활용법

이벤트 위임을 사용하지 않고, 동일한 이벤트를 일일히 수동으로 달아주기에는 코드 낭비가 너무 심합니다.

따라서 부모 요소에 이벤트를 부여해 버블링을 통해 하위 요소를 동작시킬때도 해당 이벤트가 발생하도록 만드는 것이 바람직합니다.

아래와 같은 상황에서

```jsx
<div class="itemList">
  <li>
    <input type="checkbox" id="item1" />
    <label for="item1">1</label>
  </li>
  <li>
    <input type="checkbox" id="item2" />
    <label for="item2">2</label>
  </li>
</div>
```

case1: 각각 이벤트들을 부여해주기 inputs의 내부 input에 각각 이벤트를 달아주었습니다.

```jsx
let inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("click", () => {
    alert("clicked");
  });
});
```

case2: 부모 요소에 이벤트 부여하기 부모 요소인 itemList를 클릭했을 때, 이벤트 버블링을 통해
checkbox type을 클릭했을 경우, 이벤트가 똑같이 동작하도록 만들었습니다.

```jsx
let itemList = document.querySelector(".itemList");
itemList.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.type === "checkbox") {
    alert("click");
  }
});
```

이처럼 이벤트 버블링을 통한 이벤트 위임은 하위 요소에 각각의 이벤트를 붙이지 않고도 상위 요소에서 하위 요소의 이벤트들을 제어할 수 있습니다.
