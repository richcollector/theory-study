/* 
    객체의 생성
*/

const obj1 = new Object();
const obj2 = {};
const obj3 = { name: "김태완", company: "co" };
console.log(obj1);
console.log(obj2);
console.log(obj3);

// 객체의 추가
const obj = { name: "김태완", company: "co" };
obj["email"] = "ktw9115@naver.com";
obj.phone = "010-3919-9115";
console.log(obj);

// 객체의 삭제
delete obj.phone;
console.log(obj);

// in
console.log("email" in obj);
console.log("phone" in obj);

// key group
console.log(Object.keys(obj));

// value group
console.log(Object.values(obj));

// for in
// 객체의 key 값을 순회
for (const key in obj) {
  console.log(key);
}
