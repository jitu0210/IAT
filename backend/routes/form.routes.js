import express from "express";
import { submitForm, getAllForms, getDailyForms } from "../controllers/form.controller.js";

const router = express.Router();

router.post("/submit-form", submitForm);
router.get("/all-intern", getAllForms); // public
router.get("/daily-intern", getDailyForms); // protected

export default router;
