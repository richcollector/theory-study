### Pre-rendering

웹 페이지의 HTML을 서버에서 미리 생성하는 작업을 말합니다.
브라우저에 전달하여 빠르게 구조를 먼저 보여줍니다.
React 프로젝트를 Next.js를 통해 프리렌더링을 하면 빈 HTML 대신 프리렌더링된 HTML 파일을 제공하므로 검색엔진 최적화가 가능합니다.

#### 프리렌더링 예제

- process.browser

```jsx
if (process.browser) {
  console.log("지금은 브라우져입니다.");
  const result = localStorage.getItem("accessToken");
  setAccessToken(result ?? "");
} else {
  console.log("지금은 프론트엔드 서버입니다.");
}
```

- typeof window

```jsx
if (typeof window !== "undefined") {
  console.log("나는 브라우져입니다.");
} else {
  console.log("지금은 프론트엔드 서버입니다.");
}
```

### 참고자료

- [[Next.js] Hydration](https://velog.io/@hamjw0122/Next.js-Hydration)
