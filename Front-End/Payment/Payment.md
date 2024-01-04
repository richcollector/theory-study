## 결제 프로세스 이해

- 카드사와의 소통

  결제를 하려면 카드사와 협업을 해야하지만, 카드사 하나 하나와의 계약을 하는 것보다 카드사와의 의사소통울 대신해주는 곳을 이용하는 것이 좋습니다.

  - pg사(Payment Gateway: 결제를 대신해주는 입구)가 이 힘든 과정을 대신 해줍니다.

- 계약 조건에 따른 변경

  nhn, nice 등과 미팅을 잡고 계약이 이루어 지게 되면, pdf로 사용방식을 넘겨줍니다. 회사를 바꿀 때마다 사용 방식이 달라지니 바꾸기가 힘듭니다.

이것들을 쉽게 접근할 수 있게 만든 결제 솔루션사가 개발해서 키값으로 연결되게 해놓았습니다. 포트원(구 아임포트) 부트페이 등이 있습니다.

### 결제 방식

- 결제 승인 번호가 날라옵니다.

  `imp_uid: imp_123456, amount: 5000원` 등

- 백엔드에서 검증을 한번 더 거친 다음에 저장이 됩니다.

### 카드사의 승인 과정

- 회사의 결제 로직을 담은 PPT

  - PG사 전달

  - 카드사들에 뿌려서 통과한 곳부터 쓸 수 있게 됩니다.

  - 재심사 요청이 된 곳은 다시 심사를 받으면 된다.

- 결제실패요인

  도박 / 불법 / 경매 / 결제 금액 직접입력 등등

- 결제연동 최소일정

  - PG계약 (1주일 정도 소요) ⇒ 카드심사 (2주일 정도 소요)

  - 최소한 3주일이라는 물리적인 시간이 필요합니다.

- 회사 운영 방식에 따른 기간 설정

  - 자체 서비스 구축 회사

    회사의 마케팅, 개발일정 등 고려해서 기간 설정

  - 다른 회사 서비스 만들어주는 회사

    그 회사의 일정에 맞춰 3~4주 전에 요청

### 포트원(그 아임포트)

결제 연동 (내 식별코드 ・ API Keys)

- 가맹점 식별코드

  프론트엔드에서 주로 사용

- REST API Key

  백엔드에서 주로 사용

- 결제대행사 설정 및 추가

  테스트인지 실연동인지, 어떤 방식으로 결제를 진행할 건지 선택을 하면 일반결제와 정기결제를 선택 할 수 있습니다.

콘솔 가이드를 보면 Docs처럼 어떻게 설정할 수 있는지 설명이 나와있습니다.

#### 결제 기능 구현

개발자 센터, 인증결제 연동포트

- 포트원 라이브러리 추가

  결제관련 API쪽을 보면 결제취소 API 결제 상세내역 조회 API 등을 볼 수 있습니다.

- 라이브러리

  - 객체 초기화 하기

    가맹점 식별코드 필요

  - 결제 요청하기

    자바스크립트, 리액트 , 뷰 사용법으로 나뉘어져 있습니다.

  - 주문번호가 겹치지 않게 사용

    이 부분을 주석처리하면 주문번호가 랜덤으로 생성됩니다.

  - javascript SDK

    소프트웨어 디벨로프먼트 키트

    javascript SDK 부분의 값으로 넣어줍니다.

  - typescript에서의 window

    declare IMP를 해줘야 window에서 이것이 있다는 것을 인지합니다.

```jsx
declare const window: typeof globalThis & {
IMP: any;
};
```

### 주의사항

- 가상계좌 설정시 필수

  실 결제 전용 결제알림 (Webhook)
  Endpoint URL => 백엔드 개발자가 만들어 놓으면 가상계좌 알림이 들어갑니다.

- 모바일모드에서는 주소가 다른 곳으로 가집니다.

  가상계좌처럼 실 결제 전용 결제알림 (Webhook)으로 백엔드로 알려주기
  `m_redirect_url: "주소"`
  원래 주소를 남겨줌 결제 끝나고 돌아갈 주소 설정해주기

- 테스트 여도 문자메세지 같은 것으로 내용이 날라옵니다.

```jsx
declare const window: typeof globalThis & {
IMP: any;
};

export default function PaymentPage(): JSX.Element {
const onClickPayment = (): void => {
const IMP = window.IMP; // 생략 가능
IMP.init("가맹점식별코드넣기"); // 예: imp00000000a

    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011", // 주문번호 // 주석처리하면 알아서 생성됨.
        name: "마우스",
        amount: 64900, // 숫자 타입
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/section28/28-01-payment",
        //모바일에서는 결제시, 페이지 주소가 바뀜. 따라서, 결제 끝나고 돌아갈 주소 입력해야함.
      },
      function (rsp: any) {
        // callback
        //rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단합니다.

        console.log("rsp::", rsp);
        // 백엔드에 결제관련 데이터 넘겨주기 => 즉, 뮤테이션 실행하기
        // createPointTransactionOfLoading
      }
    );

};
return (
<>

<script src="https://cdn.iamport.kr/v1/iamport.js"></script>

<button onClick={onClickPayment}>결제하기</button>
</>
);
}
```
