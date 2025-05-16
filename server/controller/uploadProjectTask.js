const { Project, Task } = require("../models/TaskSchema");

exports.uploadProject = async (req, res) => {
  try {
    const {
      name,
      description,
      startDate,
      endDate,
      comment,
      priority,
      dueDate,
    } = req.body;
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description is required" });
    }

    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      comment,
      priority,
      dueDate,
      userId,
    });

    await newProject.save();

    res.status(201).json({
      success: "success",
      message: "Project created successfully",
      newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.uploadTask = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    let project;
    const {
      title,
      description,
      comment,
      status,
      projectId,
      priority,
      dueDate,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is Required" });
    }
    if (projectId) {
      project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
    }
    const newTask = new Task({
      title,
      description,
      comment,
      status,
      project: projectId,
      priority,
      dueDate,
      userId,
    });
    if (!newTask) {
      return res.status(400).json({ message: "Task creation failed" });
    }
    if (projectId) {
      project.tasks.push(newTask._id);
      await project.save();
    }

    await newTask.save();

    res.status(201).json({
      success: "success",
      message: "Task created successfully",
      newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
