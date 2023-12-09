import Plot from "../models/Plots.js";

function formatDate(date) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata", // You can set the desired time zone
  };
  return date.toLocaleDateString("en-US", options
  );
}
// Create
export const createPlot = async (req, res) => {
  try {
    const plot = await Plot.create(req.body);
    res.status(201).json(plot);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get by ID
export const getPlotById = async (req, res) => {
  const { id } = req.params;
  try {
    const plot = await Plot.findById(id);
    if (!plot) {
      return res.status(404).json({ error: "Plot not found" });
    }
    res.json(plot);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read
export const getPlots = async (req, res) => {
  try {
    const plots = await Plot.find()
      .populate({
        path: "propertyType",
        select: "name -_id", // Include only the 'name' field
      })
      .select("-__v");

    // Map plots and format submitDate
    const formattedPlots = plots.map((plot) => ({
      ...plot.toObject(), // Convert Mongoose document to plain JavaScript object
      submitDate: formatDate(plot.submitDate),
      createdAt: formatDate(plot.createdAt),
      updatedAt: formatDate(plot.updatedAt),
    }));

    formattedPlots.forEach((plot) => {
      if (plot.propertyType) {
        plot.propertyType = plot.propertyType.name;
      }

      // Repeat similar conversions for other fields
    });
    res.json(formattedPlots);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update
export const updatePlot = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPlot = await Plot.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPlot);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete
export const deletePlot = async (req, res) => {
  const { id } = req.params;
  try {
    await Plot.findByIdAndDelete(id);
    res.json({ message: "Plot deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
