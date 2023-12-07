### Callback

함수의 인자로 들어가는 함수를 콜백함수라 하고, 실행 권한을 넘기는 것이다.

- 실행코드

```jsx
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <script>
      function addEventListener(aaa, bbb) {
        // 셋팅된 API 주소로 요청!!
        const res = 70; //셋팅된 API 주소로부터 받아온 결과

        if (aaa === "load") {
          bbb(res);
        }
      }

      // 실행 제어권을 넘긴다. 콜백함수! aaa야 콜백함수줄테니 실행시켜줘!

      const myCallback = () => {
        const aa = new XMLHttpRequest();
        aa.open("get", `http://numbersapi.com/random?min=1&max=200`);
        aa.send();
        aa.addEventListener("load", (res) => {
          console.log("res:", res); //API 요청 결과
          const num = res.target.response.split(" ")[0]; // 랜덤숫자

          const bb = new XMLHttpRequest();
          bb.open("get", `https://koreanjson.com/posts/${num}`);
          bb.send();
          bb.addEventListener("load", (res) => {
            console.log("resbb:", res); //API요청 결과
            const userId = JSON.parse(res.target.response).UserId; //  8(작성자 ID)

            const cc = new XMLHttpRequest();
            cc.open("get", `https://koreanjson.com/posts?userId=${userId}`);
            cc.send();
            cc.addEventListener("load", (res) => {
              console.log(res); //최종 API 요청 결과
            });
          });
        });
      };
    </script>
```

#### 콜백지옥

- 위처럼 코드가 복잡해져 이 해결방안으로 Promise가 나오고 프로미스 체이닝(promise chaining)이 나온다.
