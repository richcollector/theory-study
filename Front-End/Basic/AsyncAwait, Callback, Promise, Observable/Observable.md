하지만, 사실은 zen-onservable
가장유명한건 rxjs(반응형으로 반응해서 작성 )

flatMap은 들어온걸 순서대로 작업하게해준다.

// import { Observable } from "@apollo/client";
import { from } from "zen-observable";

export default function ObservableFlatmapPage(): JSX.Element {
const onClickButton = (): void => {
// new Promise((resolve, reject) => {});
// new Observable((observer) => {});

```
// 반응형 프로그래밍
from(["1번 useQuery", "2번 useQuery", "3번useQuery"]) //fromPromise
  .flatMap((el) => from([`${el}결과에 qqq 적용`, `${el} 결과에 zzz 적용`]))
  .subscribe((el) => {
    console.log(el);
  });//결과를 뽑아줌.

```

};
return <button onClick={onClickButton}>클릭</button>;
}

프로미스
비동기 작업 도와줘
옵저버블?
연속적인 비동기 작업 도와줘
rxjs가 제일 유명함.

프로미스 => 비동기작업 도와줘
옵저버블 => 연속적인 비동기 작업 도와줘
3페이지 요청하고 5페이지 요청할 경우
5페이지가 먼저 도착하면 문제!!

흐름이 있는 비동기작업
연속적인 페이지 클릭,
연속적인 검색어 변경
