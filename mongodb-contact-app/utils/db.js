const mongoose = require("mongoose");
const { type } = require("os");
mongoose.connect("mongodb://127.0.0.1:27017/wpu", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// // menambah 1data
// const contact1 = new Contact({
//   nama: "denzuko",
//   nohp: "081234567890",
//   email: "denzuko@gmail.com",
// });

// //simpan ke collections

// contact1.save().then((res) => console.log(res));
