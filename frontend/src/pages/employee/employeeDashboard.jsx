import { useEffect, useState } from "react";
import api from "../../api/axios"
import TaskStatusBar from "../../components/employees/taskStatusBar";
import TaskStatusCards from "../../components/employees/TaskStatusCards";
import { Card, Row, Col, Typography } from "antd";

const { Title } = Typography;

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
        "Gecikmiş Görevler": res.data.overdueTasks,
        "Toplam Proje": res.data.projectCount,
        "Toplam görevler": res.data.totalTasks,
        "Bugün Tamamlanacaklar": res.data.todayTasks,
        "Bu Hafta Tamamlanacaklar": res.data.weeklyTasks,
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
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <Title level={3} className="!text-white !mb-2">
              Hoş geldin, <strong className="text-blue-400">{user?.fullName}</strong>
            </Title>
            <p className="text-gray-400">Görev durumlarını aşağıdan takip edebilirsin</p>

          </div>


        </div>

      </Card>

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <TaskStatusBar data={taskStatusCounts} />
      </div>
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <TaskStatusCards data={stats} />
      </div>
    </div>




  );
};

export default EmployeeDashboard;