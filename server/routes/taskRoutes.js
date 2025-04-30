const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController.js");

const authMiddleware = require("../middleware/authMiddleware.js");
const analytics = require("../controllers/analyticsController.js");


const router = express.Router();

router.use(authMiddleware); // protect all task routes

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/analytics/priority", analytics.getPriorityDistribution);
router.get("/analytics/completion", analytics.getCompletionStats);
router.get("/analytics/upcoming", analytics.getUpcomingTasks);


module.exports = router;
