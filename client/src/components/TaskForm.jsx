import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, initialData = {}, submitLabel = "Create Task" }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status:""
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...form, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#393E46] p-6 rounded-lg shadow-md text-[#DFD0B8]"
    >
      <h3 className="text-xl font-semibold mb-4">Task Form</h3>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full mb-3 p-2 bg-[#222831] text-[#DFD0B8] placeholder-[#948979] border border-[#948979] rounded focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-3 p-2 bg-[#222831] text-[#DFD0B8] placeholder-[#948979] border border-[#948979] rounded focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
      />

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-[#222831] text-[#DFD0B8] border border-[#948979] rounded focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="w-full mb-4 p-2 bg-[#222831] text-[#DFD0B8] border border-[#948979] rounded focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full mb-4 p-2 bg-[#222831] text-[#DFD0B8] border border-[#948979] rounded focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
      >
        <option>Pending</option>
        <option>Completed</option>
        
      </select>

      <button
        type="submit"
        className="w-full bg-[#DFD0B8] text-[#222831] font-semibold py-2 rounded hover:bg-[#cfc0a8] transition"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default TaskForm;
