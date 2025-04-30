import { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/taskService.js";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    const res = await fetchTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (data) => {
    await createTask(data);
    loadTasks();
  };

  const handleUpdate = async (data) => {
    await updateTask(editingTask._id, data);
    setEditingTask(null);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-[#222831] text-[#DFD0B8] p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Tasks</h2>

        <TaskForm
          onSubmit={editingTask ? handleUpdate : handleCreate}
          initialData={editingTask}
          submitLabel={editingTask ? "Update Task" : "Create Task"}
        />

        <hr className="my-6 border-[#948979]" />

        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Tasks;
