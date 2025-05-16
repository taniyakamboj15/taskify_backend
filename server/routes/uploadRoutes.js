const express = require("express");
const Router = express.Router();
const {
  uploadProject,
  uploadTask,
} = require("../controller/uploadProjectTask");
const userAuth = require("../middleware/userauth");

Router.post("/project", userAuth, uploadProject);
Router.post("/task", userAuth, uploadTask);
module.exports = Router;
