import express from "express";
const router = express.Router();

import City from "../models/City.js";
import Hotel from "../models/Hotels.js";

export const createCity = async (req, res, next) => {
  const newCity = new City(req.body);

  try {
    const savedCity = await newCity.save();
    res.status(201).json({ status: "sucess", savedCity });
  } catch (error) {
    next(error);
  }
};

export const updateCity = async (req, res, next) => {
  try {
    const updateCitys = await City.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updateCitys });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteCity = async (req, res, next) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "Citys Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getCity = async (req, res, next) => {
  try {
    const citys = await City.findById(req.params.id);
    res.status(200).json({ status: "sucess", citys });
  } catch (error) {
    next(error);
  }
};

// get All

export const getCitys = async (req, res, next) => {
  try {
    const citys = await City.find();
    res.status(200).json({ status: "sucess", citys });
  } catch (error) {
    next(error);
  }
};

// get City product list
export const getCityList = async (req, res, next) => {
  try {
    const cityId = req.params.cityId;
    // const citys = await city.find();
    const hotel = await Hotel.find({ city: cityId });
    // res.render('categories', { citys });
    res.status(200).json({ status: "sucess", hotel });
  } catch (error) {
    next(error);
  }
};
// get city product count
export const getCityCount = async (req, res, next) => {
  try {
    const citys = await City.find();
    const cityCount = [];

    for (const city of citys) {
      const hotelCount = await Hotel.countDocuments({ city: city._id });
      cityCount.push({ city: city.name, count: hotelCount });
    }
    // const hotel = await Hotel.find({ city: cityCount });
    // res.render('categories', { citys });
    res.status(200).json({ status: "sucess", cityCount });
  } catch (error) {
    next(error);
  }
};
