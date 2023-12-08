// controllers/parkingController.js
import Parking from '../models/Parking.js';
import Apartment from '../models/Apartments.js';

// Create a new parking
export const createParking = async (req, res, next) => {
  try {
    const newParking = await Parking.create(req.body);
    res.status(201).json(newParking);
  } catch (error) {
    next(error);
  }
};

// Get all parking options
export const getAllParking = async (req, res, next) => {
  try {
    const parkingOptions = await Parking.find();
    res.json(parkingOptions);
  } catch (error) {
    next(error);
  }
};

// Get a specific parking option by ID
export const getParkingById = async (req, res, next) => {
  const { parkingId } = req.params;
  try {
    const parkingOption = await Parking.findById(parkingId);
    if (!parkingOption) {
      return res.status(404).json({ error: 'Parking option not found' });
    }
    res.json(parkingOption);
  } catch (error) {
    next(error);
  }
};

// Update an existing parking option by ID
export const updateParking = async (req, res, next) => {
  const { parkingId } = req.params;
  try {
    const updatedParking = await Parking.findByIdAndUpdate(parkingId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedParking) {
      return res.status(404).json({ error: 'Parking option not found' });
    }
    res.json(updatedParking);
  } catch (error) {
    next(error);
  }
};

// Delete a parking option by ID
export const deleteParking = async (req, res, next) => {
  const { parkingId } = req.params;
  try {
    const deletedParking = await Parking.findByIdAndDelete(parkingId);
    if (!deletedParking) {
      return res.status(404).json({ error: 'Parking option not found' });
    }
    res.json({ success: true, message: 'Parking option deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Assign parking to apartments

export const assignParking = async (req, res, next) => {
  const propertyId = req.params.parkingId;
  const { parking } = req.body;
  try {
    // Validate if the property exists
    const property = await Apartment.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

     // Validate if the PlacesNearby documents exist
     const existingPlaces = await Parking.find({ _id: { $in: parking } });
     if (existingPlaces.length !== parking.length) {
       return res.status(400).json({ error: 'One or more amenities IDs do not exist' });
     }

       // Add PlacesNearby references to the property
    property.parking = parking;
    await property.save();
    res.json({ success: true, message: 'amenities assigned to the property successfully' });
  } catch (error) {
    next(error);
  }
};