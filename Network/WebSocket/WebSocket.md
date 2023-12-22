## WebSocket

WebSocket이란 브라우저와 서버 간에 연결을 유지한 상태에서 양방향 소통이 가능하게끔 하는 기술이며, 이를 활용하여 상호 간의 실시간 데이터 교환이 가능한 환경을 구축할 수 있습니다. 이전까지 HTTP 메서드와 같은 기술은 브라우저가 서버에 요청을 보내면 서버가 응답을 하여 데이터 통신이 이루어지는 방식이었다면, **WebSocket은 서버가 먼저 브라우저에 데이터를 보내고 그에 따른 응답을 브라우저로부터 받아오는 것도 가능**하다는 의미입니다. 이러한 특징 때문에 온라인 게임, 채팅, 주식 거래 등 데이터 교환이 지속적으로 이뤄져야 하는 서비스에서 주로 사용되는 편입니다.

### 소켓의 구성 요소

소켓의 구성요소로는 프로토콜, IP 주소, 포트 번호가 있습니다.

- 프로토콜

  프로토콜은 데이터 전송을 위한 표준 집합 규칙이다. 주로 TCP/IP, UDP/IP 프로토콜을 사용합니다.

- IP 주소 (송 / 수신 측)

  IP 주소는 서버 장비 또는 네트워크 장비(호스트)를 주소로 표현한 것입니다. IP 주소는 호스트마다 하나씩 있으며 고유한 특성을 가지고있습니다.

- 포트번호 (송 / 수신 측)

  포트 번호는 통신을 사용하는 어플리케이션을 식별하는 번호입니다. 포트는 65535까지 사용할 수 있지만, 사용자가 사용할 수 있는 포트는 1024 ~ 65535까지 사용할 수 있습니다.

### 브라우저(JS) 측에서의 활용Permalink

WebSocket 기반으로 구축된 서버와 연결하기 위해 브라우저에선 WebSocket 객체를 활용하면 됩니다. 이 때, WebSocket 기반 통신의 경우 http나 https가 아닌 ws와 wss를 사용합니다.

`const socket = new WebSocket("ws://주소");`
이렇게 소켓을 생성하고 나면, 웹소켓 메서드와 이벤트를 통해 서버와 통신을 할 수 있습니다.

#### 이벤트

`addEventListner()` 혹은 on이벤트이름을 활용하여 서버로부터 들어오는 이벤트에 따라 특정한 작동을 하도록 하는 것을 의미합니다.

- open

  웹소켓 연결이 발생했음(open)을 의미합니다.

```jsx
socket.addEventListener("open", () => {
  console.log("WebSocket is open");
});

socket.onopen = () => {
  console.log("WebSocket is open");
};
```

- message

  웹소켓으로 연결된 서버로부터 데이터(message)가 수신되었음을 의미합니다.

```jsx
socket.addEventListener("message", (event) => {
  console.log("Message from server:", event.data);
});

socket.onmessage = (event) => {
  console.log("Message from server:", event.data);
};
```

- error

  웹소켓과의 연결이 잘못 되거나 데이터 전송의 실패 등의 오류가 발생했음을 의미합니다.

```jsx
socket.addEventListener("message", (error) => {
  console.log("Error has occured:", error);
});

socket.onerror = (error) => {
  console.log("Error has occured:", error);
};
```

- close

  웹소켓 연결이 닫혔음(closed)을 의미합니다.

```jsx
socket.addEventListener("close", () => {
  console.log("WebSocket is closed");
});

socket.onclose = () => {
  console.log("WebSocket is closed");
};
```

#### 메서드

웹소켓과의 연결을 닫거나 서버로 데이터를 전송할 때 사용됩니다.

- send

  브라우저로부터 서버로 데이터를 전송할 때 사용되는 메서드입니다.

```jsx
socket.onopen = (event) => {
  socket.send("Hello Server, we are connected");
};
```

- close()

  웹소켓 연결을 닫기 위해 사용되는 메서드입니다.

```jsx
socket.onerror = (error) => {
  socket.close();
  console.log("WebSocket connection is closed due to:", error);
};
```

#### 출처

- [[JavaScript] WebSocket의 기본](https://moon-ga.github.io/javascript/websocket/)
- [소켓(Socket)이란 뭘까?](https://shg-engineer.tistory.com/21)
