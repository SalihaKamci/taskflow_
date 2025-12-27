import api from "../../api/axios";
import { useEffect, useState } from "react";
import { Table, Tag, Button } from "antd";
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
          type="link"
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
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-6">Tasks</h1>

      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={tasks}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <UpdateTaskModal
        open={modalOpen}
        task={selectedTask}
        onClose={() => {
          setModalOpen(false);
          setSelectedTask(null);
        }}
        onUpdated={fetchTasks}
      />
    </>


  );


};

export default EmployeeTask;
