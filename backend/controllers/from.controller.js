import Form from "../models/form.model.js";

// Submit a new form
export const submitForm = async (req, res) => {
  try {
    const { userId, name, branch, activities, date } = req.body;

    // Optional: Check if user submitted in last 24 hours
    const lastSubmission = await Form.findOne({ userId }).sort({ date: -1 });
    if (lastSubmission && (new Date() - new Date(lastSubmission.date)) < 24 * 60 * 60 * 1000) {
      return res.status(400).json({ message: "You can submit only once every 24 hours." });
    }

    const form = new Form({ userId, name, branch, activities, date });
    await form.save();

    res.status(201).json({ message: "Form submitted successfully", data: form });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all form submissions
export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ date: -1 });
    res.status(200).json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get today's submissions
export const getDailyForms = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const forms = await Form.find({
      date: { $gte: today, $lt: tomorrow }
    }).sort({ date: -1 });

    res.status(200).json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
