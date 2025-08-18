import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getDepartmentCounts
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/all-interns", getAllUsers);
router.get("/department-counts", getDepartmentCounts);  // ✅ fixed

export default router;