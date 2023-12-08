// models/Property.js

import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "PropertyType",
      required: true,
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenities",
        required: true,
      },
    ],
    furnishingStatus: {
      type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Furnishingstatus",
      required: true,
    },
    propertybhk: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PropertyBhk",
        required: true,
      },
    ],
    constructionstatus: {
      type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Constructionstatus",
      required: true,
    },

    reraApproved: {
      type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReraApproved",
      required: true,
    },

    image: { type: String },
    images: [{ type: String }],

    placesnearby: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Placesnearby",
      },
    ],
    isBrokerage: {
      type: Boolean,
      default: false,
    },
    bathrooms: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    }, // Add more properties as needed
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
