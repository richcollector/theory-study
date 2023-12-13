## HTTP

클라이언트-서버 모델을 따르는 프로토콜로 TCP/IP 위에서 동작하며 well-known 포트인 80번 포트를 사용하여 통신합니다. 첫번째 표준은 HTTP/1.1이며 이후로 HTTP/2 및 HTTP/3가 등장하였습니다. 여기선 HTTP/1.1의 내용을 정리합니다.

### 특징

- 비-연결 지향 (Connectionless)

  클라이언트가 서버에게 리소스를 요청한 후 응답을 받으면 연결을 끊어버리는 특징이 있습니다. 연결을 유지하게 되면 서버에 많은 부담을 줄 수 있기 때문에 상당히 많은 클라이언트에게 요청을 받는 웹 서버의 경우 응답을 처리했으면 연결을 끊습니다. 이로 인해 서버의 부담을 줄일 수 있지만, 리소스를 요청할 때마다 연결해야 하는 오버헤드 비용이 발생합니다. 이를 해결하기 위해선, 요청 헤더의 Connection: keep-alive 속성으로 지속적 연결 상태(Persistent connection)를 유지할 수 있습니다. 즉, 요청을 할 때마다 연결하지 않고 기존의 연결을 재사용하는 방식입니다. HTTP 1.1 부턴 지속적 연결 상태가 기본이며 이를 해제하기 위해선 명시적으로 요청 헤더를 수정해야 합니다.

- 무상태성 (Stateless)

  각각의 요청이 독립적으로 여겨지는 특징으로, 서버는 클라이언트의 상태를 유지하지 않습니다. 즉, 각 클라이언트에 맞게 리소스를 응답하는 것은 불가능합니다. 이를 해결하기 위해, 쿠키나 세션 또는 토큰 방식의 OAuth 및 JWT가 사용됩니다.

- Method

  클라이언트가 서버에 요청방법을 정의하는 것으로 주어진 리소스에 수행하길 원하는 행동을 나타냅니다.

- GET

  서버에게 조회할 리소스를 요청합니다. (READ, 조회)

- POST

  서버에게 본문(body)에 생성할 데이터를 삽입하여 전송합니다. (CREATE, 생성)

- PUT

  서버에게 본문에 수정할 데이터를 삽입하여 전송합니다. (UPDATE, 수정)

- DELETE

  서버에게 삭제할 리소스를 요청합니다. (DELETE, 삭제)

- PATCH

  PUT과 비슷하지만 일부만 수정한다는 점에서 다릅니다.

### 응답 상태코드

서버가 클라이언트에게 요청을 받으면 응답상태에 따라서 다른 상태코드를 클라이언트에게 돌려줍니다.

- 1xx (요청에 대한 정보)

  요청을 받았으면 작업을 계속합니다.

- 2xx (성공)

  요청을 성공적으로 수행했다는 응답입니다.

  200(성공), 201(새 리소스 작성), 202(요청 접수, 아직 처리는 안함)

- 3xx (리다이렉션)

  클라이언트가 요청을 마치기 위해 추가적인 동작을 취해야 합니다.

  300(여러개의 응답, 선택해야 함), 301(영구이동, 요청한 페이지가 영구적으로 이동됨), 302(임시이동, 현재 응답잉 다른 페이지이긴 하지만 임시적임)

- 4xx (클라이언트 오류)

  클라이언트에 오류가 있습니다.

  401(권한 없음), 403(금지됨, 리소스에 대한 권한 없음), 404(찾을 수 없음, 서버에 없는 페이지)

- 5xx (서버 오류)

  서버에 오류가 있습니다.

  500(내부 서버오류), 501(요청수행 기능없음, 메서드 인식불가), 503(서비스 사용불가)

### Request

![](./Request%20Message.png)

#### Start Line

HTTP request의 start line 또한 3부분으로 구성되어 있습니다.

```jsx
GET /test.html HTTP/1.1
[HTTP Method] [Request target] [HTTP version]
```

- HTTP Method

  해당 request가 의도한 action을 정의하는 부분입니다.
  HTTP Methods 에는 GET, POST, PUT, DELETE, OPTIONS 등등이 있습니다.
  주로 GET과 POST가 쓰입니다.

- Request target

  HTTP Request가 전송되는 목표 주소입니다.

- HTTP Version

  HTTP 버전. 버전에는 1.0, 1.1, 2.0 등이 있습니다.

#### 헤더 (Headers)

해당 request에 대한 추가 정보(addtional information)를 담고 있는 부분예를 들어, request 메세지 body의 총 길이 (Content-Length) 등 Key:Value 형태로 구성되어있습니다.
headers도 크게 3가지 부분으로 나뉩니다. (general headers, request headers, entity headers)

- 요청 헤더

  - Host : 서버의 도메인 이름과 TCP 포트번호 (표준 포트는 생략 가능)

    `Host: en.wikipedia.org:8080`

  - Content-Type : POST/PUT 메서드를 사용할 때 본문의 타입

    `Content-Type: application/x-www-form-urlencoded`

  - If-Modified-Since : 명시한 날짜 이후로 변경된 리소스만 획득

    `If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT`

  - Origin : 요청이 어느 도메인에서 왔는지 명시, 서버의 Access-Control-\* 속성에 필요

    `Origin: http://www.example-social-network.com`

  - Cookie : 서버의 Set-Cookie 로 설정된 쿠키 값

    `Cookie: $Version=1; Skin=new;`

#### body

HTTP Request가 전송하는 데이터를 담고 있는 부분으로 전송하는 데이터가 없다면 body 부분은 비어있습니다.
보통 post 요청일 경우, HTML 폼 데이터가 포함되어 있습니다.

```jsx
POST /test HTTP/1.1

Accept: application/json
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 83
Content-Type: application/json
Host: google.com
User-Agent: HTTPie/0.9.3

{
    "test_id": "tmp_1234567",
    "order_id": "8237352"
}
```

### Response

HTTP Response Message는 request와 동일하게 공백(blank line)을 제외하고 3가지 부분으로 나누어집니다.

#### status line

HTTP Response의 상태를 간략하게 나타내주는 부분으로 status line또한 3가지 부분으로 구성되어 있다.

- HTTP version
- Status Code
- Status Text

```jsx
HTTP/1.1 200 OK
[HTTP version] [Status Code] [Status Text]
```

### 헤더 (Headers)

Request의 headers와 동일하지만, response에서만 사용되는 header 값들이 있습니다.

- Access-Control-\* : CORS를 허용하기 위한 웹사이트 명시

  `Access-Control-Allow-Origin: \*`

- Set-Cookie : 클라이언트에 쿠키 설정

  `Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1`

- Last-Modified : 요청한 리소스가 마지막으로 변경된 시각

  `Last-Modified: Tue, 15 Nov 1994 12:45:26 GMT`

- Location : 3xx 상태 코드일 때, 리다이렉션 되는 주소

  `Location: http://www.w3.org/pub/WWW/People.html`

- Allow : 요청한 리소스에 대해 가능한 메서드들

  `Allow: GET, HEAD`

#### body

Response의 body와 일반적으로 동일하고, Request와 마찬가지로 모든 response가 body가 있지는 않습니다.
데이터를 전송할 필요가 없을경우 body가 비어있게 됩니다.

### 참고자료

- [[HTTP] HTTP 구조 및 핵심 요소](https://velog.io/@mokyoungg/HTTP-HTTP-%EA%B5%AC%EC%A1%B0-%EB%B0%8F-%ED%95%B5%EC%8B%AC-%EC%9A%94%E3%85%85)
- [[간단정리] HTTP Request/Response 구조](https://hahahoho5915.tistory.com/62)
