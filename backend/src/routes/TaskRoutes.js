import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";
import express from "express";
const router = express.Router();
import protect from "../middlewares/auth.js";

router.get("/", protect, getTasks);

router.post("/", protect, createTask);

router.get("/:id", protect, getTaskById);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

export default router;
