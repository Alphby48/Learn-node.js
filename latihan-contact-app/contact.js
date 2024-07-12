// raedline
const readline = require("node:readline");
const fs = require("fs");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });
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

const pertanyaan = (tanya) => {
  return new Promise((resolve, reject) => {
    rl.question(tanya, (nama) => {
      resolve(nama);
    });
  });
};

const simpanFile = (nama, nomor, email) => {
  const contact = {
    nama: nama,
    nomor: nomor,
    email: email,
  };
  const file = fs.readFileSync("./data/contact.json", "utf-8");
  const contactJson = JSON.parse(file);

  contactJson.push(contact);
  fs.writeFileSync("./data/contact.json", JSON.stringify(contactJson, null));
  console.log(`terima kasih ${nama} telah memasukan data..`);
  rl.close();
};

module.exports = { simpanFile, pertanyaan };
