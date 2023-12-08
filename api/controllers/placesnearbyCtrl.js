import express from "express";
const router = express.Router();

import PlacesNearby from "../models/PlacesNearby.js";
import Hotel from "../models/Hotels.js";
import Property from "../models/Property.js";

export const createPlacesNearby = async (req, res, next) => {
  const newPlacesNearby = new PlacesNearby(req.body);

  try {
    const savedPlacesNearby = await newPlacesNearby.save();
    res.status(201).json({ status: "sucess", savedPlacesNearby });
  } catch (error) {
    next(error);
  }
};

export const updatePlacesNearby = async (req, res, next) => {
  try {
    const updatePlacesNearbys = await PlacesNearby.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updatePlacesNearbys });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deletePlacesNearby = async (req, res, next) => {
  try {
    await PlacesNearby.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "PlacesNearby Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getpacesNearby = async (req, res, next) => {
  try {
    const placesNearby = await PlacesNearby.findById(req.params.id);
    res.status(200).json({ status: "sucess", placesNearby });
  } catch (error) {
    next(error);
  }
};

// get All

export const allgetPlacesNearby = async (req, res, next) => {
  try {
    const pacesNearby = await PlacesNearby.find();
    res.status(200).json({ status: "sucess", pacesNearby });
  } catch (error) {
    next(error);
  }
};

// // assign Staff To Appointment

// export const pnbToproperty = async (req, res, next) => {
//   const { pnbId, propertyId } = req.params;
//   try {
//     const placesNearby = await PlacesNearby.findById(pnbId);
//     const property = await Property.findById(propertyId);

//     console.log('====================================');
//     console.log(placesNearby,property);
//     console.log('====================================');
//     if (!placesNearby || !property) {
//       return res.status(404).json({ message: 'Appointment or Staff not found' });
//     }

//     // Assign the staff to the appointment
//     property.placesnearby = placesNearby;
//     const updatedAppointment = await property.save();
//     res.status(200).json({ status: "sucess", updatedAppointment });
//   } catch (error) {
//     next(error);
//   }
// };

export const pnbproperty = async (req, res, next) => {
  const { placesNearbId, hotelId } = req.params;
  try {
    const placesNearby = await PlacesNearby.findById(
      "656dc67b3773e48b4615de3b"
    );
    const hotel = await Hotel.findById("65650a192ae4d5830e298d87");
    console.log(placesNearby);
    if (!placesNearby || !hotel) {
      return res
        .status(404)
        .json({ message: "Appointment or Staff not found" });
    }

    // Assign the staff to the appointment
    hotel.placesnearby = placesNearby;
    const updatedAppointment = await hotel.save();
    res.status(200).json({ status: "sucess", updatedAppointment });
  } catch (error) {
    next(error);
  }
};

export const assignNearby = async (req, res, next) => {
  const propertyId = req.params.propertyId;
  const { nearbyPlaces } = req.body;
  try {
    // Validate if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

     // Validate if the PlacesNearby documents exist
     const existingPlaces = await PlacesNearby.find({ _id: { $in: nearbyPlaces } });
     if (existingPlaces.length !== nearbyPlaces.length) {
       return res.status(400).json({ error: 'One or more PlacesNearby IDs do not exist' });
     }

       // Add PlacesNearby references to the property
    property.placesnearby = nearbyPlaces;
    await property.save();
    res.json({ success: true, message: 'Nearby places assigned to the property successfully' });
  } catch (error) {
    next(error);
  }
};

