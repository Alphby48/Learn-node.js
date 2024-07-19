const http = require("http");
const fs = require("fs");
http
  .createServer((req, res) => {
    const url = req.url;

    if (url === "/about") {
      renderHTML("./about.html", res);
    } else if (url === "/contact") {
      res.write(`about page`);
      res.end();
    } else {
      renderHTML("./index.html", res);
    }
  })
  .listen(3000, () => {
    console.log("Server is listening on port 3000..");
  });

function renderHTML(path, res) {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write(`not found`);
    } else {
      res.write(data);
    }
    res.end();
  });
}
