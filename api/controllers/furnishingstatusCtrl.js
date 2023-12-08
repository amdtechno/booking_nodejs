import express from "express";
const router = express.Router();

import FurnishingStatus from "../models/Furnishingstatus.js";
import Hotel from "../models/Hotels.js";

export const createFurnishingStatus = async (req, res, next) => {
  const newFurnishingStatus = new FurnishingStatus(req.body);

  try {
    const savedFurnishingStatus = await newFurnishingStatus.save();
    res.status(201).json({ status: "sucess", savedFurnishingStatus });
  } catch (error) {
    next(error);
  }
};

export const updateFurnishingStatus = async (req, res, next) => {
  try {
    const updateFurnishingStatus = await FurnishingStatus.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updateFurnishingStatus });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteFurnishingStatus = async (req, res, next) => {
  try {
    await FurnishingStatus.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "FurnishingStatus Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getFurnishingStatus = async (req, res, next) => {
  try {
    const furnishingStatus = await FurnishingStatus.findById(req.params.id);
    res.status(200).json({ status: "sucess", furnishingStatus });
  } catch (error) {
    next(error);
  }
};

// get All

export const getallFurnishingStatus = async (req, res, next) => {
  try {
    const furnishingStatus = await FurnishingStatus.find();
    res.status(200).json({ status: "sucess", furnishingStatus });
  } catch (error) {
    next(error);
  }
};
