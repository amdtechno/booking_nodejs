import express from "express";
import {
  createConstructionStatus,
  deleteConstructionStatus,
  getConstructionStatus,
  getallConstructionStatus,
  updateConstructionStatus,
} from "../controllers/constructionstatusCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/", verifyAdmin, createConstructionStatus);

// Update
router.put("/:id", verifyAdmin, updateConstructionStatus);

// Delete
router.delete("/:id", verifyAdmin, deleteConstructionStatus);

// get
router.get("/find/:id", getConstructionStatus);

// get all
router.get("/", getallConstructionStatus);

export default router;
