const chalk = require("chalk");
const fs = require("fs");
const validator = require("validator");
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

//load contact

const loadContact = () => {
  const file = fs.readFileSync("./data/contact.json", "utf-8");
  const contactJson = JSON.parse(file);
  return contactJson;
};

const simpanFile = (nama, nomor, email) => {
  const contact = {
    nama: nama,
    nomor: nomor,
    email: email,
  };
  const contactJson = loadContact();

  // cek duplikat
  const duplikat = contactJson.find((cj) => cj.nama === nama);

  if (duplikat) {
    console.log(
      chalk.red.inverse.bold(
        `nama ${nama} sudah ada silahkan pakai nama lain atau tambahkan nama lengakap`
      )
    );
    return false;
  }
  //cek email
  if (!validator.isEmail(email)) {
    console.log(chalk.red.inverse.bold(`nama email '${email}' tidak valid`));
    return false;
  }
  //cek nomor telepon
  if (!validator.isMobilePhone(nomor, "id-ID")) {
    console.log(
      chalk.red.inverse.bold(
        `nomor telepon '${nomor}' tidak valid gunakan format Indonesia`
      )
    );
    return false;
  }

  contactJson.push(contact);
  fs.writeFileSync("./data/contact.json", JSON.stringify(contactJson, null));
  console.log(
    chalk.green.inverse.bold(`terima kasih ${nama} telah memasukan data..`)
  );
};

// menambahkan fungsi listContact

const listContact = () => {
  const contactJson = loadContact();
  contactJson.forEach((cj, i) => {
    console.log(`${i + 1}. ${cj.nama} - ${cj.nomor}`);
  });
};

// menambahkan fungsi detailContact
const detailContact = (nama) => {
  const contactJson = loadContact();
  const kontak = contactJson.find(
    (c) => c.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!kontak) {
    console.log(chalk.red.inverse.bold(`nama '${nama}' tidak ditemukan`));
    return false;
  }

  console.log(chalk.green.inverse.bold(`nama: ${kontak.nama}`));
  console.log(chalk.blue.inverse.bold(`nomor: ${kontak.nomor}`));
  if (kontak.email) {
    console.log(chalk.yellow.inverse.bold(`email: ${kontak.email}`));
  }
};

const hapusContact = (nama) => {
  const contactJson = loadContact();
  const kontak = contactJson.filter(
    (c) => c.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contactJson.length === kontak.length) {
    console.log(chalk.red.inverse.bold(`nama '${nama}' tidak ditemukan`));
    return false;
  }

  fs.writeFileSync("./data/contact.json", JSON.stringify(kontak, null));
  console.log(
    chalk.green.inverse.bold(`terima kasih ${nama} telah menghapus data..`)
  );
};

module.exports = { simpanFile, listContact, detailContact, hapusContact };
