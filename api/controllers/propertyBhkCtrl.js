import express from "express";
const router = express.Router();

import PropertyBhk from "../models/PropertyBhk.js";
import Property from "../models/Property.js";

export const createPropertyBhk = async (req, res, next) => {
  const newPropertyBhk = new PropertyBhk(req.body);

  try {
    const savedPropertyBhk = await newPropertyBhk.save();
    res.status(201).json({ status: "sucess", savedPropertyBhk });
  } catch (error) {
    next(error);
  }
};

export const updatePropertyBhk = async (req, res, next) => {
  try {
    const updatePropertyBhk = await PropertyBhk.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updatePropertyBhk });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deletePropertyBhk = async (req, res, next) => {
  try {
    await PropertyBhk.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "PropertyBhk Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getPropertyBhk = async (req, res, next) => {
  try {
    const propertyBhk = await PropertyBhk.findById(req.params.id);
    res.status(200).json({ status: "sucess", propertyBhk });
  } catch (error) {
    next(error);
  }
};

// get All

export const getallPropertyBhk = async (req, res, next) => {
  try {
    const propertyBhk = await PropertyBhk.find();
    res.status(200).json({ status: "sucess", propertyBhk });
  } catch (error) {
    next(error);
  }
};

export const assignPropertyBhk = async (req, res, next) => {
  const propertyId = req.params.propertyId;
  const { amenities } = req.body;
  try {
    // Validate if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

     // Validate if the PlacesNearby documents exist
     const existingPlaces = await PropertyBhk.find({ _id: { $in: amenities } });
     if (existingPlaces.length !== amenities.length) {
       return res.status(400).json({ error: 'One or more PropertyBhk  IDs do not exist' });
     }

       // Add PlacesNearby references to the property
    property.propertybhk = amenities;
    await property.save();
    res.json({ success: true, message: 'PropertyBhk  assigned to the property successfully' });
  } catch (error) {
    next(error);
  }
};