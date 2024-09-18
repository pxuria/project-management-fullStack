import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDone: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
