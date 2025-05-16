const { Project, Task } = require("../models/TaskSchema");

const User = require("../models/UserSchema");

exports.getUserData = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: "success",
      message: "User data retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "unauthorized" });
    }

    const projects = await Project.find({ userId }).populate("tasks");

    res
      .status(200)
      .json({ success: "success", message: "All Projects", data: projects });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllTasks = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const tasks = await Task.find({ project: null, userId });

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found " });
    }

    res
      .status(200)
      .json({ success: "success", message: "All Tasks", data: tasks });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
