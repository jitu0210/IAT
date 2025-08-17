import express from "express";
import cors from "cors";
import formRoutes from "./routes/form.routes.js";
import connectDB from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());
connectDB()

// Routes
app.use("/api", formRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
