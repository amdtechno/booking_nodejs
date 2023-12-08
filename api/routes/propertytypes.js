import express from "express";
import multer from "multer";
import csvtojson from "csvtojson";
import PropertyTypes from "../models/PropertyTypes.js";
import {
  createPropertyTypes,
  deletePropertyTypes,
  getPropertyType,
  getPropertyTypes,
  updatePropertyTypes,
} from "../controllers/propertytypesCtrl.js";
import { verifyAdmin } from "../../Utils/verifyToken.js";
const router = express.Router();
// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Create
router.post("/", verifyAdmin, createPropertyTypes);

// Update
router.put("/:id", verifyAdmin, updatePropertyTypes);

// Delete
router.delete("/:id", verifyAdmin, deletePropertyTypes);

// get
router.get("/find/:id", getPropertyType);

// get all
router.get("/", getPropertyTypes);

// uploadcsv



// upload csv PropertyTypes

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Convert CSV to JSON
    const jsonArray = await csvtojson().fromString(req.file.buffer.toString());

    // Check for existing products with the same name
    const existingPlacenearby = await PropertyTypes.find({ name: { $in: jsonArray.map(item => item.name) } });


    // Filter out products with existing names
    const newPlacenearby = jsonArray.filter(item => !existingPlacenearby.some(existing => existing.name === item.name));

    // Insert products into the database
    await PropertyTypes.insertMany(newPlacenearby);

    res.json({ success: true, message: "NearbyPlaces added from CSV" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error inserting data into the database" });
  }
});

export default router;
