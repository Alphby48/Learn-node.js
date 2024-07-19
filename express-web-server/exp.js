const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
  //   res.json({
  //     user: "tobi",
  //     message: "Hello World!",
  //   });
});

app.get("/user/:id", (req, res) => {
  res.send(`user ID: ${req.params.id} Category: ${req.query.category}`);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404 not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
