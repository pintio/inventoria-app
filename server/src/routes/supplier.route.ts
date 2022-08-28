import express, { Request } from "express";

import {
  deleteSupplier,
  getAllSuppliers,
  getSuppliersData,
  postSupplier,
} from "../controllers/supplier.controller";

const router = express.Router();

// to get column names and types
router.get("/suppliersdata", getSuppliersData);

router.get("/allsuppliers", getAllSuppliers);

// // to get only one category matching the id
// router.get(
//   "/api/get/supplier/:id",
//   async (req: Request<{ id: number }>, res) => {
//     try {
//       const { data, error } = await psqlDb
//         .from("suppliers")
//         .select("*")
//         .match({ s_id: req.params.id });
//       res.send(data);
//     } catch (e) {
//       console.log(e);
//     }
//   }
// );

router.post("/supplier/:name", postSupplier);

router.delete("/supplier/:id", deleteSupplier);

module.exports = router;
