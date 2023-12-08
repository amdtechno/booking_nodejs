import express from "express";
import {
  assignAmenities,
  createAmenities,
  deleteAmenities,
  getAmenities,
  getallAmenities,
  updateAmenities,
} from "../controllers/amenitiesCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/", verifyAdmin, createAmenities);

// Update
router.put("/:id", verifyAdmin, updateAmenities);

// Delete
router.delete("/:id", verifyAdmin, deleteAmenities);

// get
router.get("/find/:id", getAmenities);

// get all
router.get("/", getallAmenities);

// assain aminites to property

router.post('/assignamenities/:propertyId', assignAmenities);

export default router;
