const Task = require("../models/Task.js");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const task = new Task({
      user: req.user.id, // available from authMiddleware
      title,
      description,
      dueDate,
      priority,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get all tasks (optionally filter by status/priority)
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, search, sortBy } = req.query;
    const query = { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $options: "i" };

    let tasks = Task.find(query);

    if (sortBy === "dueDate") tasks = tasks.sort({ dueDate: 1 });
    if (sortBy === "priority") tasks = tasks.sort({ priority: 1 });

    const results = await tasks;
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
