const express = require("express");
const expressLayout = require("express-ejs-layouts"); //expressLayout
const morgan = require("morgan"); //morgan
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// third-party middleware
app.use(expressLayout);
app.use(morgan("dev"));
// build in middleware
app.use(express.static("public"));

// Aplication level middleware

app.use((req, res, next) => {
  console.log("time: ", Date.now());
  next();
});

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "riko",
      email: "riko@riko",
    },
    {
      nama: "doddy",
      email: "doddy@gmail.com",
    },
    {
      nama: "erik",
      email: "erik@gmail.com",
    },
  ];
  res.render("index", { layout: "layout/layo", title: "Express", mahasiswa });
});
app.get("/about", (req, res) => {
  res.render("about", { layout: "layout/layo", title: "About" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { layout: "layout/layo", title: "Contact" });
});

app.get("/user/:id", (req, res) => {
  res.send(`user ID: ${req.params.id} Category: ${req.query.category}`);
});

app.use((req, res) => {
  res.status(404);
  res.send("404 not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
