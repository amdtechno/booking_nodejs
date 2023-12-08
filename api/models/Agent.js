import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique: true },
  mobile: { type: Number, required: true,unique: true },
  // Add more fields as needed
});
export default mongoose.model("Agent", agentSchema);
