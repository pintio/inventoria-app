import express from "express";

import {
  categoriesData,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  postCategory,
} from "../controllers/category.controller";

// instance of router
const router = express.Router();

// prefix - /api/

// to get column names and types
router.get("/categoriesdata", categoriesData);

// to get all categories
router.get("/allcategories", getAllCategories);

// to get only one category matching the id
router.get("/category/:id", getCategoryById);

// Adding new category
router.post("/category/:name", postCategory);

// Deleting a category
router.delete("/category/:id", deleteCategory);

module.exports = router;
