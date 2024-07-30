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

//menulis / menimpa file contact.json dengan data baru
const saveContacts = (contact) => {
  fs.writeFileSync("./data/contact.json", JSON.stringify(contact));
};

// menambahkan data kontak
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// cek nama duplikat

const cekDuplikat = (value) => {
  const contacts = loadContact();
  return contacts.find((c) => c.nama === value);
};

// hapus kontak
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filt = contacts.filter((f) => f.nama !== nama);
  saveContacts(filt);
};

// ubah kontak
const updateContacts = (nama) => {
  const contacts = loadContact();
  const filterContact = contacts.filter((c) => c.nama !== nama.oldNama);
  delete nama.oldNama;
  filterContact.push(nama);
  saveContacts(filterContact);
};

module.exports = {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
};
