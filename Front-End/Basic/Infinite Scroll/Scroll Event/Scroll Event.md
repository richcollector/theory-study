### 스크롤 이벤트 (Scroll Event)

- Scroll Event를 이용한 useInfiniteScroll Custom Hook 만들기

  우선, Scroll Event를 최적화 하기전에, Custom Hook으로 useInfiniteScroll을 만들어 줘야 합니다.

설계 방식은 `[isFetching, setIsFetching] = useInfiniteScroll(fetchCallback)` 과 같은 방식으로 만들어서 custom Hook을 사용하는 곳에서 setIsFetching을 통해서도 접근 할 수 있게 하였습니다.

```jsx
import { useState, useEffect } from "react";

export default function useInfiniteScroll(fetchCallback) {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollThrottle);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottle);
    };
  }, []);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    fetchCallback();
  }, [isFetching]);

  return [isFetching, setIsFetching];
}
```

- window.innerHeight

  지금 화면으로 보이는 윈도우의 높이

- document.documentElement.scrollTop

  현재 화면이 어느 화면의 어느 좌표를 보고있는지를 알려주는 top 좌표 (얼만큼 스크롤했느냐로 생각하면 됩니다.)

- document.documentElement.offsetHeight

  스크롤을 포함한 전체 페이지 길이이다.

다음과 같이 구현할 경우 컴포넌트에서 아래와 같이 사용 할 수 있습니다.

```jsx
const [isFetching, setIsFetching] = useInfiniteScroll(updateFunctionOnScroll);

async function updateFunctionOnScroll() {
  try {
    const result = await fetchFunction();
    setState(result);
  } catch (error) {
    setErrorState(error.message);
  } finally {
    setIsFetching(false);
  }
}

useEffect(() => {
  updateFunctionOnScroll();
}, []);
```

#### Scroll Event 최적화

위와 같이 무한스크롤을 구현하면, scroll event가 너무 많이 발생하므로 throttle를 이용한 방법으로 최적화를 시키는 것이 가장 일반적인 방법입니다.
그리고 더 나아가서 RAF(requestAnimationFrame) 를 이용해 Animation frames를 이용해서도 최적화를 시킬 수 있습니다.

- throttle

  throttle를 이용하면 Scroll Event의 핸들러가 호출되는 정도를 조절 할 수 있습니다.

lodash의 throttle 사용.

예를들어서 300ms를 기준으로 설정해놓는다면, scroll을 하고 있는 동안에는 300ms씩 마다 이벤트 핸들러가 호출이되어서 scroll event 핸들러의 호출 빈도를 줄일 수 있습니다.

```jsx
import { useState, useEffect } from "react";
import { throttle } from "lodash";

const THROTTLE_WAIT = 300;

export default function useInfiniteScroll(fetchCallback) {
  const [isFetching, setIsFetching] = useState(false);

  const handleScrollThrottle = throttle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setIsFetching(true);
    }
  }, THROTTLE_WAIT);
  useEffect(() => {
    window.addEventListener("scroll", handleScrollThrottle);
    return () => {
      window.removeEventListener("scroll", handleScrollThrottle);
    };
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchCallback();
  }, [isFetching]);

  return [isFetching, setIsFetching];
}
```

- RAF 사용

  위의 throttle을 사용하는 방법은 throttle이 내부적으로 setTimeout을 기반으로 작동하기 때문에 우리 예상대로인 300ms씩 마다 발생해야 되지만, 무조건 300ms마다 발생시켜준다고 보장되지 않습니다.

이 말이 무슨말인가 하면, 300ms마다 작동되지않고 콜스택이 비워지지않고 다른 기능에 밀리다 밀려서 300ms가 훨씬 지난 시점에 발생할 수도 있다는 얘기입니다.

requestAnimationFrame는 브라우저가 렌더링하는 빈도 60fps(초당 60회)에 맞춰서 실행되는데, 이 말은 초당 60회의 실행을 좀 더 보장해준다는 말입니다.

브라우저가 렌더링 되기 직전에 넘겨준 콜백 함수가 실행됩니다.

requestAnimationFrame도 똑같이 비동기로 작동되는 것이기 때문에 완벽하게 보장하지 않기도 하고 콜스택에 의해 밀릴 수도 있지만, requestAnimationFrame은 setTimeout이 처리되는 task queue보다 우선순위에 있는 animation frame에서 처리되기 때문에 좀 더 최적화 된 방법이라 할 수 있습니다.

또 requestAnimationFrame을 이용하면 300ms라는 기준을 잡지 않고 60fps에 맞춰 실행되기 때문에 300ms와 같은 별다른 기준점을 주지않아도 됩니다.

다음으로 소스는 throttle과 같은 최적화를 시켜주는(실행 빈도 조절) 함수를 별도로 만들어야 합니다.

```jsx
export default function throttleOnRendering(cb) {
  if (!cb) {
    throw Error("Invalid required arguments");
  }

  let tick = false;

  return function () {
    if (tick) {
      return;
    }

    tick = true;
    return requestAnimationFrame(() => {
      tick = false;
      return cb();
    });
  };
}
```

소스에 대한 자세한 내용은 원본 문서를 참조하고, 브라우저 렌더링 실행 빈도에 맞춰서 실행빈도를 조절 할 수 있게 해줍니다.

쉽게말해 브라우저 렌더링에 편승하는 것 입니다.

이 throttleOnRendering을 이용하면 아래와 같이 코드를 구현할 수 있습니다.

```jsx
import { useEffect, useState } from "react";

import throttleOnRendering from "../utils/throttleOnRendering";

export default function useInfiniteScroll(fetchCallback) {
  const [isFetching, setIsFetching] = useState(false);

  const handleScrollThrottle = throttleOnRendering(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setIsFetching(true);
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScrollThrottle);
    return () => {
      window.removeEventListener("scroll", handleScrollThrottle);
    };
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchCallback();
  }, [isFetching]);

  return [isFetching, setIsFetching];
}
```

### 참고자료

- [[React] infinite scroll을 구현해보자](https://velog.io/@ohsg97/React-infinite-scroll)
- [하옹의 프론트앤드 이야기 - Infinite Scroll(무한 스크롤)](https://ha-young.github.io/2021/frontend/infinite-scroll/)
