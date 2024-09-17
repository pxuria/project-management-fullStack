//packages
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

//utils
import connectDB from "./configs/DB.js";
// import projectsRoutes from "./routes/projectsRoutes.js";
// import tasksRoutes from "./routes/tasksRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dotenv.config();
const port = process.env.PORT || 3000;
connectDB();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/users", usersRoutes);
// app.use("/api/tasks", tasksRoutes);
// app.use("/api/projects", projectsRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
