const fs = require("fs");
const dirPath = "./data";

// cek folder data untuk menyimpan

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// cek file contact.json
const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

//ambil data

const loadContact = () => {
  const file = fs.readFileSync("./data/contact.json", "utf-8");
  const contactJson = JSON.parse(file);
  return contactJson;
};

//cek find

const findContact = (nama) => {
  const contactJson = loadContact();
  const kontak = contactJson.find(
    (c) => c.nama.toLowerCase() === nama.toLowerCase()
  );
  return kontak;
};

module.exports = { loadContact, findContact };

// ambil data
