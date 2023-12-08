import mongoose from "mongoose";

const commercialSpaceLeaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
});
export default mongoose.model(
  "CommercialSpaceLease",
  commercialSpaceLeaseSchema
);
