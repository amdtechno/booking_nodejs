import express from "express";
const router = express.Router();

import Hotel from "../models/Hotels.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(201).json({ status: "sucess", savedHotel });
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updateHotel });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "Hotel Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json({ status: "sucess", hotel });
  } catch (error) {
    next(error);
  }
};

// get All

export const getHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    })
      .limit(limit)
      .populate("city")
      .populate({
        path: 'rooms',
        model: 'Room', // Assuming 'rooms' is referencing the 'Room' model
      });
    res.status(200).json(
      hotels.map((hotel) => ({
        ...hotel.toObject(),
        city: hotel.city ? hotel.city.name : null,
        rooms: hotel.rooms.map((room) => room.roomNumbers[0].toObject()),
        // rooms: hotel.rooms ? hotel.rooms.name : null,
      }))
    );
    // res.status(200).json(hotels);
    // res
    //   .status(200)
    //   .json({ status: "sucess", count: hotels.length, data: hotels });
  } catch (error) {
    next(error);
  }
};

// countByCity

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json({ status: "sucess", list });
  } catch (error) {
    next(error);
  }
};
// countByType

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinsCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json({
      status: "sucess",
      data: [
        { type: "hotels", count: hotelCount },
        { type: "apartment", count: apartmentCount },
        { type: "resort", count: resortCount },
        { type: "villa", count: villaCount },
        { type: "cabin", count: cabinsCount },
      ],
    });
  } catch (error) {
    next(error);
  }
};

// get hotel by city
export const getHotelByCity = async (req, res, next) => {
  try {
    const cityName = req.params.cityName;
    const hotel = await Hotel.find({ city: cityName });
    res.status(200).json({ status: "sucess", hotel });
  } catch (error) {
    next(error);
  }
};
// get hotel by city & count
export const getHotelByCityCount = async (req, res, next) => {
  try {
    const cityName = req.params.cityName;
    const hotel = await Hotel.find({ city: cityName });
    res.status(200).json({ status: "sucess", hotel });
  } catch (error) {
    next(error);
  }
};
