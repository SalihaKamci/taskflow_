import { useEffect, useState } from "react";
import { Table, Tag, Button,Card} from "antd";
import api from "../../api/axios";
import CreateProjectModal from "../../components/admin/proje/CreateProjectModal";

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
 
      <div  className="space-y-6">
         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
         <div>
          <h1 className="text-2xl font-semibold text-white">Projeler</h1>
          <p className="text-gray-400">Tüm projeleri görüntüleyin ve yönetin</p>
        </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Button 
            type="primary" 
            onClick={() => setModalOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            Yeni Proje Ekle
          </Button>
        </div>
      </div>
       
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
       
      <Table
        rowKey="id"
        columns={columns}
        dataSource={projects}
        loading={loading}
        pagination={{  pageSize: 7,
            className: "bg-gray-800 text-white",
        
            showTotal: (total) => `Toplam ${total} proje`}}
              className="bg-transparent"
          rowClassName="bg-gray-800 hover:bg-gray-700 text-white"
          scroll={{ x: 800 }}
      />
        </Card>
    

<CreateProjectModal
open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={fetchTasks}
/>

      </div>
  );
};

export default AdminProjects;
