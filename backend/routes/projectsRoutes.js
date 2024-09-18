import express from "express";
import { createProject, deleteProject, getProjectById, updateProject } from "../controllers/projectsControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticate, createProject);
router
  .route("/:id")
  .get(authenticate, getProjectById)
  .put(authenticate, updateProject)
  .delete(authenticate, deleteProject);

export default router;
