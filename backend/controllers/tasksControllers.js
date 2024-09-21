import asyncHandler from "../middlewares/asyncHandler.js";
import Project from "../models/projectsModel.js";
import Task from "../models/tasksModel.js";

const createTask = asyncHandler(async (req, res) => {
  try {
    const { name, project, addedBy } = req.body;

    if (!name || !project || !addedBy) {
      res.status(400);
      throw new Error("Please fill all the inputs.");
    }

    const task = new Task({
      name,
      project,
      addedBy,
      isDone: false,
    });

    const associatedProject = await Project.findById(project);

    if (!associatedProject) {
      res.status(404);
      throw new Error("Project not found.");
    }

    const createdTask = await task.save();
    associatedProject.tasks.push(createdTask._id);
    await associatedProject.save();

    res.status(201).json(createdTask);
  } catch (error) {
    res.status(400).json({ message: "Task creation failed", error: error.message });
  }
});

const getTaskById = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("project").populate("addedBy");

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ status: "success", task });
  } catch (error) {
    res.status(400).json({ message: "Failed to retrieve task", error: error.message });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    const { name, isDone } = req.body;

    task.name = name || task.name;
    task.isDone = isDone !== undefined ? isDone : task.isDone;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task", error: error.message });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const project = await Project.findById(task.project);
    if (project) {
      project.tasks = project.tasks.filter((taskId) => taskId.toString() !== task._id.toString());
      await project.save();
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete task", error: error.message });
  }
});

const getAllTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find({}).populate("project").populate("addedBy");
    if (tasks.length <= 0) return res.status(200).json({ message: "there is no tasks" });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Failed to retrieve tasks", error: error.message });
  }
});

export { createTask, deleteTask, getAllTasks, getTaskById, updateTask };
