const express = require("express");
const Router = express.Router();
const {
  getAllProjects,
  getAllTasks,
  getUserData,
} = require("../controller/userData");
const userAuth = require("../middleware/userauth");

Router.get("/projects", userAuth, getAllProjects);
Router.get("/tasks", userAuth, getAllTasks);
Router.get("/profile", userAuth, getUserData);

module.exports = Router;
