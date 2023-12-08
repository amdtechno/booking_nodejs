import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryCount,
  getCategoryList,
  getCategorys,
  updateCategory,
} from "../controllers/categoryCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/", verifyAdmin, createCategory);

// Update
router.put("/:id", verifyAdmin, updateCategory);

// Delete
router.delete("/:id", verifyAdmin, deleteCategory);

// get
router.get("/find/:id", getCategory);

router.get("/by-category/:categoryId", getCategoryList);

/// product count
router.get("/product-count", getCategoryCount);

// get all
router.get("/", getCategorys);

export default router;
