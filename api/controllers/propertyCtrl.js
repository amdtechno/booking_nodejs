import express from "express";

const router = express.Router();
import multer from 'multer';
import path from 'path';
import Property from "../models/Property.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../uploads');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

export const createProperty = async (req, res, next) => {
  const newProperty = new Property(req.body);
  try {
    const savedProperty = await newProperty.save();
    res.status(201).json({ status: "sucess", savedProperty });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const updateProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({ status: "sucess", updateProperty });
  } catch (error) {
    next(error);
  }
};

// Delete

export const deleteProperty = async (req, res, next) => {
  try {
    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "sucess",

      message: "Property Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get

export const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    res.status(200).json({ status: "sucess", property });
  } catch (error) {
    next(error);
  }
};

// get All

export const getallProperty = async (req, res, next) => {
  try {
    const property = await Property.find()
      .populate({
        path: "reraApproved",
        select: "name -_id", // Include only the 'name' field
      })
      
      .populate({
        path: "constructionstatus",
        select: "name -_id", // Include only the 'name' field
      }).lean()
      .populate({
        path: "propertybhk",
        select: "name -_id", // Include only the 'name' field
      }).lean()
      .populate({
        path: "amenities",
        select: "name -_id", // Include only the 'name' field
      }).lean()
      .populate({
        path: "type",
        select: "name -_id", // Include only the 'name' field
      }).lean()
      .populate({
        path: "placesnearby",
        select: "name count distance -_id", // Include only the 'name' field
      })
      .populate({
        path: "furnishingStatus",
        select: "name -_id", // Include only the 'name' field
      }).lean().select('-__v');
    // Convert the populated objects to plain strings
    // Convert the populated objects to plain strings
    property.forEach((property) => {
      if (property.reraApproved) {
        property.reraApproved = property.reraApproved.name;
      }
      if (property.constructionstatus) {
        property.constructionstatus = property.constructionstatus.name;
      }
      if (property.furnishingStatus) {
        property.furnishingStatus = property.furnishingStatus.name;
      }
      if (property.type) {
        property.type = property.type.name;
      }
      if (property.amenities && Array.isArray(property.amenities)) {
        property.amenities = property.amenities.map(amenity => amenity.name);
      }
      if (property.propertybhk && Array.isArray(property.propertybhk)) {
        property.propertybhk = property.propertybhk.map(propertybhk => propertybhk.name);
      }
      // Repeat similar conversions for other fields
    });

    res.status(200).json({ status: "sucess", property });
  } catch (error) {
    next(error);
  }
};

/// search by property type

export const searchByTypeController = async (req, res) => {
  const { propertyType } = req.params;

  try {
    const query = {
      type: propertyType,
      // furnishingStatus: furnishedStatus,
    };
    // Search for properties by type
    const properties = await Property.find({
      type: propertyType,
    })
      .populate({
        path: "reraApproved",
        select: "name", // Include only the 'name' field
      })
      .populate("constructionstatus")
      .populate("propertybhk")
      .populate("amenities")
      .populate("type")
      .populate("placesnearby")
      .populate("furnishingStatus");
    res.json({ success: true, properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateImage = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imagePath = `uploads/${req.file.filename}`;

    // Update the image path
    property.image = imagePath;
    await property.save();

    res.json({ success: true, imageUrl: imagePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating image' });
  }
};

// multiple images

export const uploadImages = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Check if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const imagePaths = req.files.map((file) => `uploads/${file.filename}`);
    const imageUrls = imagePaths.map((path) => `${req.protocol}://${req.get('host')}/${path}`);

    // Update image paths in the property
    property.images = imageUrls; // Assuming your property model has a field named 'images'
    await property.save();

    res.json({ success: true, imageUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading images' });
  }
};