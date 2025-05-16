const express = require("express");
const Router = express.Router();
const {
  updateProject,
  updateTask,
} = require("../controller/updateProjectTask");

const userAuth = require("../middleware/userauth");

Router.post("/project", userAuth, updateProject);
Router.post("/task", userAuth, updateTask);

module.exports = Router;
