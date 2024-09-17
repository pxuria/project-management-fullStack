import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tasks: {},
    employees: {},
    description: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
