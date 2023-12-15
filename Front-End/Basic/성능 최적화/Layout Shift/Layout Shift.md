## 레이아웃 쉬프트 (Layout Shift)

### 문제점

화면이 렌더링 되면서 화면이 뚝떨어지는 현상.
여기 저기서 일어나게 되면, 사용자가 보기가 안 좋다.
network에서 속도를 조절하여 확인 하자.

### 해결방안

값이 없을 경우에는 더미 데이터를 넣자. 이렇게 더미 데이터를 넣어두면, 미리 영역을 설정하여 레이아웃 쉬프트 현상을 없애자.

```jsx
<div>
  {(data?.fetchBoards ?? new Array(10).fill(1)).map((el) => (
    <div key={el._id} style={{ height: "30px" }}>
      <span>
        <input type="checkbox" />
      </span>
      {/* 원래 변수를 생성하여 넣어야 하는데 바로 넣어서 {{}} 두 번 넣어줘야함 */}
      <span style={{ margin: "10px" }}>{el._id}</span>
      <span style={{ margin: "10px" }}>{el.title}</span>
      <span style={{ margin: "10px" }}>{el.writer}</span>
    </div>
  ))}
  {/* fill(1) 1로 채워줌 */}
  {new Array(10).fill("철수").map((_, index) => (
    <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
      {index + 1}
    </span>
  ))}
</div>
```
