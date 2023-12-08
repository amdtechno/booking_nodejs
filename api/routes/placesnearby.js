import express from "express";
import multer from "multer";
import csvtojson from "csvtojson";
// import {
//     allgetPlacesNearby,
//   createPlacesNearby,
//   deletePlacesNearby,
//   getpacesNearby,
//   updatePlacesNearby,

// } from "../controllers/placesnearbyCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
import {
  allgetPlacesNearby,
  assignNearby,
  createPlacesNearby,
  deletePlacesNearby,
  getpacesNearby,
  pnbproperty,
  updatePlacesNearby,
} from "../controllers/placesnearbyCtrl.js";
import PlacesNearby from "../models/PlacesNearby.js";
const router = express.Router();
// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Create
router.post("/", verifyAdmin, createPlacesNearby);

// Update
router.put("/:id", verifyAdmin, updatePlacesNearby);

// Delete
router.delete("/:id", verifyAdmin, deletePlacesNearby);

// get
router.get("/find/:id", getpacesNearby);

// get all
router.get("/", allgetPlacesNearby);

/// assain nearby to property

router.post("/assignNearbyPlaces/:propertyId", assignNearby);
// router.get("/:appointmentId/assign-staff/:staffId", pnbproperty);

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Convert CSV to JSON
    const jsonArray = await csvtojson().fromString(req.file.buffer.toString());

    // Check for existing products with the same name
    const existingPlacenearby = await PlacesNearby.find({ name: { $in: jsonArray.map(item => item.name) } });


    // Filter out products with existing names
    const newPlacenearby = jsonArray.filter(item => !existingPlacenearby.some(existing => existing.name === item.name));

    // Insert products into the database
    await PlacesNearby.insertMany(newPlacenearby);

    res.json({ success: true, message: "NearbyPlaces added from CSV" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error inserting data into the database" });
  }
});

export default router;
