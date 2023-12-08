import express from "express";
import {
  createCity,
  deleteCity,
  getCity,
  getCityCount,
  getCityList,
  getCitys,
  updateCity,
} from "../controllers/cityCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/", verifyAdmin, createCity);

// Update
router.put("/:id", verifyAdmin, updateCity);

// Delete
router.delete("/:id", verifyAdmin, deleteCity);

// get
router.get("/find/:id", getCity);

router.get("/by-city/:cityId", getCityList);

/// product count
router.get("/product-count", getCityCount);

// get all
router.get("/", getCitys);

export default router;
