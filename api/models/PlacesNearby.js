import mongoose from "mongoose"; // Erase if already required

const placesNearbySchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },

  count: {
    type: Number,
    default: 0,
  },
  distance: {
    type: String,
    default: 0,
  },
  // Add more item details as needed
});

//Export the model
export default mongoose.model("Placesnearby", placesNearbySchema);
