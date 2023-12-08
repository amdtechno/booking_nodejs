import express from "express";
const router = express.Router();

import ConstructionStatus from "../models/Constructionstatus.js";
import Hotel from "../models/Hotels.js";

export const createConstructionStatus = async (req, res, next) => {
  const newConstructionStatus = new ConstructionStatus(req.body);

  try {
    const savedConstructionStatus = await newConstructionStatus.save();
    res.status(201).json({ status: "sucess", savedConstructionStatus });
  } catch (error) {
    next(error);
  }
};

export const updateConstructionStatus = async (req, res, next) => {
  try {
    const updateConstructionStatus = await ConstructionStatus.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updateConstructionStatus });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteConstructionStatus = async (req, res, next) => {
  try {
    await ConstructionStatus.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "ConstructionStatus Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getConstructionStatus = async (req, res, next) => {
  try {
    const constructionStatus = await ConstructionStatus.findById(req.params.id);
    res.status(200).json({ status: "sucess", constructionStatus });
  } catch (error) {
    next(error);
  }
};

// get All

export const getallConstructionStatus = async (req, res, next) => {
  try {
    const constructionStatus = await ConstructionStatus.find();
    res.status(200).json({ status: "sucess", constructionStatus });
  } catch (error) {
    next(error);
  }
};
