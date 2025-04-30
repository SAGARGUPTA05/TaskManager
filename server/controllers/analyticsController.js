const Task = require("../models/Task.js");

// Tasks grouped by priority
exports.getPriorityDistribution = async (req, res) => {
  try {
    const data = await Task.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$priority", count: { $sum: 1 } } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error getting priority distribution", error: err.message });
  }
};

// Completion Rate
exports.getCompletionStats = async (req, res) => {
  try {
    const total = await Task.countDocuments({ user: req.user._id });
    const completed = await Task.countDocuments({ user: req.user._id, status: "Completed" });
    const percentage = total ? (completed / total) * 100 : 0;
    res.json({ total, completed, percentage });
  } catch (err) {
    res.status(500).json({ message: "Error getting completion stats", error: err.message });
  }
};

// Upcoming deadlines
exports.getUpcomingTasks = async (req, res) => {
  try {
    const now = new Date();
    const tasks = await Task.find({
      user: req.user._id,
      dueDate: { $gte: now },
    }).sort({ dueDate: 1 }).limit(5);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error getting upcoming tasks", error: err.message });
  }
};
