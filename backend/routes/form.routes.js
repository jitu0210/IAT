import express from "express";
import { submitForm, getAllForms, getDailyForms } from "../controllers/from.controller.js"

const router = express.Router();

// POST: submit form
router.post("/submit-form", submitForm);

// GET: all submissions
router.get("/all-intern", getAllForms);

// GET: today's submissions
router.get("/forms/daily", getDailyForms);

export default router;