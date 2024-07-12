//core Module

// File System
const fs = require("fs");

//menuliskan file secara Syncronus
try {
  fs.writeFileSync("dist/text.txt", "hello world");
} catch (e) {
  console.log(e);
}

// menuliskan file secara asyncronus
fs.writeFile("text.txt", "hello-world asynchronous q", (e) => {
  console.log(e);
});

// membaca isi file syncronous
const cetak = fs.readFileSync("./dist/text.txt", "utf-8");
console.log(cetak);

// membaca isi file asyncronous
const cetak1 = fs.readFile("text.txt", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});

console.log(cetak1);

// raedline
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

rl.question("siapa nama anda? ", (answer) => {
  rl.question("masukan no hp anda..", (noHp) => {
    console.log(
      `terimakasih ${answer} telah menginputkan nomor HP dengan No ${noHp}`
    );
    rl.close();
  });
});
