const express = require("express");
const expressLayout = require("express-ejs-layouts"); //expressLayout
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
} = require("./utils/contact");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const app = express();
const port = 3000;

// konfigurasi flash

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

//
app.set("view engine", "ejs");

// third-party middleware
app.use(expressLayout);

// build in middleware
app.use(express.static("public"));

// Aplication level middleware

app.use(express.urlencoded({ extended: true }));

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
    msg: req.flash("msg"),
  });
});

app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layout/layo",
    title: "add contact",
  });
});

app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplicat = cekDuplikat(value);
      if (duplicat) {
        throw new Error("nama contact sudah terdaftar");
      }
      return true;
    }),
    check("email", "Email tidak valid!..").isEmail(),
    check("nohp", "nomor hp anda tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "add contact",
        layout: "layout/layo",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      req.flash("msg", "data berhasil ditambahkan");
      res.redirect("/contact");
    }
  }
);

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
