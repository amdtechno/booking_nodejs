import Plot from '../models/Plots.js';

// Create
export const createPlot = async (req, res) => {
  try {
    const plot = await Plot.create(req.body);
    res.status(201).json(plot);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get by ID
export const getPlotById = async (req, res) => {
    const { id } = req.params;
    try {
      const plot = await Plot.findById(id);
      if (!plot) {
        return res.status(404).json({ error: 'Plot not found' });
      }
      res.json(plot);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Read
export const getPlots = async (req, res) => {
  try {
    const plots = await Plot.find();
    res.json(plots);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update
export const updatePlot = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPlot = await Plot.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedPlot);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete
export const deletePlot = async (req, res) => {
  const { id } = req.params;
  try {
    await Plot.findByIdAndDelete(id);
    res.json({ message: 'Plot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
