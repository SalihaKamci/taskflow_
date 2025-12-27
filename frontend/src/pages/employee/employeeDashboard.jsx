import { useEffect, useState } from "react";
import api from "../../api/axios"
import TaskStatusBar from "../../components/employees/taskStatusBar";
import TaskStatusCards from "../../components/employees/TaskStatusCards";



const EmployeeDashboard = () => {
  const [stats, setStats] = useState(null);
  const [taskStatusCounts, setTaskStatusCounts] = useState(null);
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/dashboard/employee", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats({
        "": res.data.overdueTasks,
        projectCount: res.data.projectCount,
        "today Tasks": res.data.todayTasks,
        totalTasks: res.data.totalTasks,
        weeklyTasks: res.data.weeklyTasks,
      });

      setTaskStatusCounts({
        Pending: res.data.status?.pending || 0,
        "In Progress": res.data.status?.inProgress || 0,
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "employee") {
      window.location.href = "/";
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboard();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  if (!stats) return <div>Loading...</div>;

  return (
    <><div style={{ padding: 32 }}>
      <h3>Hoş geldin, <strong>{user?.fullName}</strong></h3>
    </div>
     
      <TaskStatusBar data={taskStatusCounts} />
      <TaskStatusCards data={stats} />
    </>

  );
};

export default EmployeeDashboard;