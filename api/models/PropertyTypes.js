import mongoose from "mongoose";

const propertyTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  // Add more fields as needed
});
export default mongoose.model("PropertyType", propertyTypeSchema);
