import express from "express";
import {
  assignPropertyBhk,
  createPropertyBhk,
  deletePropertyBhk,
  getPropertyBhk,
  getallPropertyBhk,
  updatePropertyBhk,
} from "../controllers/propertyBhkCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/", verifyAdmin, createPropertyBhk);

// Update
router.put("/:id", verifyAdmin, updatePropertyBhk);

// Delete
router.delete("/:id", verifyAdmin, deletePropertyBhk);

// get
router.get("/find/:id", getPropertyBhk);

// get all
router.get("/", getallPropertyBhk);

// assain propertyBhk to property

router.post('/assignpropertybhk/:propertyId', assignPropertyBhk);


export default router;
