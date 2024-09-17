import express from "express";
import { createUser, getUserById, loginUser } from "../controllers/usersControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser);
router.post("/auth", loginUser);
router.route("/:id").get(authenticate, getUserById);

export default router;
