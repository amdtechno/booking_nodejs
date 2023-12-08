import express from "express";
import {
  createFurnishingStatus,
  deleteFurnishingStatus,
  getFurnishingStatus,
  getallFurnishingStatus,
  updateFurnishingStatus,
} from "../controllers/furnishingstatusCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/", verifyAdmin, createFurnishingStatus);

// Update
router.put("/:id", verifyAdmin, updateFurnishingStatus);

// Delete
router.delete("/:id", verifyAdmin, deleteFurnishingStatus);

// get
router.get("/find/:id", getFurnishingStatus);

// get all
router.get("/", getallFurnishingStatus);

export default router;
