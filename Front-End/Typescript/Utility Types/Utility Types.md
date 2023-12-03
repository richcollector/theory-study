## Utility Types

아래의 기준이 되는 자료를 바탕으로 데이터를 골라올 수 있다.

```jsx
export interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}
```

### Partial 타입

```jsx
// 모두가 있어도 되고 없어도 되구..
type aaa = Partial<IProfile>;
```

### Required 타입

```jsx
// 모두가 있어야 하는 것
type bbb = Required<IProfile>;
```

### Pick 타입

```jsx
// 특정 Key를 뽑아서 구성한 타입을 구성한다.
type ccc = Pick<IProfile, "name" | "age">;
```

### Omit 타입

```jsx
// 특정 Key를 지운 타입을 구성한다.
type ddd = Omit<IProfile, "school">;
```

### 5. Record 타입

```jsx
type eee = "철수" | "영희" | "훈이"; //Union타입
// eee 타입을 주면 철수, 영희, 훈이만 넣을 수 있음.
type fff = Record<eee, IProfile>;
```

### 객체의 key들로 Union타입 만들기

```jsx
type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby"
let myprofile: ggg = "hobby";
```

### type vs interface 차이 => interface는 선언병합 가능

```jsx
export interface IProfile {
  candy: number; //선언병합으로 추가됨
}

let profile: Partial<IProfile> = {
  candy: 10,
};
```
