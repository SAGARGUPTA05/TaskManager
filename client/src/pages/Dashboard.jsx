import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [priorityData, setPriorityData] = useState([]);
  const [completion, setCompletion] = useState({});
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [pRes, cRes, uRes] = await Promise.all([
          axios.get("http://localhost:5000/api/tasks/analytics/priority", { withCredentials: true }),
          axios.get("http://localhost:5000/api/tasks/analytics/completion", { withCredentials: true }),
          axios.get("http://localhost:5000/api/tasks/analytics/upcoming", { withCredentials: true }),
        ]);

        if (Array.isArray(pRes.data)) {
          setPriorityData(pRes.data);
        } else {
          setPriorityData([]);
        }

        setCompletion(cRes.data || {});
        setUpcoming(uRes.data || []);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setPriorityData([]);
        setCompletion({});
        setUpcoming([]);
      }
    };

    fetchAnalytics();
  }, []);

  const pieChart = {
    labels: priorityData.map((d) => d._id),
    datasets: [
      {
        label: "Tasks by Priority",
        data: priorityData.map((d) => d.count),
        backgroundColor: ["#f87171", "#fbbf24", "#34d399"], // Red, Yellow, Green
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-[#222831] text-[#DFD0B8]">
      <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>

      <div className="bg-[#393E46] rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 text-[#DFD0B8]">Task Priority Distribution</h3>
        <div className="max-w-xs mx-auto">
          <Pie data={pieChart} />
        </div>
      </div>

      <div className="bg-[#393E46] rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-2 text-[#DFD0B8]">Completion Rate</h3>
        <progress
          value={completion.percentage || 0}
          max="100"
          className="w-full h-4 rounded bg-[#222831] accent-[#DFD0B8] mb-2"
        />
        <p className="text-sm text-[#948979]">
          {completion.completed || 0} of {completion.total || 0} tasks completed (
          {completion.percentage ? completion.percentage.toFixed(1) : "0.0"}%)
        </p>
      </div>

      <div className="bg-[#393E46] rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-2 text-[#DFD0B8]">Upcoming Deadlines</h3>
        <ul className="list-disc pl-5 space-y-1 text-[#DFD0B8]">
          {upcoming.length > 0 ? (
            upcoming.map((task) => (
              <li key={task._id}>
                <strong>{task.title}</strong> – due{" "}
                {new Date(task.dueDate).toLocaleDateString()}
              </li>
            ))
          ) : (
            <li>No upcoming tasks</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
