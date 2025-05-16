const express = require("express");
const Router = express.Router();
const userAuth = require("../middleware/userauth");
const {
  deleteProject,
  deleteTask,
} = require("../controller/deleteProjectTask");

Router.post("/project/:projectId", userAuth, deleteProject);
Router.post("/task/:taskId", userAuth, deleteTask);

module.exports = Router;
