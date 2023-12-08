// routes/plotRoutes.js
import express from "express";
import {
  createPlot,
  deletePlot,
  getPlotById,
  getPlots,
  updatePlot,
} from "../controllers/plotCtrl.js";

const router = express.Router();

router.post("/", createPlot);
router.get("/", getPlots);
router.get("/:id", getPlotById); // New route for get by ID
router.put("/:id", updatePlot);
router.delete("/:id", deletePlot);

export default router;
