import { createPool, DatabasePool } from "slonik";

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const psqlDb = (async () => {
  try {
    return await createPool(
      `postgresql://${userName}:${password}@localhost:5432/inventoria`
    );
  } catch (error) {
    console.log(error);
    throw new Error("could not connect to the database");
  }
})();

//  `postgresql://postgres:pintio@localhost:5432/inventoria`

export default psqlDb;
