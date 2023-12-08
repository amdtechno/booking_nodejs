import express from "express";
const router = express.Router();

import Category from "../models/Category.js";
import Hotel from "../models/Hotels.js";

export const createCategory = async (req, res, next) => {
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json({ status: "sucess", savedCategory });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updateCategorys = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updateCategorys });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteCategory = async (req, res, next) => {
  try {
    await Categorys.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "Categorys Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getCategory = async (req, res, next) => {
  try {
    const categorys = await Category.findById(req.params.id);
    res.status(200).json({ status: "sucess", categorys });
  } catch (error) {
    next(error);
  }
};

// get All

export const getCategorys = async (req, res, next) => {
  try {
    const categorys = await Category.find();
    res.status(200).json({ status: "sucess", categorys });
  } catch (error) {
    next(error);
  }
};

// get category product list
export const getCategoryList = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    // const categorys = await Category.find();
    const hotel = await Hotel.find({ category: categoryId });
    // res.render('categories', { categorys });
    res.status(200).json({ status: "sucess", hotel });
  } catch (error) {
    next(error);
  }
};
// get category product count
export const getCategoryCount = async (req, res, next) => {
  try {
    const categorys = await Category.find();
    const categoryCount = [];

    for (const category of categorys) {
      const hotelCount = await Hotel.countDocuments({ category: category._id });
      categoryCount.push({ category: category.name, count: hotelCount });
    }
    // const hotel = await Hotel.find({ category: categoryCount });
    // res.render('categories', { categorys });
    res.status(200).json({ status: "sucess", categoryCount });
  } catch (error) {
    next(error);
  }
};
