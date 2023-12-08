import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavilableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("Room", roomSchema);
