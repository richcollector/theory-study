## Blob (Binary Large Object)

하나의 개체로 구성된 바이너리 데이터의 집합을 의미합니다. 이름에서 알 수 있는 것처럼 Blob은 용량이 큰 데이터를 의미하는데요 주로 이미지, 오디오 같은 미디어 객체를 저장하는 데 사용됩니다.

Blob은 자바스크립트 고유의 데이터 형식 외에도 다양한 데이터 형식을 포함하는데요 File도 Blob의 데이터 형식에 하나입니다.

### Blob 형식으로 변환하기

1. blob()

   Blob 형식이 아닌 데이터를 Blob 형식으로 변환합니다. 아래와 같이 배열에 변환하고자 하는 모든 형식을 삽입하면 하나의 Blob 형식으로 반환됩니다.

`const blob = new Blob(['type1', 'type2']);`

생성된 Blob 객체는 아래와 같습니다. 기본적으로 size와 type (mime type) 속성을 가지는 것을 확인할 수 있습니다.

![](./blob%20object.png)

객체 생성 시 마임타입을 아래와 같이 옵션으로 지정 가능합니다.

```jsx
const blob = new Blob(["type1", "type2"], {
  type: "text/plain",
});
```

2. slice(startIndex, endIndex, typeForNewlyCreatedBlob)

   하위에 다른 Blob 형식을 가지는 Blob 변환할 때 사용합니다.

```jsx
const blob = new Blob(["type1", "type2"], {
  type: "text/plain",
});

blob.slice(0, 1, "text/plain");
```

### Blob URL 생성하기

Blob을 활용하여 아래와 같이 URL을 생성할 수 있습니다.

```jsx
const url = URL.createObjectURL(
  new Blob(["type"], {
    type: "text/plain",
  })
);
```

### Blob 데이터 가져오기

Blob에 저장된 데이터를 가져오기 위해 response를 사용하거나 fileReader를 사용합니다.

1. Response()

```jsx
const blob = new Blob(["type1", "type2"], {
  type: "text/plain",
});

const text = await new Response(blob).text();
```

2. FileReader()

```jsx
const blob = new Blob(["type1", "type2"], {
  type: "text/plain",
});

let text;
const reader = new FileReader();
reader.addEventListener("loadend", () => {
  text = reader.result;
});
reader.readAsDataURL(blob);
```

### 참고자료

- [데이터 타입 - Blob](https://jin-co.tistory.com/101)
