import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelByCity,
  getHotels,
  updateHotel,
} from "../controllers/hotelCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/", verifyAdmin, createHotel);

// Update
router.put("/:id", verifyAdmin, updateHotel);

// Delete
router.delete("/find/:id", verifyAdmin, deleteHotel);

// get
router.get("/find/:id", getHotel);

// get all
router.get("/", getHotels);

// countByCity

router.get("/countByCity", countByCity);
// countByType

router.get("/countByType", countByType);
// hotel By City

router.get("/by-city/:cityName", getHotelByCity);

export default router;
