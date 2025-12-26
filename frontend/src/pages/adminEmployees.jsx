import { useEffect, useState ,useCallback } from "react";
import { Table, Button } from "antd";
import api from "../api/axios";
import CreateEmployessModal from "../components/admin/employees/createEmployessModal";



const AdminEployees =()=>{
 const [employees, setEmployees] = useState([]);
 const [loading, setLoading] = useState(false);
     const [modalOpen, setModalOpen] = useState(false);

  const fetchEmployees = useCallback(() => {
    const token = localStorage.getItem("token");

     setLoading(true);
   api.get("/users/employees", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setEmployees(res.data))
      .catch(() => console.log("employess getirelemedi"))
      .finally(() => setLoading(false));
 }, []);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);
     
  const columns = [
  
    {
      title: "Ad Soyad",
      dataIndex: "fullName",
    
    },
    {
      title: "email",
      dataIndex: "email",
  
     
    },
   
  ];
    return (
        <>
           <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-6">
          Çalışanlar
        </h1>
          <Button type="primary" onClick={() => setModalOpen(true)}>
          Yeni Çalışam Ekle
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={employees}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      
      <CreateEmployessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
onCreated={fetchEmployees}
      />
        </>
    )
}
export default AdminEployees;