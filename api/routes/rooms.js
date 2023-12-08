import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/:hotelid", verifyAdmin, createRoom);

// Update
router.put("/:id", verifyAdmin, updateRoom);

/// availablity
router.put("/availability/:id",  updateRoomAvailability);

// Delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// get
router.get("/:id", getRoom);

// get all
router.get("/", getRooms);

export default router;
