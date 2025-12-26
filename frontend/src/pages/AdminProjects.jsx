import { useEffect, useState } from "react";
import { Table, Tag, Button} from "antd";
import api from "../api/axios";
import CreateProjectModal from "../components/admin/proje/CreateProjectModal";

const statusColorMap = {
  Active: "lime",
  Completed: "blue",
  "On Hold": "purple",
};

const AdminProjects = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
 const [modalOpen, setModalOpen] = useState(false);

 const fetchTasks = () => {
    const token = localStorage.getItem("token");

    setLoading(true);
     api.get("/projects", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setProjects(res.data))
      .catch(() => console.log("projeler getirelemedi"))
      .finally(() => setLoading(false));
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchTasks();
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
        <Button type="primary" onClick={() => setModalOpen(true)}>
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
<CreateProjectModal
open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={fetchTasks}
/>

    </>
  );
};

export default AdminProjects;
