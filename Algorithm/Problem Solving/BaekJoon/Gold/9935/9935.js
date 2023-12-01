// 메모리...
// let fs = require("fs");

// const filePath =
//   process.platform === "linux"
//     ? "/dev/stdin"
//     : "./Algorithm/Problem Solving/BaekJoon/백준예제.txt";

// let input = fs.readFileSync(filePath).toString().split("\n");

// let [a, b] = input.map((line) => line.replace(/\r/g, ""));
// let pattern = new RegExp(b, "g");

// while (true) {
//   if (!a.includes(b)) return console.log(a ? a : "FRULA");
//   a = a.replace(pattern, "");
//

// 시간이 많이

// let fs = require("fs");

// const filePath =
//   process.platform === "linux"
//     ? "/dev/stdin"
//     : "./Algorithm/Problem Solving/BaekJoon/백준예제.txt";

// let input = fs.readFileSync(filePath).toString().split("\n");
// input = input.map((line) => line.replace(/\r/g, ""));

// const solution1 = input => {
//   const [string, target] = input
//   const targetL = target.length
//   const stack = []
//   for (let i = 0; i < string.length; i++) {
//     stack.push(string[i])
//     while (targetL <= stack.length) {
//       const temp = stack.slice(-targetL).join('')
//       if (temp === target) stack.splice(-targetL, targetL)
//       else break
//     }
//   }
//   console.log(stack.length > 0 ? stack.join('') : 'FRULA')
// }

// solution1(input);

let fs = require("fs");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./Algorithm/Problem Solving/BaekJoon/백준예제.txt";

let input = fs.readFileSync(filePath).toString().split("\n");
input = input.map((line) => line.replace(/\r/g, ""));

const solution2 = (input) => {
  const [string, target] = input;
  const targetL = target.length;
  const stack = [];

  for (let i = 0; i < string.length; i++) {
    if (target[targetL - 1] === string[i]) {
      let flag = true;
      for (let j = 1; j < targetL; j++) {
        if (target[targetL - 1 - j] !== stack[stack.length - j]) {
          flag = false;
          stack.push(string[i]);
          break;
        }
      }
      if (flag) {
        let count = targetL - 1;
        while (count--) stack.pop();
      }
    } else stack.push(string[i]);
  }

  console.log(stack.length > 0 ? stack.join("") : "FRULA");
};

solution2(input);
