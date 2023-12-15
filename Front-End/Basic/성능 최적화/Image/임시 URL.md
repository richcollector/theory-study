## 임시 Url

### 문제점

이미지를 업로드하여 클라우드 스토리지에 저장 후 그 이미지를 미리보기로 제공하는 방식으로 개발을 하면 미리보기 속도가 느리고, 최종 등록하기를 누르지 않고, 게시글 등록을 취소하게 되면 이미지 찌꺼기가 남는다.

### 해결 방안

- createObjectURL

  호환이 안 되는 곳이 있으니 확인 후 사용.

```jsx
if (file === undefined) return;
// 1. 임시 URL 생성 => (가짜 URL - 내 브라우저에서만 접근가능)
// 자바스크립트 내장 객체
//blob까지 같이 복사해서 넣어야 나옴
const result = URL.createObjectURL(file);
console.log(result);
```

- FileReader

  사진 자체를 글자로 표현 이것을 저장하면 안된다.

```jsx
// 2. 임시 URL 생성 => (진짜 URL - 다른 브라우저에서도 접근 가능)
const fileReader = new FileReader();
fileReader.readAsDataURL(file);
fileReader.onload = (event) => {
  console.log(event.target?.result); // 게시판에서 event.target.id를 쓰면 eslint가 잡았던 이유: event.target 태그만을 가르키지 않음
  if (typeof event.target?.result === "string")
    setImageUrl(event.target?.result);
};
```
