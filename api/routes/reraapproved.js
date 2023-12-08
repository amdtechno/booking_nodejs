import express from "express";
import {
  createReraApproved,
  deleteReraApproved,
  getReraApproved,
  getallReraApproved,
  updateReraApproved,
} from "../controllers/reraapprovedCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/", verifyAdmin, createReraApproved);

// Update
router.put("/:id", verifyAdmin, updateReraApproved);

// Delete
router.delete("/:id", verifyAdmin, deleteReraApproved);

// get
router.get("/find/:id", getReraApproved);

// get all
router.get("/", getallReraApproved);

export default router;
