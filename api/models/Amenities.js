import mongoose from "mongoose";


const AmenitiesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Add more fields as needed
});
export default mongoose.model("Amenities", AmenitiesSchema);
