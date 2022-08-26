import { createPool, DatabasePool } from "slonik";

const psqlDb = (async () => {
  return await createPool(
    "postgresql://postgres:pintio@localhost:5432/inventoria"
  );
})();

export default psqlDb;
