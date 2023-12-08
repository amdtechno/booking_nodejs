import express from "express";
const router = express.Router();

import PropertyTypes from "../models/PropertyTypes.js";



export const createPropertyTypes = async (req, res, next) => {
  const newPropertyTypes = new PropertyTypes(req.body);

  try {
    const savedPropertyTypes = await newPropertyTypes.save();
    res.status(201).json({ status: "sucess", savedPropertyTypes });
  } catch (error) {
    next(error);
  }
};

export const updatePropertyTypes = async (req, res, next) => {
  try {
    const updatePropertyTypes = await PropertyTypes.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updatePropertyTypes });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deletePropertyTypes = async (req, res, next) => {
  try {
    await PropertyTypes.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "PropertyTypes Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getPropertyType = async (req, res, next) => {
  try {
    const propertyTypes = await PropertyTypes.findById(req.params.id);
    res.status(200).json({ status: "sucess", propertyTypes });
  } catch (error) {
    next(error);
  }
};

// get All

export const getPropertyTypes = async (req, res, next) => {
  try {
    const propertyTypes = await PropertyTypes.find();
    res.status(200).json({ status: "sucess", propertyTypes });
  } catch (error) {
    next(error);
  }
};

