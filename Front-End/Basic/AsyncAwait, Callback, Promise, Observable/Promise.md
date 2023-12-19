### Promise

Promise를 정의하고 정의할 때에 인자 값으로 resolve(res), reject(rej) 인자 값을 전달합니다. 안에서 res로 어떠한 값을 전달하고, rej는 에러를 전달합니다. Promise 수행은 promise 객체를 담은 변수에 .then을 사용하여 전달받은 data를 console.log(data)로 콘솔창에 출력하는 것을 볼 수 있습니다. then은 작업수행이 완료되면 실행이 되게 됩니다.

- 프로미스 체이닝은 result가 .then 핸들러의 체인(사슬)을 통해 전달된다는 점에서 착안한 아이디어입니다.

=> axios, fetch(모던 브라우저 내장) 등 => 대표적인 Promise를 지원하는 기능입니다.

- 실행코드

```jsx
new Promise((성공했을때실행시킬함수, 실패했을때실행시킬함수) => {
    try {
    //여기서 API 요청을 한다면??
        const response = "철수"; // 백엔드에서 "철수" 데이터 받아옴
        성공했을때실행시킬함수(); //성공하면 이거
    } catch (error) {
        실패했을때실행시킬함수(); // 실패하면 이거 실행
    }
}
//axios 사용

const myPromise = () => {
    axios.get(`http://numbersapi.com/random?min=1&max=200`).then((qqq) => {
        axios.get(`http://numbersapi.com/random?min=1&max=200`).then((qqq) => {
            axios.get(`http://numbersapi.com/random?min=1&max=200`).then((qqq) => {
            // qqq최종결과
            });
        });
    });
};

//위 코드를 아래와 같이 바꿀 수 있음

console.log("1번째로실행");
axios
    .get(`http://numbersapi.com/random?min=1&max=200`)
    .then((qqq) => {
    console.log("2번째로실행");

    return axios.get(`http://numbersapi.com/random?min=1&max=200`);
    })
    .then((qqq) => {
    console.log("3번째로실행");

    return axios.get(`http://numbersapi.com/random?min=1&max=200`);
    })
    .then((qqq) => {
    //  qqq최종결과
    console.log("4번째로실행");
    });
console.log("5번째로실행");
```
