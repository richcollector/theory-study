## MIME-Type (Multipurpose Internet Mail Extensions)

파일 변환을 의미합니다.현재는 웹을 통해 여러 형태의 파일을 전달하는데 사용하고 있지만 이 용어가 생길 땐 이메일과 함께 동봉할 파일을 텍스트 문자로 전환해서 이메일 시스템을 통해 전달하기 위해 개발되어 Internet Mail Extensions라고 불리기 시작했다고 합니다.

- MIME 사용 이유

  예전에는 텍스트 파일을 주고 받는데에 ASCII로 공통된 표준에 따르기만 하면 문제가 없었으나 네트워크를 통해 ASCII가 아닌 바이너리 파일을 보내는 경우가 생기게 되었습니다. 음악파일, 무비파일, 워드파일 등등 ASCII만으로는 전송이 안되기 때문에 기존 시스템에서 문제 없이 전달하기 위해서는 텍스트로의 변환이 필요합니다.

텍스트 파일로 변환하는 것을 인코딩(Encoding), 텍스트 파일을 바이너리 파일로 변환하는 것을 디코딩(Decoding)이라고 한다.

MIME으로 인코딩한 파일은 Content-type정보를 앞부분에 담게되며 Content-type은 여러가지 타입이 있습니다.

웹 브라우저에서 서버에 접속하여 html 문서를 요청하면서 html문서에 있는 이미지 파일의 경로를 불러올 수 있습니다. 이러한 과정에서 이미지의 경로에 있는 파일이 웹브라우저에서 지원되는 MIME-Type이라면 웹브라우저를 이용하여 열어볼 수 있습니다.

바이너리파일(음악 파일, 무비 파일, 워드 파일 등) 또한 마찬가지 입니다. 주로 쓰고 있는 대부분의 포맷인 .gif .jpg .mov 등등의 파일들은 웹 브라우저에서 무리없이 열리게 되는데 브라우저에서 지원하지 못하는 유형은 따로 지정해줘야 합니다.

### Content-Type

우리가 클라이언트 브라우저로 어떤 자원을 보낼때(어떤 형태의 파일이나 문서 등), 웹 서버는 일련의 HTTP 헤더로 파일이나 자원을 포함하는 바이트의 Stream을 앞에 보냅니다. 이런 헤더는 클라이언트에게 웹 서버와 커뮤니케이션 세부사항을 묘사합니다. 예를 들어, 헤더는 사용되고 있는 웹 서버의 소프트웨어의 타입, 서버의 날짜와 시간, HTTP 프로토콜, 사용중인 커넥션 타입등을 지정합니다. 헤더는 또한 클라이언트가 이런 가상 패스나 도메인에 대해서 저장해야 할 쿠키를 포함합니다.

### Content-Type의 종류

1. Multipart Related MIME 타입

- Content-Type: Multipart/related (기본형태)

- Content-Type: Application/X-FixedRecord

2. XML Media의 타입

- Content-Type: text/xml

- Content-Type: Application/xml

- Content-Type: Application/xml-external-parsed-entity

- Content-Type: Application/xml-dtd

- Content-Type: Application/mathtml+xml

- Content-Type: Application/xslt+xml

3. Application의 타입

- Content-Type: Application/EDI-X12 (Defined in RFC 1767)

- Content-Type: Application/EDIFACT (Defined in RFC 1767)

- Content-Type: Application/javascript (Defined in RFC 4329)

- Content-Type: Application/octet-stream : (디폴트 미디어 타입은 운영체제 종종 실행파일, 다운로드를 의미)

- Content-Type: Application/ogg (Defined in RFC 3534)

- Content-Type: Application/x-shockwave-flash (Adobe Flash files)

- Content-Type: Application/json (JavaScript Object Notation JSON; Defined in RFC 4627)

- Content-Type: Application/x-www-form-urlencode (HTML Form 형태)

* x-www-form-urlencode와 multipart/form-data은 둘다 폼 형태이지만 x-www-form-urlencode은 대용량 바이너리 테이터를 전송하기에 비능률적이기 때문에 대부분 첨부파일은 multipart/form-data를 사용하게 됩니다.

4. 오디오 타입

- Content-Type: audio/mpeg (MP3 or other MPEG audio)

- Content-Type: audio/x-ms-wma (Windows Media Audio)

- Content-Type: audio/vnd.rn-realaudio (RealAudio; 등등)

5. Multipart 타입

- Content-Type: multipart/mixed: MIME E-mail;

- Content-Type: multipart/alternative: MIME E-mail;

- Content-Type: multipart/related: MIME E-mail (Defined in RFC 2387 and used by MHTML(HTML mail))

- Content-Type: multipart/formed-data (파일 첨부)

6. TEXT 타입

- Content-Type: text/css

- Content-Type: text/html

- Content-Type: text/javascript

- Content-Type: text/plain

- Content-Type: text/xml

7. file 타입

- Content-Type: application/msword (doc)

- Content-Type: application/pdf (pdf)

- Content-Type: application/vnd.ms-excel (xls)

- Content-Type: application/x-javascript (js)

- Content-Type: application/zip (zip)

- Content-Type: image/jpeg (jpeg, jpg, jpe)

- Content-Type: text/css (css)

- Content-Type: text/html (html, htm)

- Content-Type: text/plain (txt)

- Content-Type: text/xml (xml)

- Content-Type: text/xsl (xsl)

### 참고자료

- [MIME-Type,Content-Type이란?](https://juyoung-1008.tistory.com/m/4)
- [MIME type이란?](https://velog.io/@aerirang647/MIME-type%EC%9D%B4%EB%9E%80)
