import express from "express";
const router = express.Router();
import Hotel from "../models/Hotels.js";
import Room from "../models/Rooms.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json({ sucess: true, savedRoom });
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updateRoom });
  } catch (error) {
    next(err);
  }
};
/// avalablity
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavilableDates": req.body.dates,
        },
      }
    );
    res.status(200).json({ status: "sucess", updateRoom });
  } catch (error) {
    next(err);
  }
};
// Delete
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res
      .status(200)
      .json({ status: "sucess", message: "Room Has Been Deleted Sucessfully" });
  } catch (error) {
    next(err);
  }
};

// get
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json({ status: "sucess", room });
  } catch (error) {
    next(err);
  }
};

// get All

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ status: "sucess", rooms });
  } catch (error) {
    next(err);
  }
};
