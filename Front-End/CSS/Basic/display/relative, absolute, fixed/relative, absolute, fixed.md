## position

position 은 레이아웃을 배치하거나, 객체를 위치시킬때 사용하는 css 속성입니다.
position 속성은 상속되지 않으며, 위(top), 아래(bottom), 왼쪽(left), 오른쪽(right) 의 위치를 같이 설정 할 수 있습니다.

### position의 속성

- static (기본값)

  위치를 지정하지 않을 때 사용합니다.

  - position:static

    static은 기본값이기 때문에 따로 설정해줄 필요가 없습니다.
    설정 전과 후의 값이 같습니다.

- relative

  위치를 계산할때 static의 원래 위치부터 계산합니다.

  - position:relative

    static의 원래 위치(기존의 위치)부터 계산합니다.
    relative를 적용하는 것만으로는 어느 위치로 이동 하지는 않습니다.
    위치를 이동시켜주는 top, right, bottom, left 프로퍼티가 있어야 원래의 위치에서 이동할 수 있습니다.

```html
<div>div</div>
<div class="relative">div.relative</div>
<div class="relative top-left">div.relative.top-left</div>
```

```css
div {
  border: 3px blue solid;
  width: 100px;
  height: 100px;
}

div.relative {
  position: relative;
}

div.relative.top-left {
  left: 50px;
  top: 50px;
}
```

div.relative는 position을 relative로 주었더라도 따로 top, right 등 위치 property값을 설정해주지 않았기 때문에 기존의 자리에 있습니다.
div.relative.top-left는 기존의 자리를 기준으로 위쪽에서 50px, 왼쪽으로 50px씩 이동합니다.

- absolute

  원래 위치와 상관없이 위치를 지정할 수 있습니다. 단, 가장 가까운 상위 요소를 기준으로 위치가 결정 됩니다.

  - position:absolute

    가장 가까운 위치 지정 부모를 기준으로 절대적으로 움직이게 됩니다.
    일반적으로 absolute를 쓸 경우, 기준이 될 부모에게 `position: relative;`를 부여하면 됩니다.

```html
<div class="relative">
  div.relative
  <p class="absolute">div.absolute</p>
</div>
```

```css
div.relative {
  position: relative;
}

p.absolute {
  position: absolute;
  left: 50px;
  top: 50px;
  background-color: yellow;
}
```

div.absolute의 부모태그의 position이 relative이기 때문에 부모를 기준으로 왼쪽으로 50px, 위에서 50px씩 이동합니다. 만약, 조상 중 위치 지정 요소가 없다면 초기 컨테이닝 블록을 기준으로 삼습니다.

```html
<p class="absolute">absolute</p>
```

```css
p.absolute {
  position: absolute;
  left: 50px;
  top: 50px;
  background-color: yellow;
}
```

부모가 따로 없기 때문에 가장 큰 부모인 뷰포트를 기준으로 아래에서 50px, 위에서 50px씩 이동합니다.

- fixed

  원래 위치와 상관없이 위치를 지정할 수 있습니다. 하지만 상위 요소에 영향을 받지 않기 때문에 화면이 바뀌더라도 고정된 위치를 설정 할 수 있습니다. 브라우저 화면의 상대 위치를 기준으로 위치가 결정됩니다.

  - position:fixed

    브라우저 화면의 상대 위치를 말합니다.

따라서 화면이 바뀌어도, 스크롤이 되어도 고정된 위치를 설정 할 수 있고, 상위 요소에 영향을 받지 않습니다.

### 참고자료

- [[CSS]position 속성 - relative, absolute, fixed에 대해 알아보자](https://velog.io/@hoje15v/CSSposition-%EC%86%8D%EC%84%B1-relative-absolute-fixed%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90)
