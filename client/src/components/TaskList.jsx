import { useState } from "react";
import TaskModal from "./TaskModal.jsx";

import Cookies from "js-cookie"; 
import axios from "axios";

const TaskList = ({ tasks = [], onEdit, onDelete }) => {
  const [filterDate, setFilterDate] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const formatDate = (dateStr) => new Date(dateStr).toISOString().split("T")[0];

  const filteredTasks = tasks.filter((task) => {
    const matchesDate = filterDate ? formatDate(task.dueDate) === filterDate : true;
    const matchesPriority = filterPriority ? task.priority === filterPriority : true;
    return matchesDate && matchesPriority;
  });


  const handleView = async (taskId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${taskId}`, {
        withCredentials: true, 
      });
  
      setSelectedTask(res.data);
    } catch (error) {
      console.error("Failed to fetch task details", error.message);
      alert(error.message);
    }
  };
  

  
  

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div>
          <label className="block text-[#DFD0B8] text-sm mb-1">Filter by Due Date:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-[#222831] text-[#DFD0B8] border border-[#948979] p-2 rounded focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[#DFD0B8] text-sm mb-1">Filter by Priority:</label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#222831] text-[#DFD0B8] border border-[#948979] p-2 rounded focus:outline-none"
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-red-500">No task is available</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className="bg-[#393E46] text-[#DFD0B8] p-4 rounded-lg shadow-md"
            >
              <div className="mb-1">
                <strong className="text-lg">{task.title}</strong>{" "}
                <span className="text-sm text-[#948979]">
                  ({task.priority}) – {task.status}
                </span>
              </div>
              <div className="text-sm mb-2">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleView(task._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(task)}
                  className="bg-[#DFD0B8] text-[#222831] px-3 py-1 rounded hover:bg-[#cfc0a8] transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;
