const express = require("express");
const {createTask, getTasks, getTeamMembers,getProjectName} = require("../controllers/taskController");
const {updateTask} = require("../controllers/teamMemberController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/createTask", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/updateTask/:id", authMiddleware, updateTask);
router.get("/members", authMiddleware, getTeamMembers);
router.get("/projectName", authMiddleware, getProjectName);

module.exports = router;