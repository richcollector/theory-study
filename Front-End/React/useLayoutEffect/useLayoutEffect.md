## useLayoutEffect

**DOM이 화면에 그려지기 이전 시점에 동기적으로 수행된다.** 즉 컴포넌트들이 render 된 후 실행되며, 그 이후에 paint 된다.
paint가 되기 전에 실행되기 때문에 DOM을 조작하는 코드가 존재하더라도 사용자는 깜빡임을 경험하지 않는다.

### 사용법

```jsx
useEffect(() => {
// do side effects
return () => /_ cleanup _/
}, [dependancy array]);

useLayoutEffect(() => {
// do side effects
return () => /_ cleanup _/
}, [dependancy array]);
```

useEffect와 useLayoutEffect 훅의 사용법은 100% 동일하다. 훅의 이름만 다르게 작성하면 된다.

### 주의점

공식 문서에 따르면, useLayoutEffect는 성능을 저하시킬 수 있기 때문에 가능하면 useEffect을 사용하라고 권고한다.
예를 들어 useLayoutEffect 내부 로직이 너무 복잡할 경우에는 사용자가 레이아웃을 보기까지 시간이 오래 걸린다. 따라서 조건에 따라 첫 painting 시에 다르게 렌더링 되어야 하는 경우에만 사용하는게 바람직하다.

또한, 서버 사이드 렌더링인 경우라면 자바스크립트가 모두 다운로드될 때까지는 useLayoutEffect와 useEffect 어느 것도 실행되지 않는다!

### 사용 예시

react로 모바일 웹 서비스 pic.me를 개발하며, 모바일 iOS 사파리 브라우저에서 '페이지별 상태바 색상이 동적으로 변경되는 기능' 을 구현한다고 해보자.
상태바 색상을 지정하기 위해서는 index.html파일의 head 부분에 meta 코드를 삽입해야 한다.

```jsx
// index.html

<head>
    <meta id="status-bar" name="theme-color" content="#000000">
</head>
상태바 색상을 해당 페이지의 배경색과 동일하게 변경해야 했고, 페이지 별 상이한 배경을 갖고 있기에 이를 핸들링할 수 있어야 했다. 따라서 이를 커스텀 훅으로 구현할 수 있다.

// useStatusBarColor.tsx
import { useLayoutEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

// 페이지별 상태바 색상 상수로 선언
export const STATUS_BAR_COLOR = {
LANDING_PAGE: '#FF6A69',
AUTH_PAGE: '#1E1F21',
GENERAL_PAGE: '#FFFFFF',
};

// 각 페이지의 경로에 따라 상태 표시줄 색상 매핑
export const STATUS_BAR_COLOR_USAGE = new Map([
['/', STATUS_BAR_COLOR.LANDING_PAGE],
['/login', STATUS_BAR_COLOR.AUTH_PAGE],
['/signup', STATUS_BAR_COLOR.AUTH_PAGE],
['/mypage', STATUS_BAR_COLOR.AUTH_PAGE],
]);

const useStatusBarColor = () => {
const location = useLocation();

const statusBarColor = useMemo(
useStatusBarColor
// ✅ 현재 경로에 해당하는 색상이 STATUS_BAR_COLOR_USAGE 맵 객체에 있다면 해당 색상을 사용하고, 없다면 기본 색상인 흰색 사용
() => STATUS_BAR_COLOR_USAGE.get(location.pathname) ?? STATUS_BAR_COLOR.GENERAL_PAGE,
[location],
);

// ✅ useLayoutEffect 훅을 사용하여, 상태바 색상을 변경하는 작업을 DOM이 그려지기 전에 수행하도록 함
useLayoutEffect(() => {
const metaElement = document.getElementById('status-bar');
if (!metaElement) return;
(metaElement as HTMLMetaElement).content = statusBarColor;
}, [statusBarColor]);
};

export default useStatusBarColor;
```

위와 같이 useLayoutEffect 훅에서 meta 태그에 사용한 id를 이용하여 DOM 명령어로 html element를 조작하였다. 그리고 해당 커스텀 훅을 페이지 전역에서 호출해주었다.
만약 useEffect을 사용한다면, 상태바 색상을 변경하는 작업이 페이지가 그려지고 난 뒤에 수행된다. 따라서 해당 작업을 DOM이 화면에 그려지기 전에 빠르게 적용하기 위해 useLayoutEffect을 사용할 수 있다.
