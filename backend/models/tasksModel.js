import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    peoject: {},
    employee: {},
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
