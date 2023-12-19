## AsyncAwait

async 와 await은 Promise를 조금 더 간편하게 사용 할 수 있도록 도와주며 동기적으로 실행되는 것 처럼 보이게 하는 문법입니다.

### async 개념

async 키워드는 function 앞에 사용합니다. function 앞에 async를 붙이면 해당 함수는 항상 프라미스를 반환합니다. 프라미스가 아닌 값을 반환하더라도 이행 상태의 프라미스(resolved promise)로 값을 감싸 이행된 프라미스가 반환되도록 합니다.
아래 예시의 함수를 호출하면 result가 1인 이행 프라미스가 반환됩니다.

```jsx
async function f() {
  return 1;
}

f().then(alert); // 1
위 함수에서 1을 Promise.resolve로 감싸도 같은 결과를 반환한합니다.

async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

즉, async가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸 반환합니다.

### await

await는 async 함수 안에서만 동작합니다. await는 ‘기다리다'라는 뜻을 가진 영단어 인데, 프라미스가 처리될 때 까지 기다리는 역할을 합니다. 그리고 결과는 그 이후 반환됩니다.

```jsx
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000);
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

  alert(result); // "완료!"
}

f();
```

- 함수를 호출하고, 함수 본문이 실행되는 도중에 (\*)로 표시한 줄에서 실행이 잠시 '중단’되었다가 프라미스가 처리되면 실행이 재개됩니다.
- 이때 프라미스 객체의 result 값이 변수 result에 할당됩니다. 따라서 위 예시를 실행하면 1초 뒤에 '완료!'가 출력됩니다.

await는 말 그대로 프라미스가 처리될 때까지 함수 실행을 기다리게 만듭니다. 프라미스가 처리되면 그 결과와 함께 실행이 재개됩니다. 프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비되지 않습니다.

- await를 사용하지 않았다면 데이터를 받아온 시점에 콘솔을 출력할 수 있게 콜백 함수나 .then()
  등을 사용해야 합니다. 하지만 async await 문법덕에 비동기에 대한 사고를 하지 않아도 됩니다.
- 또한, await는 promise.then보다 좀 더 세련되게 프라미스의 result 값을 얻을 수 있도록 해주는 문법입니다.  
  promise.then보다 가독성 좋고 쓰기도 쉽습니다.

- 코드사용

```jsx
const myAsyncAwait = async () => {
  await axios.get(`http://numbersapi.com/random?min=1&max=200`);
  await axios.get(`http://numbersapi.com/random?min=1&max=200`);
  await axios.get(`http://numbersapi.com/random?min=1&max=200`);
};
// 에러처리;
try {
  await axios.get(`http://numbersapi.com/random?min=1&max=200`);
} catch (error) {
  console.log("error::", error);
}
```

### 주의사항

- async await 에러 제어

  await가 던진 에러는 throw가 던진 에러를 잡을 때처럼 try, catch를 사용해 잡을 수 있습니다.

```jsx
async function f() {
  try {
    let response = await fetch("http://유효하지-않은-주소");
  } catch (err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```

에러가 발생하면 제어 흐름이 catch 블록으로 넘어간다. 또한, 여러 줄의 코드를 try로 감쌀 수 있습니다.

- async/await와 promise.then/catch

  async/await을 사용하면 await가 대기를 처리해주기 때문에 .then이 거의 필요하지 않습니다. 또한, catch 대신 일반 try, catch를 사용할 수 있다는 장점도 있습니다. 항상 그러한 것은 아니지만, promise.then을 사용하는 것보다 async/await를 사용하는 것이 대개는 더 편리합니다.

  그런데 문법 제약 때문에 async함수 바깥의 최상위 레벨 코드에선 await를 사용할 수 없다. 그렇기 때문에 관행처럼 .then/catch를 추가해 최종 결과나 처리되지 못한 에러를 다룹니다.

---

#### 출처

- [동기, 비동기란? (+Promise, async/await 개념)](https://velog.io/@khy226/%EB%8F%99%EA%B8%B0-%EB%B9%84%EB%8F%99%EA%B8%B0%EB%9E%80-Promise-asyncawait-%EA%B0%9C%EB%85%90#:~:text=9%2F16-,1.%20%EB%8F%99%EA%B8%B0%20vs.%20%EB%B9%84%EB%8F%99%EA%B8%B0,%EC%8B%A4%ED%96%89%ED%95%98%EB%8A%94%20%EA%B2%83%EC%9D%84%20%EC%9D%98%EB%AF%B8%ED%95%9C%EB%8B%A4.)
