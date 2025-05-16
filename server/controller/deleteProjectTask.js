const { Project, Task } = require("../models/TaskSchema");

exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // Delete all tasks associated with the project
    await Task.deleteMany({ project: projectId });

    await Project.findByIdAndDelete(projectId);

    res
      .status(200)
      .json({ success: "success", message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const projectId = task.project;
    if (projectId) {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      project.tasks = project.tasks.filter((t) => t.toString() !== taskId);
      await project.save();
    }

    await Task.findByIdAndDelete(taskId);
    res
      .status(200)
      .json({ success: "success", message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
