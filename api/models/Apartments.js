// models/Apartment.js
import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    balconies: {
      type: Number,
      required: true,
    },
    additionalRooms: {
      type: String,
      default: "-",
    },
    ageOfTheProperty: {
      type: String,
      required: true,
    },
    totalfloor: {
      type: Number,
      required: true,
    },
    parking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parking",
        // required: true,
      },
    ],
    facing: {
      type: String,
    },
    image: { type: String },
    images: [{ type: String }],
    furnishing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Furnishingstatus",
    },
    propertyonfloor: {
      type: String,
    },
    transaction: {
      type: String,
    },
    availability: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Apartment", apartmentSchema);
