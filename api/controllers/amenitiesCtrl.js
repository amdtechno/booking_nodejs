import express from "express";
const router = express.Router();

import Amenities from "../models/Amenities.js";
import Property from "../models/Property.js";

export const createAmenities = async (req, res, next) => {
  const newAmenities = new Amenities(req.body);

  try {
    const savedAmenities = await newAmenities.save();
    res.status(201).json({ status: "sucess", savedAmenities });
  } catch (error) {
    next(error);
  }
};

export const updateAmenities = async (req, res, next) => {
  try {
    const updateAmenities = await Amenities.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updateAmenities });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteAmenities = async (req, res, next) => {
  try {
    await Amenities.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "Amenities Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getAmenities = async (req, res, next) => {
  try {
    const amenities = await Amenities.findById(req.params.id);
    res.status(200).json({ status: "sucess", Amenities });
  } catch (error) {
    next(error);
  }
};

// get All

export const getallAmenities = async (req, res, next) => {
  try {
    const amenities = await Amenities.find();
    res.status(200).json({ status: "sucess", amenities });
  } catch (error) {
    next(error);
  }
};

export const assignAmenities = async (req, res, next) => {
  const propertyId = req.params.propertyId;
  const { amenities } = req.body;
  try {
    // Validate if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

     // Validate if the PlacesNearby documents exist
     const existingPlaces = await Amenities.find({ _id: { $in: amenities } });
     if (existingPlaces.length !== amenities.length) {
       return res.status(400).json({ error: 'One or more amenities IDs do not exist' });
     }

       // Add PlacesNearby references to the property
    property.amenities = amenities;
    await property.save();
    res.json({ success: true, message: 'amenities assigned to the property successfully' });
  } catch (error) {
    next(error);
  }
};