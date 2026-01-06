import { useEffect, useState ,useCallback } from "react";
import { Table, Button , Card} from "antd";
import api from "../../api/axios";
import CreateEmployessModal from "../../components/employees/createEmployessModal";



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
       key: "fullName",
    
    },
    {
      title: "Email",
      dataIndex: "email",
         key: "email",
  
     
    },
   
  ];
    return (
   
           <div className="space-y-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Çalışanlar</h1>
          <p className="text-gray-400">Tüm çalışanları görüntüleyin </p>
        </div>
        
     <Button 
            type="primary" 
            onClick={() => setModalOpen(true)}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            Yeni Çalışan Ekle
          </Button>
        </div>
     
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<Card className="bg-gray-800 border-gray-700">
          <p className="text-gray-400">Toplam Çalışan</p>
          <p className="text-3xl font-semibold text-white">{employees.length}</p>
        </Card>

  </div>
       <Card className="bg-gray-800 border-gray-700 shadow-lg">
     
      <Table
        rowKey="id"
        columns={columns}
        dataSource={employees}
        loading={loading}
        pagination={{  pageSize: 7,
            className: "bg-gray-800 text-white",
         
            showTotal: (total) => `Toplam ${total} çalışan` }}
               className="bg-transparent"
          rowClassName="bg-gray-800 hover:bg-gray-700 text-white"
          scroll={{ x: 800 }}
      />
      </Card>
       <CreateEmployessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={fetchEmployees}
      />
       </div>
    )
}
export default AdminEployees;