import express from "express";

const app = express();
const port = 5000;

let leaks = [];

app.get("/", (req, res) => {
  for (let i = 0; i < 100000; i++) {
    leaks.push(new Array(1000).join("x"));
  }
  res.send(`Memory leak page. Current leaks length: ${leaks.length}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
