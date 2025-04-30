const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title:     { type: String, required: true },
    description: String,
    dueDate:   Date,
    priority:  { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    status:    { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
