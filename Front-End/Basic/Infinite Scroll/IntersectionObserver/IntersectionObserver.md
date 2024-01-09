### 구현하기 (IntersectionObserver)

IntersectionObserver는 요소의 가시성을 관찰할 수 있고, 해당 요소의 가시성에 대한 변화가 일어날 때마다 우리가 설정한 콜백함수를 실행시켜줍니다.

일종의 Pub-Sub 패턴이자 요소 가시성에 대한 이벤트를 부여한다고 볼 수 있습니다.

그리고 이 요소의 가시성이 변화할 때 마다 일어나는 콜백함수에서 가시성에 대한 조건을 걸어서 특정 조건일 때에만 특정 작업을 수행하도록 설정 할 수도 있습니다.

- IntersectionObserver를 사용한 useInfiniteScroll Custom Hook 만들기

  IntersectionObserver를 사용한 useInfiniteScroll() Custom Hook을 만들기 위해서는 위의 Scroll Event를 사용했던 useInfiniteScroll() 보다 인자가 더 필요한데, 바로 요소의 가시성에 대한 조건을 부여할 타겟 요소를 인자로 받아야 합니다.

추가로 IntersectionObserver에 대한 옵션값을 받아도 좋습니다.

`[isFetching, setIsFetching] = useInfiniteScroll(fetchCallback, targetElement, options)`

```jsx
import { useState, useEffect } from "react";

const defaultOptions = {
  root: null,
  rootMargin: "1px",
  threshold: "0.1",
};

export default function useInfiniteScroll(
  fetchCallback,
  targetElement,
  options = defaultOptions
) {
  const [isFetching, setIsFetching] = useState(false);

  const intersectionCallbackFunc = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsFetching(true);
      }
    });
    setIsFetching(false);
  };

  useEffect(() => {
    let observer;

    if (targetElement) {
      observer = new IntersectionObserver(intersectionCallbackFunc, options);
      observer.observe(targetElement);
    }

    return () => observer?.disconnect(targetElement);
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

- Line 12~20

  요소의 가시성의 변화가 일어났을 때 발생하게 될 Callback Function 선언

- Line 26~27

  요소에 가시성 변화 관찰하기

- Line 30

  요소 가시성 종료시키기 (Side Effect Clear)

### Throttle 혹은 RAF로 최적화

그리고 위의 Scroll Event 최적화 방법과 똑같이 요소의 가시성의 변화에 대해서 너무 자주일어나는 것이 우려된다면, Throttle이나 RAF를 사용해서 최적화를 시킬 수도 있습니다.

방법은 쉽게 Intersection Observer의 Callback 함수에 적용시키면 됩니다.

- Throttle

```jsx
import { useState, useEffect } from "react";
import { throttle } from "lodash";

const THROTTLE_WAIT = 300;

const defaultOptions = {
  root: null,
  rootMargin: "1px",
  threshold: "0.1",
};

export default function useInfiniteScroll(
  fetchCallback,
  targetElement,
  options = defaultOptions
) {
  const [isFetching, setIsFetching] = useState(false);

  const intersectionCallbackFuncThrottle = throttle((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsFetching(true);
      }
    });

    setIsFetching(false);
  }, THROTTLE_WAIT);

  useEffect(() => {
    let observer;

    if (targetElement) {
      observer = new IntersectionObserver(
        intersectionCallbackFuncThrottle,
        options
      );
      observer.observe(targetElement);
    }

    return () => observer?.disconnect(targetElement);
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

- RAF 적용

  Scroll Event에서 만들어 둔 throttleOnRendering() 를 사용합니다.

```jsx
import { useState, useEffect } from "react";

import throttleOnRendering from "../utils/throttleOnRendering";

const defaultOptions = {
  root: null,
  rootMargin: "1px",
  threshold: "0.1",
};

export default function useInfiniteScroll(
  fetchCallback,
  targetElement,
  options = defaultOptions
) {
  const [isFetching, setIsFetching] = useState(false);

  const intersectionCallbackFuncThrottle = throttleOnRendering((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsFetching(true);
      }
    });

    setIsFetching(false);
  }, THROTTLE_WAIT);

  useEffect(() => {
    let observer;

    if (targetElement) {
      observer = new IntersectionObserver(
        intersectionCallbackFuncThrottle,
        options
      );
      observer.observe(targetElement);
    }

    return () => observer?.disconnect(targetElement);
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

### 참고자료

- [[React] infinite scroll을 구현해보자](https://velog.io/@ohsg97/React-infinite-scroll)
- [하옹의 프론트앤드 이야기 - Infinite Scroll(무한 스크롤)](https://ha-young.github.io/2021/frontend/infinite-scroll/)
