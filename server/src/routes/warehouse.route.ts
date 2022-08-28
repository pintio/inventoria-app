import express from "express";

import {
  deleteWarehouse,
  getAllWarehouse,
  getWarehouseById,
  getWarehouseData,
  postWarehouse,
} from "../controllers/warehouse.controller";

const router = express.Router();

// API

// to get column names and types
router.get("/warehousedata", getWarehouseData);

router.get("/allwarehouses", getAllWarehouse);

// to get only one wh matching the id
router.get("/warehouse/:id", getWarehouseById);

router.post("/warehouse/:name", postWarehouse);

router.delete("/warehouse/:id", deleteWarehouse);

module.exports = router;
