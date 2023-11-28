## pack과 hierarchy(stratify) - circle pack 그래프 그리기

- pack은 계층구조의 그림을 그릴 수 있는 데이터를 생성합니다. 보통 circle pack으로 그림을 그립니다.
- 이를 위해 계층구조 데이터를 가공하는 메서드가 필요한데 그 메서드가 바로 hierarchy(하이어러키, 계층구조) 입니다.
  [d3-hierarchy/README.md at v1.1.8 · d3/d3-hierarchy](https://github.com/d3/d3-hierarchy/blob/v1.1.8/README.md#hierarchy)
  d3.hierarchy()와 d3.stratify()는 계층 데이터를 가공합니다. 이렇게 만들어진 node은 each, ancestors, descendants 등에 메서드를 가집니다.
  1. each는 순회하며 각 노드에 속성을 적용할 때 사용합니다.
  2. ancestors는 조상 노드를 반환합니다.
  3. descendants는 정렬된 배열을 반환합니다.
