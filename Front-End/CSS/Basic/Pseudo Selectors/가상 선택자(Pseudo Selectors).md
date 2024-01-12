## States

가상 선택자(Pseudo Selectors)의 상태를 의미합니다.
즉, 선택한 요소가 특정한 조건을 만족하면 가상 선택자로 지정한 상태가 됩니다.
예를 들어 `:hover`(가상 선택자)는 지정한 요소에 마우스를 가져가면 설정한 상태로 변화합니다.

### Pseudo Selectors 종류

- active

  마우스로 클릭했을 때의 상태.

```css
button:active {
  background-color: tomato;
}
```

hello 버튼(button)을 클릭했을 때, 버튼의 색깔이 tomato(주황)색으로 변화

- hover

  마우스 커서가 대상 위에 있을 때.

```css
button:hover {
  background-color: teal;
}
```

마우스 커서가 버튼(button)위에 있을 때, 버튼이 초록색(teal)으로 변화

- focus

  키보드나 마우스로 대상이 선택 되었을 경우. (클릭해서 선택하거나, 키보드 Tab키로 선택 가능.)

```css
button:focus {
  border: 3px solid brown;
  border-radius: 3px;
  padding: 3px;
}
```

Hello 버튼을 클릭해서 선택하거나, 키보드의 Tab 키를 눌러 Hello 버튼을 선택하면 경계선(border)이 검은색으로 진하게 생기도록 변화

- focus-within

  자식중 어떤 것이든 focus 되었을 때, 부모 엘리먼트의 상태를 의미.

```css
div {
  padding: 10px;
  border: 3px solid pink;
}

div:focus-within {
  border-color: black;
}
```

부모는 div로 분홍색 테두리가 쳐진 박스입니다. 자식은 Hello 버튼으로, 자식이 선택되었을 때(마우스나 키보드로 선택되었을 경우) 부모(div 요소)의 상태가 경계선 검은색(border-color: black)으로 변화

외에도, link(방문 전 사이트 상태), visited(이미 방문한 사이트 표현) 등 다양한 가상 선택자(Pseudo Selector)가 존재합니다. 가상 선택자의 종류와 의미는 CSS 가상 선택자를 잘 설명해둔 [MDN](developer.mozilla.org/ko/docs/Web/CSS/Pseudo-classes)에서 확인할 수 있습니다.

### Chain Reaction

부모의 상태가 바뀌었을 때, 자식에게 효과를 주는 연계 반응. (다양한 연계반응이 가능합니다.)
부모(div 박스)에 마우스 커서 가면(hover), 자식(Hello 버튼)의 배경색이 초록색으로 변화.

```css
div {
  border: 3px solid pink;
}
/* Chain Reaction */
div:hover button {
  background-color: green;
}
```

위 예시를 보면 부모(div 박스)가 특정 조건을 만족했을 때, 자식(Hello 버튼)의 상태가 변화합니다.
이런 경우를 Chain Reaction(연계 반응) 이라고 합니다.
보통 부모 요소가 특정 조건을 만족했을 때, 자식 요소의 상태가 변화하도록 하는 경우가 많습니다.

### 참고자료

- [[CSS] States (active, focus, hover, visited, focus-within)](https://bio-info.tistory.com/70)
