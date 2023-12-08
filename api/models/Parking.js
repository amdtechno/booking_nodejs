// models/Parking.js
import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Parking", parkingSchema);
