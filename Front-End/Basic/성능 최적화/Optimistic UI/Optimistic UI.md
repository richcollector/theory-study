## 옵티미스틱 ui (Optimistic-UI)

내용

캐시수정 과정에서 주로 사용하는데, 낙관적인 UI라는 뜻과 같이 특정 API가 설공할 것을 가정하고 그 결과를 먼저 보여주는 것이다.

덜 중요하면서, 실패해도 문제가 안되고, 성공 확률도 99%인 곳에서 주요 사용된다.
예시코드

```jsx
const onClickLike = (): void => {
  void likeBoard({
    variables: {
      boardId: "64c38cdf5d6eaa0029f77ca3",
    },
    //   refetchQueries: [{}],
    //   optimisticResponse: {
    //     likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
    //   },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: FETCH_BOARD,
        variables: { boardId: "64c38cdf5d6eaa0029f77ca3" },
        data: {
          fetchBoard: {
            _id: "64c38cdf5d6eaa0029f77ca3",
            __typename: "Board", //리턴타입
            likeCount: data?.likeBoard, // 좋아요 갯수(6)
          },
        },
      });
    },
  });
};
```
