// raedline
const readline = require("node:readline");
const fs = require("fs");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });

rl.question("siapa nama anda? ", (answer) => {
  rl.question("masukan no hp anda..", (noHp) => {
    const contact = {
      nama: answer,
      nomor: noHp,
    };
    const file = fs.readFileSync("./dist/contact.json", "utf-8");
    const contactJson = JSON.parse(file);

    contactJson.push(contact);
    fs.writeFileSync("./dist/contact.json", JSON.stringify(contactJson, null));
    console.log(`terima kasih ${answer} telah memasukan data..`);
    rl.close();
  });
});
