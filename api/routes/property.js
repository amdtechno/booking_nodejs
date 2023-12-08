import express from "express";
import multer from "multer";
import path from 'path';

import {
  createProperty,
  deleteProperty,
  getProperty,
  getallProperty,
  searchByTypeController,
  updateImage,
  updateProperty,
  uploadImages,
} from "../controllers/propertyCtrl.js";

import { verifyAdmin } from "../../Utils/verifyToken.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/property');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage: storage });
// Create

router.post("/", verifyAdmin, createProperty);

// Update

router.put("/:id", verifyAdmin, updateProperty);

// Delete

router.delete("/:id", verifyAdmin, deleteProperty);

// get

router.get("/find/:id", getProperty);

// get all

router.get("/", getallProperty);

// search by property type

router.get("/searchByType/:propertyType/", searchByTypeController);

//upload image

// Endpoint for updating the image of a property
router.put("/update/:propertyId", upload.single("image"), updateImage);

// Endpoint for updating uploading multiple images
router.put('/update-multiple-images/:propertyId', upload.array('images', 5), uploadImages);

export default router;
