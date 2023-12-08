import express from "express";
const router = express.Router();

import ReraApproved from "../models/ReraApproved.js";

export const createReraApproved = async (req, res, next) => {
  const newReraApproved = new ReraApproved(req.body);

  try {
    const savedReraApproved = await newReraApproved.save();
    res.status(201).json({ status: "sucess", savedReraApproved });
  } catch (error) {
    next(error);
  }
};

export const updateReraApproved = async (req, res, next) => {
  try {
    const updateReraApproved = await ReraApproved.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updateReraApproved });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteReraApproved = async (req, res, next) => {
  try {
    await ReraApproved.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "ReraApproved Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getReraApproved = async (req, res, next) => {
  try {
    const reraApproved = await ReraApproved.findById(req.params.id);
    res.status(200).json({ status: "sucess", reraApproved });
  } catch (error) {
    next(error);
  }
};

// get All

export const getallReraApproved = async (req, res, next) => {
  try {
    const reraApproved = await ReraApproved.find();
    res.status(200).json({ status: "sucess", reraApproved });
  } catch (error) {
    next(error);
  }
};
