import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoute from "./api/routes/auth.js";
import hotelRoute from "./api/routes/hotels.js";
import roomsRoute from "./api/routes/rooms.js";
import usersRoute from "./api/routes/user.js";
import categorysRoute from "./api/routes/category.js";
import cityRoute from "./api/routes/city.js";
import appoinmentsRoute from "./api/routes/appoinments.js";
import staffRoute from "./api/routes/staff.js";
import placesnearbyRoute from "./api/routes/placesnearby.js";
import propertyTypesRoute from "./api/routes/propertytypes.js";
import constructionStatusRoute from "./api/routes/constructionstatus.js";
import propertyBhkRoute from "./api/routes/propertybhk.js";
import amenitiesRoute from "./api/routes/amenities.js";
import furnishingStatusRoute from "./api/routes/furnishingstatus.js";
import reraapprovedRoute from "./api/routes/reraapproved.js";
import propertyRoute from "./api/routes/property.js";
import apartmentRoute from "./api/routes/apartment.js";
import parkingRoutes from './api/routes/parking.js';
import plotRoutes from './api/routes/plots.js';
import cors from "cors";
import { verifyAdmin, verifyStaff } from "./Utils/verifyToken.js";

const app = express();
const port = process.env.APP_PORT || 5000;
/// dotenv configuration
dotenv.config();

/// data base config

const connect = async () => {
  try {
    await mongoose.connect(process.env.APP_DB_CLOUD);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!...");
});
// mongoose.connection.on('connected', ()=>{
//     console.log("mongoDB connected.")
// })

app.use(bodyParser.json());

/// check the admin user



// app.get("/api/agent-data", verifyAgents, (req, res) => {
//   // Route logic for agent
// });

// app.get("/api/staff-data", verifyStaff, (req, res) => {
//   // Route logic for staff
// });

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/api/hotels", hotelRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/category", categorysRoute);
app.use("/api/city", cityRoute);
app.use("/api/appoinments", appoinmentsRoute);
app.use("/api/staff", staffRoute);
app.use("/api/placesnearby", placesnearbyRoute);
app.use("/api/propertytype", propertyTypesRoute);
app.use("/api/constructionstatus", constructionStatusRoute);
app.use("/api/propertybhk", propertyBhkRoute);
app.use("/api/amenities", amenitiesRoute);
app.use("/api/furnishingstatus", furnishingStatusRoute);
app.use("/api/reraapproved", reraapprovedRoute);
app.use("/api/property", propertyRoute);
app.use("/api/apartment", apartmentRoute);
app.use("/api/parking", parkingRoutes);
app.use('/api/plots', plotRoutes);



app.get("/api/admin-data", verifyAdmin, (req, res) => {
  // Route logic for admin
  console.log("admin");
});
app.get("/api/staff-data", verifyAdmin, (req, res) => {
  // Route logic for admin
  console.log("staff");
});
app.get("/api/user-data", verifyAdmin, (req, res) => {
  // Route logic for admin
  console.log("user");
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.APP_PORT, () => {
  connect();
  console.log(`Connected to back end port:${process.env.APP_PORT}`);
});
