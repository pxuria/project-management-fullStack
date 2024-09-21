import asyncHandler from "../middlewares/asyncHandler.js";
import Project from "../models/projectsModel.js";
import User from "../models/usersModel.js";

const createProject = asyncHandler(async (req, res) => {
  try {
    const { name, description, technologies, deadline, users } = req.body;

    if (!name || !description || !technologies || !deadline || !users) {
      res.status(400);
      throw new Error("Please fill all the inputs.");
    }

    const project = new Project({
      name,
      description,
      technologies,
      deadline,
      users,
      isDone: false,
    });
    const createdProject = await project.save();

    await User.updateMany({ _id: { $in: users } }, { $push: { projects: createdProject._id } });

    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: "Project creation failed", error: error.message });
  }
});

const getProjectById = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("users").populate("tasks");

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ status: "success", data: project });
  } catch (error) {
    res.status(400).json({ message: "Failed to retrieve project", error: error.message });
  }
});

const updateProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    const { name, description, technologies, deadline, isDone } = req.body;

    project.name = name || project.name;
    project.description = description || project.description;
    project.technologies = technologies || project.technologies;
    project.deadline = deadline || project.deadline;
    project.isDone = isDone !== undefined ? isDone : project.isDone;

    const updatedProject = await project.save();

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: "Failed to update project", error: error.message });
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    await User.updateMany({ _id: { $in: project.users } }, { $pull: { projects: project._id } });

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete project", error: error.message });
  }
});

const searchProjects = asyncHandler(async (req, res) => {
  try {
    const { q } = req.query;
    const projects = await Project.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { technologies: { $regex: q, $options: "i" } },
      ],
    });

    if (!projects.length) return res.status(404).json({ message: "No projects found" });

    res.status(200).json({ status: "success", data: projects });
  } catch (error) {
    res.status(400).json({ message: "Failed to search projects", error: error.message });
  }
});

export { createProject, deleteProject, getProjectById, searchProjects, updateProject };
