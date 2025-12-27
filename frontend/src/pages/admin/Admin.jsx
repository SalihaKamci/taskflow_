import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "../../components/admin/AdminLayout";
import DashboardHeader from "../../components/admin/DashboardHeader";
import StatsCards from "../../components/admin/StatsCards";
import ProjectStatusBar from "../../components/admin/ProjectStatusBar";



const Admin = () => {
  const [stats, setStats] = useState(null);
  const [taskStatusData, setTaskStatusData] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/dashboard/admin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
      setStats(res.data);

      setTaskStatusData({
        today: res.data.todayTasks,
        weekly: res.data.weeklyTasks,
        overdue: res.data.overdueTasks,
        pending: res.data.pendingTasks,
        onHold: res.data.onHoldTasks,
      });
    }).catch(() => alert("admin fail"));
  }, []);

  if (!stats || !taskStatusData) return <div>Loading...</div>;

  return (
   <>
     <DashboardHeader adminName="Admin-1" />
      <StatsCards stats={stats} />
      <ProjectStatusBar data={taskStatusData} />
  
   </>
     
  );
};

export default Admin;
