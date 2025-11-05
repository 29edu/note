import express from "express";
const router = express.Router();
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import protect from "../middlewares/auth.js";

router.get('/profile', protect, getUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
