// routes/apartmentRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  createApartment,
  getAllApartments,
  getApartmentById,
  updateApartment,
  deleteApartment,
  updateImage,
  uploadImages,
} from "../controllers/apartmentCtrl.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/apartment");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage: storage });

router.post("/", createApartment);
router.get("/", getAllApartments);
router.get("/:apartmentId", getApartmentById);
router.put("/:apartmentId", updateApartment);
router.delete("/:apartmentId", deleteApartment);
// Endpoint for updating the image of a property
router.put("/update/:apartmentId", upload.single("image"), updateImage);

// Endpoint for updating uploading multiple images
router.put(
  "/update-multiple-images/:apartmentId",
  upload.array("images", 5),
  uploadImages
);

export default router;
