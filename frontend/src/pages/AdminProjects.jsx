import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import api from "../api/axios";
import { Button } from "antd";
const statusColorMap = {
  Active: "green",
  Completed: "blue",
  "On Hold": "orange",
};

const AdminProjects = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");

    api.get("/projects", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Projeler yüklenemedi");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Proje Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColorMap[status]}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Başlangıç",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Bitiş",
      dataIndex: "endDate",
      key: "endDate",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-6">
          Projeler
        </h1>
        <Button type="primary" onClick={() => setOpen(true)}>
          Yeni Proje Ekle
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={projects}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />


    </>
  );
};

export default AdminProjects;
