const { simpanFile } = require("./contact");
// mengambil argumen dari cmd
const yargs = require("yargs");
const contact = require("./contact");

yargs
  .command({
    command: "add",
    describe: "menambahkan kontak baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor HP",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      simpanFile(argv.nama, argv.noHP, argv.email);
    },
  })
  .demandCommand();

//Menambahkan command list contact
yargs.command({
  command: "list",
  describe: "menampilkan list contact",
  handler() {
    contact.listContact();
  },
});

// menambahakan command detail

yargs.command({
  command: "detail",
  describe: "menampilkan detail list contact",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contact.detailContact(argv.nama);
  },
});

// menambahakan command delete

yargs.command({
  command: "delete",
  describe: "menghapus contact",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contact.hapusContact(argv.nama);
  },
});

yargs.parse();
