import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("City", citySchema);
