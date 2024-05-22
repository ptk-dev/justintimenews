const http = require("http");
const { exec } = require("child_process");
const { join } = require("path");
let is_active = false;

function waitForSummarizerToActivate() {
  if (is_active) return;
  return new Promise((resolve) => {
    http
      .createServer((req, res) => {
        res.write("Done");
        res.end();
        is_active = true;
        resolve();
      })
      .listen(3333);
    exec(`python ${join(__dirname, "../python/app.py")}`);
  });
}

async function ask(article) {
  await waitForSummarizerToActivate();
  let TARGET_URL = "http://localhost:5000/ask";
  let option = {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ article }),
    method: "POST",
  };
  let response = await (await fetch(TARGET_URL, option)).json();
  return response;
}

module.exports = { ask };
