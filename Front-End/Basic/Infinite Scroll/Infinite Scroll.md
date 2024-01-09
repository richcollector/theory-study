## infinite scroll

일반적으로 무한스크롤 기능이 필요할 때에는 정보를 한꺼번에 가져와서 보여주기엔 정보량이 많거나 무거워서 api fetch로 받는 결과가 느릴 때, 스크롤을 통해 아주 작은 일부분만 가져와 추가로 보여주면서 사용자 경험을 높이는 기술이자 인터페이스라 할 수 있습니다.

즉, Scroll End 지점까지 가면 다시 추가정보 fetch를 계속해나가는 방식입니다.

### infinite scroll vs Pagination

기본적으로 Infinite Scroll과 Pagination은 정보를 일부분만 가져와서 보여주고, 성능상의 이점을 제공해준다는 점은 동일하나, 사용자 경험적인 측면에서는 많은 차이가 있습니다.

- Infinite Scroll

  - 장점

    사용자 참여 및 콘텐츠 탐색이 쉽습니다.
    클릭하는 것보다 더 나은 사용자 경험을 제공합니다.
    모바일에 적합합니다.

  - 단점

    스크롤을 해서 가져오는 정보가 많아질 수록 페이지 성능이 느려집니다.
    정보 탐색이 힘듭니다. (특정 항목, 첫 위치로 돌아오기가 힘듦)
    스크롤 막대로 정확한 정보량을 알 수 없습니다. (끝에 도달하면 새로 갱신되기 때문에 언제 끝날지 모름)
    푸터를 찾기 힘듭니다.

- Pagination

  - 장점

    사용자 의도에 맞게 페이지를 넘길 수 있습니다.
    사용자가 페이지에 통제감을 느낄 수 있습니다.
    특정 항목의 위치를 파악 및 찾기가 쉽습니다.

  - 단점

    ‘클릭’ 혹은 ‘다음페이지’를 클릭해야되는 번거로움이 있습니다.
    한페이지에서 매우 제한된 내용을 봅니다.

- Infinite Scroll과 Pagination의 용도

위와 같은 장단점들을 잘 고려해서 상황에 따라 적절한 인터페이스를 선택하면 되겠지만, 기본적으로 InfiniteScroll은 이미지, 동영상(썸네일) 등 빠르게 정보를 파악할 수 있는 곳에서 사용됩니다. (페이스북, 유튜브, 인스타그램)

Pagination은 정보 파악이 느리거나 목표지향적인 곳에서 사용됩니다. (게시판)

### 방법

- scroll event
- IntersectionObserver

**scroll event**는 우리가 익히 사용했던 DOM scroll event를 이용 하는 것이기 때문에 익숙해서 상대적으로 구현은 쉽지만, 이 scroll event에 throttle 혹은 RAF로 최적화를 해줘야 된다는 점이 있고, **IntersectionObserver**는 익숙하지 않으면 익히는데 시간이 걸리기 때문에 상대적으로 어렵고, 페이지 맨 마지막에 가시성 감지를 위한 target 요소를 만들어야 되는 단점이 있습니다.

전체적인 Scroll에 반응하는 Scroll Event 대신 IntersectionObserver를 이용하는 것이 성능상 더 효율적이긴 하겠지만, 상황에 맞게 구현하는 것이 훨씬 중요하다고 생각합니다.

Scroll Event에서 쓰이는 documentElement.scrollTop과 documentElement.offsetHeight는 reflow를 일으켜서 성능상 좋지 않습니다.

### 참고자료

- [[React] infinite scroll을 구현해보자](https://velog.io/@ohsg97/React-infinite-scroll)
- [하옹의 프론트앤드 이야기 - Infinite Scroll(무한 스크롤)](https://ha-young.github.io/2021/frontend/infinite-scroll/)
