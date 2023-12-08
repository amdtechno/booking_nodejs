import express from "express";
const router = express.Router();
import moment from "moment";

import Staff from "../models/Staff.js";
import Appointment from "../models/Appoinment.js";

export const createStaff = async (req, res, next) => {
  try {
    const newStaff = new Staff(req.body);
    const { email } = req.body;
    if (email) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const savedStaff = await newStaff.save();
    res.status(201).json({ status: "sucess", savedStaff });
  } catch (error) {
    next(error);
  }
};

export const updateStaff = async (req, res, next) => {
  try {
    const updateStaffs = await Staff.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ status: "sucess", updateStaffs });
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteStaff = async (req, res, next) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucess",
      message: "Staffs Has Been Deleted Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// get
export const getStaff = async (req, res, next) => {
  try {
    const staffs = await Staff.findById(req.params.id);
    res.status(200).json({ status: "sucess", staffs });
  } catch (error) {
    next(error);
  }
};

// get All

export const getStaffs = async (req, res, next) => {
  try {
    const staffs = await Staff.find();
    res.status(200).json({ status: "sucess", staffs });
  } catch (error) {
    next(error);
  }
};
// get All

export const getTodayAppointments = async (req, res, next) => {
  const { staffId } = req.params;
  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    const todayDate = moment().format("MM-DD-YYYY");

    // Get today's date in UTC format
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Format today's date as "year-month-day"
    const formattedToday = today.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    console.log("Formatted Today:", formattedToday);
    console.log("Staff ID Today:", staffId);

    // Find today's appointments for the staff
    const todayAppointments = await Appointment.find({
      staff: staffId,
      date: "2023-02-11T18:30:00.000Z",
    });
    res.status(200).json({ status: "sucess", todayAppointments });
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

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    console.log('Staff:', staff);
    // Find appointments for the staff
    const staffAppointments = await Appointment.find({ staff: staffId }).populate('staff');
    console.log('Staff Appointments:', staffAppointments);

    res.status(200).json({ status: "sucess", staffAppointments });
  } catch (error) {
    next(error);
  }
};

//  Staff Appointment

export const getAppointment = async (req, res, next) => {
  const { staffId } = req.params; // Get staff ID from the authenticated request

  try {
   
    const staffAppointments = await Appointment.find({ staff: staffId }).populate('staff').populate('property');

    const appointmentData = staffAppointments.map(appointment => ({
      id: appointment._id,
      name: appointment.name,
      date: appointment.date,
      contact:appointment.mobile,
      
      description: appointment.description,
      property:appointment.property.name,
      // Add more fields as needed
    }));

    res.status(200).json({ status: "sucess", appointmentData });
  } catch (error) {
    next(error);
  }
};
