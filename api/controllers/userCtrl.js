import express from "express";
const router = express.Router();

import Users from "../models/Users.js";



export const updateUser = async (req, res, next) => {
  try {
    const updateUsers = await Users.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updateUsers });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteUser = async (req, res, next) => {
    try {
        await Users.findByIdAndDelete(req.params.id);
        res.status(200).json({status: "sucess",message:"Users Has Been Deleted Sucessfully"});
      } catch (error) {
        next(error);
      }
};

// get
export const getUser = async (req, res, next) => {
    try {
        const users = await Users.findById(req.params.id);
        res.status(200).json({status: "sucess",users});
      } catch (error) {
        next(error);
      }
};

// get All

export const getUsers = async (req, res, next) => {
    try {
        const users = await Users.find();
        res.status(200).json({status: "sucess",users});
      } catch (error) {
        next(error);
      }
};
