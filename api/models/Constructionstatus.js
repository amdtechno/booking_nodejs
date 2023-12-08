import mongoose from "mongoose";


const ConstructionstatusSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Add more fields as needed
});
export default mongoose.model("Constructionstatus", ConstructionstatusSchema);
