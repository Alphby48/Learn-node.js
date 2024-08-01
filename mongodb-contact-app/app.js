const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { body, validationResult, check } = require("express-validator");
const methodeOverride = require("method-override");

// Access Database
require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// Setup method override
app.use(methodeOverride("_method"));

// Setup engine

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// setup flash

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

// Halaman Home

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

// Halaman About

app.get("/about", (req, res) => {
  res.render("about", { layout: "layout/layo", title: "About" });
});

// Halaman Contact

app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();

  console.log(contacts);
  res.render("contact", {
    layout: "layout/layo",
    title: "Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

// halaman Add Contact

app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layout/layo",
    title: "add contact",
  });
});

// proses tambah add contact

app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplicat = await Contact.findOne({ nama: value });
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
      Contact.insertMany(req.body, (err, result) => {
        req.flash("msg", "data berhasil ditambahkan");
        res.redirect("/contact");
      });
    }
  }
);

// delete contact

app.delete("/contact", async (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }, (result) => {
    req.flash("msg", "data berhasil dihapus");
    res.redirect("/contact");
  });
});

// edit contact

app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    layout: "layout/layo",
    title: "edit contact",
    contact,
  });
});

// edit contact proses

app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplicat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplicat) {
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
      res.render("edit-contact", {
        title: "edit contact",
        layout: "layout/layo",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        req.flash("msg", "data berhasil ditambahkan");
        res.redirect("/contact");
      });
    }
  }
);

//halaman detail

app.get("/contact/:nama", async (req, res) => {
  // const detailContact = findContact(req.params.nama);
  const detailContact = await Contact.findOne({ nama: req.params.nama });

  res.render("detail", {
    layout: "layout/layo",
    title: "detail contact",
    contacts: detailContact,
  });
});

// run
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
