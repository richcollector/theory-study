## 동기 vs 비동기

- javascript (동기적)

  등록 후 바로 불러오기 순으로 순차적인 작업이 필요할 때

- axios 등의 외부 설치프로그램 (비동기)

  동시에 여러 일을 할 때 사용한다.

### 비동기 함수

비동기 함수에서 언젠가는 돌려받을 데이터인데 아직 돌려받지 못한 상태

#### 비동기 함수의 3가지 상태

- fulfilled: 요청이 성공한 상태
- pending: 요청에 대한 응답을 기다리고 있는 상태
- rejected: 요청이 실패한 상태

```jsx
const promiseTest = function() ⇒ {
return new Promise((resolver, reject) ⇒ {
    setTimeout(()⇒{
        resolver(100);
        // 2초가 지나기 전에는 pending 상태가 됨
        // fulfilled 와 100을 응답으로 가져감
        // reject(`error`) //실패하였을 때 받아옴
    }, 2000);
});
}

promiseTest().then((res)⇒{
    console.log(res);
});
```

- pending 상태가 지나고, fulfilled가 되면 then이 실행 응답을 받아올 수 있다.

동기 비동기의 대한 기본적인 지식이 있어야 이해하기 수월하다.
