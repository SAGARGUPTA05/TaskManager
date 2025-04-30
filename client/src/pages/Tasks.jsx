import { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService.js";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
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
    if (window.confirm("Delete this task?")) {
      await deleteTask(id);
      loadTasks();
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TaskForm
            onSubmit={editingTask ? handleUpdate : handleCreate}
            initialData={editingTask}
            submitLabel={editingTask ? "Update Task" : "Create Task"}
          />
          <hr className="my-4" />
          <TaskList
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default Tasks;
