import api from "../../api/axios";
import { useEffect, useState } from "react";
import { Table, Tag, Button,Card } from "antd";
import UpdateTaskModal from "../../components/employees/UpdateTaskModal";

const EmployeeTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const statusColorMap = {
    "On Hold": "purple",
    Pending: "lime",
    "In Progress": "blue",
    Completed: "blue",
    Blocked: "red",
    Critical: "#e84749",
    High: "#e87040",
    Medium: "#e8b339",
    Low: "#a9d134",
  };

  const fetchTasks = () => {
    const token = localStorage.getItem("token");

    setLoading(true);
    api.get("/tasks", { headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => setTasks(res.data))
      .catch(() => console.log("taskslar getirelemedi"))
      .finally(() => setLoading(false));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = [
    {
      title: "Task Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColorMap[status]}>{status}</Tag>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (status) => <Tag color={statusColorMap[status]}>{status}</Tag>,
    },
    {
      title: "Bitiş Tarihi",
      dataIndex: "dueDate",
      key: "dueDate",
    },

    {
      title: "Proje Adı",
      dataIndex: ["Project", "name"],
      key: "projectName",
    },
    {
      title: "Atanan User",
      dataIndex: ["assignedUser", "fullName"],
      key: "assignedUser",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Button
            type="primary"
          size="small"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setSelectedTask(record);
            setModalOpen(true);
          }}
        >
          Güncelle
        </Button>
      ),
    },
  ];

  return (
   <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-semibold text-white mb-4 sm:mb-0">
          Görevlerim
        </h1>
      </div>

      <Card className="bg-gray-800 border-gray-700 shadow-lg">
        <div className="overflow-x-auto">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={tasks}
            loading={loading}
            pagination={{ 
              pageSize:7 ,
              className: "bg-gray-800 text-white",
          
            }}
            className="bg-transparent"
            rowClassName="bg-gray-800 hover:bg-gray-700 text-white"
            scroll={{ x: 800 }}
          />
        </div>
      </Card>

      <UpdateTaskModal
        open={modalOpen}
        task={selectedTask}
        onClose={() => {
          setModalOpen(false);
          setSelectedTask(null);
        }}
        onUpdated={fetchTasks}
      />
    </div>
  );
};

  

export default EmployeeTask;
