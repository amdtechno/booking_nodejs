import express from "express";
import {
  createStaff,
  deleteStaff,
  getAppointment,
  getStaff,
  // getStaffCount,
  // getStaffList,
  getStaffAppointments,
  getStaffs,
  getTodayAppointments,
  updateStaff,
} from "../controllers/staffCtrl.js";
import { verifyAdmin, verifyStaff } from "../../Utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/", verifyAdmin, createStaff);

// Update
router.put("/:id", verifyAdmin, updateStaff);

// Delete
router.delete("/:id", verifyAdmin, deleteStaff);

// get
router.get("/find/:id", getStaff);

// router.get("/by-category/:categoryId", getCategoryList);

// /// product count
// router.get("/product-count", getCategoryCount);

// get all
router.get("/", getStaffs);
router.get("/:staffId/appointments/today",getTodayAppointments );

router.get("/:staffId/appointments", getStaffAppointments );

/// get appoinments
router.get("/appointment/:staffId",verifyStaff, getAppointment );

export default router;
