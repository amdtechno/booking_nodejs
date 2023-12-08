import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
});

//Export the model
export default mongoose.model("Reservation", reservationSchema);
