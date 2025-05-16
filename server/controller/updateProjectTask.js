const { Project, Task } = require("../models/TaskSchema");

exports.updateProject = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      projectId,
      name,
      description,
      startDate,
      endDate,
      status,
      comment,
      priority,
      dueDate,
    } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: "project Id is required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Conditionally update fields if they are provided
    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;
    if (startDate !== undefined) project.startDate = startDate;
    if (endDate !== undefined) project.endDate = endDate;
    if (status !== undefined) project.status = status;
    if (comment !== undefined) project.comment = comment;
    if (priority !== undefined) project.priority = priority;
    if (dueDate !== undefined) project.dueDate = dueDate;

    project.updatedAt = Date.now();
    project.save();
    res.status(200).json({
      success: "success",
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { taskId, title, description, status, comment, priority, dueDate } =
      req.body;

    if (!taskId) {
      return res.status(400).json({ message: "taskId is Required" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (comment !== undefined) task.comment = comment;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    task.updatedAt = Date.now();

    await task.save();

    res
      .status(200)
      .json({ success: "success", message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
