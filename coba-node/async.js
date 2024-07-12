const getUserAsync = (id, callback) => {
  let time = id === 1 ? 3000 : 2000;
  setTimeout(() => {
    const name = id === 1 ? "sandika" : "galih";
    callback({ name, id });
  }, time);
};

const getUser1 = getUserAsync(1, (result) => {
  console.log(result);
});
const getUser2 = getUserAsync(2, (result) => {
  console.log(result);
});

const hello = "hello";
console.log(hello);
