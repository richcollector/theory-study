## A + B

```jsx
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on("line", (line) => {
  lines.push(line.split(" "));
}).on("close", () => {
  for (let i = 1; i <= lines[0]; i++) {
    console.log(
      "Case #" + i + ":",
      lines[i].map(Number).reduce((a, c) => a + c, 0)
    );
  }
  process.exit();
});
```
