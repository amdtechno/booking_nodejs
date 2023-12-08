import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "agent", "admin","staff"],
      default: "user",
      // required: true,
    },

    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAgent: {
      type: Boolean,
      default: false,
      // require:true,
    },
    isStaff: {
      type: Boolean,
      default: false,
      // require:true,
    },
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("Users", usersSchema);
