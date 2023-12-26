## !important

important는 '중요한'이라는 뜻을 갖고 있습니다.
이와 같이 CSS에서 !important는 중요한 요소의 속성이 변경되지 않도록 합니다.
때문에 하기처럼 한 속성에 대한 정의가 여러번 되었다 하더라도 !important가 적용되어 있으면 나중에 설정한 값은 적용되지 않습니다.

```css
p {
  color: red !important;
}

p {
  color: blue;
}
```

위의 코드에서 p는 red색상의 컬러가 나옵니다.
다시 속성값을 변경하고 싶다면 변경하고자하는 속성 뒤에 똑같이 !important를 붙여주면 됩니다.

```css
p {
  color: red !important;
}

p {
  color: green !important;
}

p {
  color: blue;
}
```

위의 코드에서 p는 red가 아니라 green이 나옵니다.

### 주의사항

무분별한 !important의 사용은 cascading 규칙에 어긋나 예상치 못한 결과를 초래할 수 있습니다.
