// models/Plot.js
import mongoose from "mongoose";

const plotSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  propertyType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyType",
  },
  location: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  roadWidth: {
    type: Number,
    required: true,
  },
  submitDate: {
    type: Date,
    default: Date.now,
  },
  boundaryWall: {
    type: Boolean,
    required: true,
  },
  plotLength: {
    type: Number,
    required: true,
  },
  plotBreadth: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Plot", plotSchema);
