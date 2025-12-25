import api from "../api/axios";
import { useEffect, useState } from "react";
import { Table, Tag } from "antd";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/tasks", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err + " taskslar getirelemedi");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "TAKS NAME",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColorMap[status]}>{status}</Tag>,
    },
    {
      title: "priority",
      dataIndex: "priority",
      key: "name",
      render: (status) => <Tag color={statusColorMap[status]}>{status}</Tag>,
    },
    {
      title: "dueDate",
      dataIndex: "dueDate",
      key: "name",
    },
    {
      title: "createdAt",
      dataIndex: "title",
      key: "name",
    },
    {
      title: "updatedAt",
      dataIndex: "title",
      key: "name",
    },
    {
      title: "projectName",
      dataIndex: ["Project", "name"],
      key: "name",
    },
    {
      title: "assignedUser",
      dataIndex: ["assignedUser", "fullName"],
      key: "name",
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
    </>
  );
};

export default AdminTasks;
