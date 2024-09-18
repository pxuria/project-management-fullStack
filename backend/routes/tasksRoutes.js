import express from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/tasksControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(authenticate, getAllTasks).post(authenticate, createTask);

router.route("/:id").get(authenticate, getTaskById).put(authenticate, updateTask).delete(authenticate, deleteTask);

export default router;
