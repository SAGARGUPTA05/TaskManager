import React from "react";

const TaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#393E46] text-[#DFD0B8] p-6 rounded-lg max-w-md w-full shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-[#DFD0B8] text-xl hover:text-red-400"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2">{task.title}</h2>
        <p className="mb-1"><strong>Status:</strong> {task.status}</p>
        <p className="mb-1"><strong>Priority:</strong> {task.priority}</p>
        <p className="mb-1"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
        <p className="mb-1"><strong>Description:</strong> {task.description}</p>
        <p className="text-sm text-[#948979] mt-2">Task ID: {task._id}</p>
      </div>
    </div>
  );
};

export default TaskModal;
