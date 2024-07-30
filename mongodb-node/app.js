const { MongoClient, ObjectID } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbNama = "wpu";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log(`koneksi gagal`);
  }

  //pilih database
  const db = client.db(dbNama);

  // menambahkan 1 data ke collection mahasiswa

  db.collection("mahasiswa").insertOne(
    {
      nama: "erik",
      email: "erik@gmail.com",
    },
    (error, result) => {
      if (error) {
        return console.log("gagal connect database");
      }
      console.log(result);
    }
  );

  // menambahkan lebih dari 1 data

  db.collection("mahasiswa").insertMany(
    [
      {
        nama: "dea afrizal",
        email: "deaafrizal@gmail.com",
      },
      {
        nama: "avip",
        email: "avip@gmail.com",
      },
    ],
    (error, result) => {
      if (error) {
        return console.log(`gagal terhubung database`);
      }

      console.log(result);
    }
  );

  // menampilkan sekuruh data

  console.log(
    db
      .collection("mahasiswa")
      .find()
      .toArray((err, res) => {
        console.log(res);
      })
  );

  //menampilkan data berdasarkan kriteria

  console.log(
    db
      .collection("mahasiswa")
      .find({ _id: ObjectID("66a8c1e0cb4e703b34bda44a") })
      .toArray((err, res) => {
        console.log(res);
      })
  );

  //mengubah 1 data berdasarkan id

  const updatePromise1 = db.collection("mahasiswa").updateOne(
    {
      nama: "erik",
    },
    {
      $set: {
        nama: "erika",
      },
    }
  );

  updatePromise1
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  //mengubah banyak data berdasarkan kriteria

  const updatePromise = db.collection("mahasiswa").updateMany(
    {
      nama: "erika",
    },
    {
      $set: {
        nama: "hadi",
      },
    }
  );

  updatePromise
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  // menghapus 1 data

  db.collection("mahasiswa")
    .deleteOne({
      _id: ObjectID("66a72f86b864f72acbc4e49b"),
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  // menghapus lebih dari 1 data dengan kriteria

  db.collection("mahasiswa")
    .deleteMany({
      nama: "hadi",
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
