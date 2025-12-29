import { Menu } from "antd";
import {
  DashboardOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const EmployeeSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
 
    return (
    <div className="pt-5">

      <div className="px-4 py-4 mb-4 border-b border-gray-700">
 <h2 className="text-white text-lg font-semibold text-center">
          Çalışan Paneli
        </h2>
      </div>
    
    
 
      <Menu
      theme="dark"
      mode="inline"
     selectedKeys={[location.pathname]}
           onClick={({ key }) => navigate(key)}
  className="bg-transparent border-r-0"
      items={[
        {
        key: "/employee/dashboard",
      icon: <DashboardOutlined />,
      label:(   <span className="text-gray-200 hover:text-white transition-colors">
                Dashboard
              </span>),
               className: "hover:bg-gray-700 rounded-lg mx-2 mb-1"
        },
     
          {
        key: "/employee/tasks",
      icon: <ProfileOutlined />,
       label: (
              <span className="text-gray-200 hover:text-white transition-colors">
                Tasklar
              </span>
            ),
            className: "hover:bg-gray-700 rounded-lg mx-2"
        },
      
      
      ]}
    />
    </div>
 
 
 
 
 
  );
};

export default EmployeeSidebar;