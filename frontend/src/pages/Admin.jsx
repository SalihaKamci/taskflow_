import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../components/admin/AdminLayout";
import DashboardHeader from "../components/admin/DashboardHeader";
import StatsCards from "../components/admin/StatsCards";
import ProjectStatusBar from "../components/admin/ProjectStatusBar";

const projectStatusMock = {
  active: 4,
  completed: 2,
  onHold: 1,
};

const Admin = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/dashboard/admin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch(() => alert("admin fail"));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
   <>
     <DashboardHeader adminName="Admin" />
      <StatsCards stats={stats} />
      <ProjectStatusBar data={projectStatusMock} />
  
   </>
     
  );
};

export default Admin;
