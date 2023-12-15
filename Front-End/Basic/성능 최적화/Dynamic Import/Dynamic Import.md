## 다이나믹 임포트 (Dynamic Import) - 코드 스플리팅 (Code Splitting)

필요한 시점에 import하여, 초기 로딩 속도를 줄일 수 있다.

```jsx
     useEffect(() => {
       // 필요 시점에 다운로드 받자!
       async function aaa(): Promise<void> {
         const { Modal } = await import("antd");   code-splitting(코드스플릿팅)
       }
       void aaa();
     }, []);
응용

  // 메모리 누수가 생길 수 있음.
const qqq = [];

export default function ImagePreloadPage(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    // 이미지 태그가 만들어짐
    const img = new Image();
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/2/22/The-Last-Supper-Restored-Da-Vinci_32x16.jpg";
    img.onload = () => {
      qqq.push(img);
    };
  }, []);

  const onClickMove = (): void => {
    void router.push("/section31/31-09-image-preload-moved");
  };
```

### 추가사항

Next에서는 - next/dynamic, React 에서는 react/lazy를 사용하여 원할 때 동적으로 import하는 기능을 제공한다.
