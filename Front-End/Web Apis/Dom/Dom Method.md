## DOM

### DOMParser

### DOMParser:parseFromString()

DOM Document 문서에 맞는 XML 및 HTML 소스 코드를 해석할 수 있는 기반을 제공하고, parseFromString()는 HTML DOMParser또는 XML이 포함된 문자열을 구문 분석하여 HTMLDocument를 반환합니다.

- 사용법

  let domparser = new DOMParser();
  let doc = domparser.parseFromString(string, mimeType);

  - 인자

    이 메소드에는 2개의 인자가 제공되는데, 모두 필수값이다.

    - string

      해석할 DOMString 문자열. 반드시 HTML, xml, xhtml+xml 또는 svg 문서 형식에 맞아야 한다.

    - mimeType

      | 표에 정의한 형식을 반환 값으로 제공할 DOMString 문자열 |  mimeType   | doc.- constructor |
      | :----------------------------------------------------: | :---------: | :---------------: |
      |                       text/html                        |  Document   |                   |
      |                        text/xml                        | XMLDocument |                   |
      |                    application/xml                     | XMLDocument |                   |
      |                 application/xhtml+xml                  | XMLDocument |                   |
      |                     image/svg+xml                      | XMLDocument |                   |

```jsx
const parser = new DOMParser();

const xmlString = "<warning>Beware of the tiger</warning>";
const doc1 = parser.parseFromString(xmlString, "application/xml");
// XMLDocument

const svgString = '<circle cx="50" cy="50" r="50"/>';
const doc2 = parser.parseFromString(svgString, "image/svg+xml");
// XMLDocument

const htmlString = "<strong>Beware of the leopard</strong>";
const doc3 = parser.parseFromString(htmlString, "text/html");
// HTMLDocument

console.log(doc1.documentElement.textContent);
// "Beware of the tiger"

console.log(doc2.firstChild.tagName);
// "circle"

console.log(doc3.body.firstChild.textContent);
// "Beware of the leopard"
```
