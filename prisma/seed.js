const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({ data: user });
    })
  );
}

seed();

function getUsers() {
  return [
    {
      name: "akshay",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "anu",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "vishnu",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];
}
