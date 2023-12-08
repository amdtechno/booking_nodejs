// models/Appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: String,
  date: Date,
  description: String,
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }, // Reference to Property model
  mobile: Number, // Mobile number directly stored in the appointment
  staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
});
export default mongoose.model("Appointment", appointmentSchema);
