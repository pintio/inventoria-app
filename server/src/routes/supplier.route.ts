import express, { Request } from "express";

import {
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  getSuppliersData,
  postSupplier,
} from "../controllers/supplier.controller";

const router = express.Router();

// to get column names and types
router.get("/suppliersdata", getSuppliersData);

router.get("/allsuppliers", getAllSuppliers);

// to get only one category matching the id
router.get("/api/get/supplier/:id", getSupplierById);

router.post("/supplier/:name", postSupplier);

router.delete("/supplier/:id", deleteSupplier);

module.exports = router;
