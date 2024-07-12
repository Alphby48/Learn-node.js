const { simpanFile } = require("./contact");
// mengambil argumen dari cmd
const yargs = require("yargs");

yargs.command({
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
});

yargs.parse();
