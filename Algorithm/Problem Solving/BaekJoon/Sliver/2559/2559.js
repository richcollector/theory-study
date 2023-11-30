let fs = require("fs");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : "./Algorithm/Problem Solving/BaekJoon/백준예제.txt";

let input = fs.readFileSync(filePath).toString().split("\n");
input = input.map((line) => line.replace(/\r/g, ""));

let [N, K] = input[0].split(" ").map((n) => parseInt(n));
let arr = input[1].split(" ").map((n) => parseInt(n));
let sum = arr.slice(0, K).reduce((acc, curnt) => acc + curnt, 0);
let answer = sum;
for (let i = 0; i < N - K; i++) {
  sum += arr[i + K] - arr[i];
  if (sum > answer) {
    answer = sum;
  }
}
console.log(answer);

console.log(sumL);
