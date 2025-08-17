import mongoose from "mongoose";

const fromSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  branch: { type: String, required: true },
  activities: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
}, { timestamps: true });

const Form = mongoose.model("Form", fromSchema);

export default Form