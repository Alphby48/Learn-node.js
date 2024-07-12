// syncronus

const getUser = (id) => {
  const name = id === 1 ? "sandika" : "galih";
  return { name, id };
};

const client1 = getUser(1);
console.log(client1);
const client2 = getUser(2);
console.log(client2);
const client3 = "hello";
console.log(client3);
