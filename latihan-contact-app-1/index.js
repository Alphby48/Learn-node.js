const { pertanyaan, simpanFile } = require("./contact");
const main = async () => {
  const nama = await pertanyaan("Masukan Nama Anda.. ");
  const nomor = await pertanyaan("Masukan Nomor HP Anda.. ");
  const email = await pertanyaan("Masukan Email Anda.. ");

  simpanFile(nama, nomor, email);
};

main();
