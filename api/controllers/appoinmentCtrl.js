import express from "express";
const router = express.Router();

import Appoinment from "../models/Appoinment.js";
import Staff from "../models/Staff.js";

export const createAppoinment = async (req, res, next) => {
  const newAppoinment = new Appoinment(req.body);

  try {
    const savedAppoinment = await newAppoinment.save();
    res.status(201).json({ status: "sucess", savedAppoinment });
  } catch (error) {
    next(error);
  }
};

export const updateAppoinment = async (req, res, next) => {
  try {
    const updateAppoinments = await Appoinment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updateAppoinments });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteAppoinment = async (req, res, next) => {
  try {
    await Appoinment.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "Appoinments Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getAppoinment = async (req, res, next) => {
  try {
    const appoinments = await Appoinment.findById(req.params.id);
    res.status(200).json({ status: "sucess", appoinments });
  } catch (error) {
    next(error);
  }
};

// get All

export const getAppoinments = async (req, res, next) => {
  try {
    const appoinments = await Appoinment.find().populate({
      path: "property",
      select: "name _id", // Specify the fields you want to include
    }); // Assuming 'property' is the field referencing the Property model;
    res.status(200).json({ status: "sucess", appoinments });
  } catch (error) {
    next(error);
  }
};

// assign Staff To Appointment

export const assignStaffToAppointment = async (req, res, next) => {
  const { appointmentId, staffId } = req.params;
  try {
    const appointment = await Appoinment.findById(appointmentId);
    const staff = await Staff.findById(staffId);

    if (!appointment || !staff) {
      return res.status(404).json({ message: 'Appointment or Staff not found' });
    }

    // Assign the staff to the appointment
    appointment.staff = staffId;
    const updatedAppointment = await appointment.save();
    res.status(200).json({ status: "sucess", updatedAppointment });
  } catch (error) {
    next(error);
  }
};


// get Staff Appointment List

export const getStaffAppointments = async (req, res, next) => {
  const { staffId } = req.params;
  try {
    // Check if the staff exists
    const staff = await Staff.findById(staffId);
    console.log(staff._id);

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
// Find appointments for the staff
const staffAppointments = await Appoinment.find({ staff: staffId });
console.log(staffAppointments);

    res.status(200).json({ status: "sucess", staffAppointments });
  } catch (error) {
    next(error);
  }
};







// // get appoinment product list
// export const getAppoinmentList = async (req, res, next) => {
//   try {
//     const categoryId = req.params.categoryId;
//     // const categorys = await Category.find();
//     const hotel = await Hotel.find({ category: categoryId });
//     // res.render('categories', { categorys });
//     res.status(200).json({ status: "sucess", hotel });
//   } catch (error) {
//     next(error);
//   }
// };
// // get category product count
// export const getCategoryCount = async (req, res, next) => {
//   try {
//     const categorys = await Category.find();
//     const categoryCount = [];

//     for (const category of categorys) {
//       const hotelCount = await Hotel.countDocuments({ category: category._id });
//       categoryCount.push({ category: category.name, count: hotelCount });
//     }
//     // const hotel = await Hotel.find({ category: categoryCount });
//     // res.render('categories', { categorys });
//     res.status(200).json({ status: "sucess", categoryCount });
//   } catch (error) {
//     next(error);
//   }
// };
