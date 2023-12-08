import mongoose from "mongoose";


const ReraApprovedSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Add more fields as needed
});
export default mongoose.model("ReraApproved", ReraApprovedSchema);
