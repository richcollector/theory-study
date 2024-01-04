## Web3.js

Web3.js 라이브러리는 이더리움 생태계를 위한 기능을 포함하는 모듈 모음입니다.

이더리움으로 DApp을 만드는 것은

    - 솔리디티(Solidity)언어로 스마트 컨트랙트를 개발하는 것
    - 블록체인과 상호작용하는 클라이언트를 개발하는 것

이 중 두번째인 "블록체인과 상호작용하는 클라이언트를 개발하는 것"을 위해 사용하는 라이브러리가 Web3.js입니다.

이더리움 블록체인과 JSON RPC(Remote Procedure Call)를 이용해 소통한다.

이더리움에서는 클라이언트가 JSON RPC 형식에 맞춰서 이더리움 노드에 데이터를 요청해야 하는데, Web3.js에서 바로 이 이더리움 네트워크와 상호작용할 수 있는 메서드를 제공한다.
이더리움 네트워크는 노드로 구성되어 있고, 각 노드는 블록체인의 복사본을 가지고 있다.
이때 web3.js와 연결된 노드를 provider 라고 한다.

Web3.js
실질적으로 JSON RPC API 와 함께 Ethereum의 "표준 API" 로 보면 되겠다.
web3.js 는 내부적으로 HTTP 나 IPC 를 통해 JSON RPC API를 호출하도록 되어있다.
이더리움 네트워크는 노드로 구성되어 있고, 각 노드는 블록체인의 복사본을 가지고 있다.
만약, 스마트 컨트렉트의 함수를 실행하고자 한다면 노드에 질의를 보내서 1.스마트 컨트렉트의 주소 2.실행할 함수 3.함수에 전달할 변수들 을 전달해야한다.
이더리움 노드들은 JSON-RPC로만 소통할 수 있고, 이는 개발자에게는 불편한 일이기 때문에 web3.js는 질의를 알지 못하는 개발자들도 쉽고 편리하게 자바스크립트 인터페이스로 상호작용할 수 있도록 해 준다. - 출처

### web3.js의 필요성

디앱(DApp)을 효율적으로 만들기 위해서!

📌 DApp에 대한 자세한 설명은 블록체인(Block chain) - 디앱(DApp)

Ethereum 네트워크는 여러 사용자(EOA)들이 연결되어있고, 특정 역할을 수행하는 smart contract들로 구성되어있다.
이 smart contract를 실행하기 위해서는 아래의 내용들을 전송해야한다.

스마트 컨트랙트의 주소
실행하고자 하는 함수
그 함수에 전달하고자 하는 변수들
위에서 설명했듯이, 클라이언트가 JSON RPC 형식에 맞춰서 이더리움 노드에 해당 데이터를 요청해야한다.
그래야만 smart contract를 실행할 수가 있다.

그런데,

" 클라이언트가 JSON RPC형식에 맞춰서 이더리움 노드에 데이터를 요청한다 "

이 부분은 생각보다 큰 문제이다.
왜냐면 JSON RPC은 이렇게 생겼다 우엑 🤮

컨트랙트 함수를 실행하고 싶다고 질의를 보내는 것의 형태

```json
{
  "jsonrpc": "2.0",
  "method": "eth_sendTransaction",
  "params": [
    {
      "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
      "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
      "gas": "0x76c0",
      "gasPrice": "0x9184e72a000",
      "value": "0x9184e72a",
      "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
    }
  ],
  "id": 1
}
```

DApp 을 만들기 위해서는

서비스를 이용하는 사람들간의 smart contract를 통해 거래, 혹은 ether 획득 등을 handling 해야 한다.
이더리움 노드들은 JSON RPC 언어로만 소통할 수 있다.
그런데 그 JSON RPC가 이렇게 생겨서야 사람이 못읽어서 무슨 수로 요청을 보낼까.....

다행히도 Web3.js 를 사용하면,
아래와 같은 형태로 요청을 보낼 수 있다!

```js
CryptoZombies.methods
  .createRandomZombie("Vitalik Nakamoto 🤔")
  .send({ from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155", gas: "3000000" });
```

👌 훨씬 쉬워졌군!

이런 DApp을 만들면서 web3.js가 나오면 항상 메타마스크도 같이 나오던데, 메타마스크가 뭐고, 대체 왜 쓰는거야?

### MetaMask

메타마스크는 사용자들이 이더리움 계정과 개인키를 안전하게 관리할 수 있게 해주는,
크롬/파이어폭스 브라우저 확장 프로그램이다.
해당 계정으로 Web3.js를 사용하는 웹사이트들과 상호작용을 할 수 있게 해준다!

DApp을 메타마스크와 호환시킨다는 것은,
사용자들이 웹 브라우저를 통해 내 DApp과 상호작용할 수 있다는 것.

메타마스크는 내부적으로 Infura의 서버를 Web3 프로바이더로 사용한다.
사용자들이 그들만의 Web3 프로바이더를 선택할 수 있는 옵션 또한 있다.
따라서 메타마스크의 Web3 Provider를 사용하도록 하자.

메타마스크는 web3 라는 전역 자바스크립트 객체를 통해,
브라우저에 Web3 Provider를 주입한다.

따라서 내 앱에서는 web3 객체가 존재하는지 확인하고,
존재한다면 web3.currentProvider를 Provider로 사용하면 되는 것.

2-1. web3 객체?
2-1-1. Injected Web3
웹 브라우저에 내장된 프로바이더

크롬 지갑인 메타마스크와 연동하여 사용한다.

web3 오브젝트에 대한 프로바이더로 메타마스크나 미스트 브라우저를 사용할 수 있다

미스트에서 리믹스를 실행하면 기본적으로 Injected Web3환경이 선택된다

미스트와 연결된 geth클라이언트를 사용한다

-미스트에서는 Injected Web3 환경에서 컨트랙트를 생성했을 때 트랜잭션이 처리되지만 생성된 컨트랙트가 화면에 표시되지 않는다.

여기서 web3 외부 API를 이용하면, 자신이 작성한 애플리케이션에서 이더리움 노드에 접근할 수 있다.

2-1-2. Web3 Provider
이더리움 클라이언트의 RPC 주소를 제공하도록 요청

메타마스크의 web3 Provider가 웹 브라우저에 내장될 수 있는데,
이걸 테스트 넷 또는 메인넷에 연결하도록 구성할 수 있고 이를 실제 네트워크와 상호작용하도록 할 수 있다.

메타마스크의 Web3 프로바이더로 Web3.js를 초기화하는 것.

왜 메타마스크가 제공하는 web3로 Web3 Provider를 초기화해야해?
메타 마스크는 계정 관리가 가능한데,
Web3 Provider의 경우는 계정 관리를 클라이언트에서해야 된다.
유저의 개인 키를 관리하는 것은 암호학과 관련되어 있어서 매우 복잡하다.

📌 세상을 바꿀 Web 3.0 - Web3.js 예제로 실습하기(1) 참조

geth나 Ganache 사용시에 이용한다.

원격 프로시저 호출(RPC, Remote Procedure Call)을 이용해서 리모트에 있는 geth 클라이언트를 사용할 수 있다. 원격 프로시저 호출을 사용하려면 geth 클라이언트 실행 시 --rpc 옵션을 지정해야하는데, 보통 8545포트를 기본 포트로 사용한다.
메타마스크가 제공하는 템플릿 코드
사용자가 메타마스크를 설치했는지 확인하고,
설치가 안되었다면 메타마스크를 설치해야한다고 알려주는 코드다.

이로써 메타마스크의 Web3 프로바이더로 Web3.js를 초기화된다.

window.addEventListener('load', function() {

// Web3가 브라우저에 주입되었는지 확인(Mist/MetaMask)
if (typeof web3 !== 'undefined') {
// Mist/MetaMask의 프로바이더 사용
web3js = new Web3(web3.currentProvider);
} else {
// 사용자가 Metamask를 설치하지 않은 경우에 대해 처리
// 사용자들에게 Metamask를 설치하라는 등의 메세지를 보여줄 것
}

// 앱을 시작하고 web3에 자유롭게 접근할 수 있다
startApp()

})
미스트(Mist)란?
메타마스크 말고도 사용자들이 쓸 수 있는 다른 개인 키 관리 웹브라우저.
이또한 web3 변수를 주입하는 동일한 형태를 사용한다.
그러니 사용자들이 다른 프로그램을 쓰더라도 여기서 설명하는 방식으로 사용자의 Web3 프로바이더를 인식할 수 있다.

다음편부터 실습을 해보자 😎

내가 예제를 참조한 Web3 코스가 있는데, Web3 개념을 이해하기에 너무 재미있다!
심지어 한글화도 되어있어서 어렵지않고 즐겁게 따라하고 있다.
https://cryptozombies.io/ko/lesson/6/chapter/1

### 참고자료

- [세상을 바꿀 Web 3.0 - Web3.js란?](https://velog.io/@devjeenie/%EC%84%B8%EC%83%81%EC%9D%84-%EB%B0%94%EA%BF%80-Web-3.0-Web3.js%EB%9E%80)