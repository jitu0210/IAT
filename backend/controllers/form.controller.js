import Form from "../models/form.model.js";

// Submit a new form (public)
export const submitForm = async (req, res) => {
  try {
    const { name, branch, activities, date } = req.body;

    if (!name || !branch || !activities || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a submission exists within the last 12 hours for the same name
    const last12Hours = new Date(Date.now() - 12 * 60 * 60 * 1000);
    const existing = await Form.findOne({
      name,
      date: { $gte: last12Hours },
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "You can submit only once every 12 hours" });
    }

    const form = await Form.create({ name, branch, activities, date });
    res.status(201).json(form);
  } catch (err) {
    console.error("SubmitForm Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all submissions (public)
export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ date: -1 });
    res.status(200).json(forms);
  } catch (err) {
    console.error("GetAllForms Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get submissions in the last 12 hours (public)
export const getDailyForms = async (req, res) => {
  try {
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
    const forms = await Form.find({ date: { $gte: twelveHoursAgo } }).sort({
      date: -1,
    });
    res.status(200).json(forms);
  } catch (err) {
    console.error("GetRecentForms Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
