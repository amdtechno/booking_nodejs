import express from "express";
import {
  assignStaffToAppointment,
  createAppoinment,
  deleteAppoinment,
  getAppoinment,
  // getAppoinmentCount,
  // getAppoinmentList,
  getAppoinments,
  getStaffAppointments,
  updateAppoinment,
} from "../controllers/appoinmentCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/", verifyAdmin, createAppoinment);

// Update
router.put("/:id", verifyAdmin, updateAppoinment);

// Delete
router.delete("/:id", verifyAdmin, deleteAppoinment);

// get
router.get("/:id", getAppoinment);

router.get("/:appointmentId/assign-staff/:staffId", assignStaffToAppointment);

// get staff Appoinments
router.get("/:staffId/appointments", getStaffAppointments);

// /// product count
// router.get("/product-count", getCategoryCount);

// get all
router.get("/", getAppoinments);

export default router;
