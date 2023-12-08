// controllers/apartmentController.js
import Apartment from "../models/Apartments.js";

// Create a new apartment
export const createApartment = async (req, res, next) => {
  try {
    const newApartment = await Apartment.create(req.body);
    res.status(201).json(newApartment);
  } catch (error) {
    next(error);
  }
};

// Get all apartments
export const getAllApartments = async (req, res, next) => {
  try {
    const apartments = await Apartment.find()
      .populate({
        path: "propertyType",
        select: "name -_id", // Include only the 'name' field
      }).lean().populate({
        path: "parking",
        select: "title -_id", // Include only the 'name' field
      })
      .lean()
      .select("-__v");

    apartments.forEach((property) => {
      if (property.propertyType) {
        property.propertyType = property.propertyType.name;
      }
      if (property.parking && Array.isArray(property.parking)) {
        property.parking = property.parking.map((parking) => parking.title);
      }
    });
    res.json(apartments);
  } catch (error) {
    next(error);
  }
};

// Get a specific apartment by ID
export const getApartmentById = async (req, res, next) => {
  const { apartmentId } = req.params;
  try {
    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }
    res.json(apartment);
  } catch (error) {
    next(error);
  }
};

// Update an existing apartment by ID
export const updateApartment = async (req, res, next) => {
  const { apartmentId } = req.params;
  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(
      apartmentId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedApartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }
    res.json(updatedApartment);
  } catch (error) {
    next(error);
  }
};

// Delete an apartment by ID
export const deleteApartment = async (req, res, next) => {
  const { apartmentId } = req.params;
  try {
    const deletedApartment = await Apartment.findByIdAndDelete(apartmentId);
    if (!deletedApartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }
    res.json({ success: true, message: "Apartment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// upload image
export const updateImage = async (req, res) => {
  try {
    const { apartmentId } = req.params;
    const apartment = await Apartment.findById(apartmentId);

    if (!apartment) {
      return res.status(404).json({ error: 'apartment not found' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imagePath = `uploads/${req.file.filename}`;
    const imageUrl = `${req.protocol}://${req.get('host')}/${imagePath}`;

    // Update the image path
    apartment.image = imageUrl;
    await apartment.save();

    res.json({ success: true, imageUrl: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating image' });
  }
};

/// upload multiple images 

export const uploadImages = async (req, res) => {
  try {
    const { apartmentId } = req.params;

    // Check if the property exists
    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const imagePaths = req.files.map((file) => `uploads/${file.filename}`);
    const imageUrls = imagePaths.map((path) => `${req.protocol}://${req.get('host')}/${path}`);

    // Update image paths in the property
    apartment.images = imageUrls; // Assuming your property model has a field named 'images'
    await apartment.save();

    res.json({ success: true, imageUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading images' });
  }
};