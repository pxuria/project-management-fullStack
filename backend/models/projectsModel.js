import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    description: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    technologies: [{ type: String }],
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
