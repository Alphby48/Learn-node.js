const express = require("express");
const expressLayout = require("express-ejs-layouts"); //expressLayout
const { loadContact, findContact } = require("./utils/contact");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// third-party middleware
app.use(expressLayout);

// build in middleware
app.use(express.static("public"));

// Aplication level middleware

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
  const contact = loadContact();
  console.log(contact);
  res.render("contact", {
    layout: "layout/layo",
    title: "Contact",
    contacts: contact,
  });
});

app.get("/contact/:nama", (req, res) => {
  const detailContact = findContact(req.params.nama);
  res.render("detail", {
    layout: "layout/layo",
    title: "detail contact",
    contacts: detailContact,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("404 not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
