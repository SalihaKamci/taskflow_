import { Menu } from "antd";
import {
  DashboardOutlined,
  ProjectOutlined,
  TeamOutlined,
  ProfileOutlined,
   LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
   
    const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
    navigate("/login");
  };
 
    return (
     <div className="pt-5">
     
     <div className="px-4 py-4 mb-4 border-b border-gray-700">
        <h2 className="text-white text-lg font-semibold text-center">
          Admin Paneli
        </h2>
      </div>
     
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
            className="bg-transparent border-r-0 flex-1"
         onClick={({ key }) => {
          if (key === "logout") {
            handleLogout();
          } else {
            navigate(key);
          }
        }}
   
        items={[
          {
            key: "/admin/dashboard",
            icon: <DashboardOutlined className="text-blue-400" />,
            label: (
              <span className="text-gray-200 hover:text-white transition-colors">
                Dashboard
              </span>
            ),
            className: "hover:bg-gray-700 rounded-lg mx-2 mb-1"
          },
          {
            key: "/admin/projects",
            icon: <ProjectOutlined className="text-green-400" />,
            label: (
              <span className="text-gray-200 hover:text-white transition-colors">
                Projeler
              </span>
            ),
            className: "hover:bg-gray-700 rounded-lg mx-2 mb-1"
          },
          {
            key: "/admin/tasks",
            icon: <ProfileOutlined className="text-purple-400" />,
            label: (
              <span className="text-gray-200 hover:text-white transition-colors">
                Tasklar
              </span>
            ),
            className: "hover:bg-gray-700 rounded-lg mx-2 mb-1"
          },
          {
            key: "/admin/employees",
            icon: <TeamOutlined className="text-yellow-400" />,
            label: (
              <span className="text-gray-200 hover:text-white transition-colors">
                Çalışanlar
              </span>
            ),
            className: "hover:bg-gray-700 rounded-lg mx-2"
          },
           {
            key: "logout",
            icon: <LogoutOutlined className="text-red-400" />,
            label: (
              <span className="text-red-400 hover:text-red-300">
                Çıkış Yap
              </span>
            ),
            className:
              "hover:bg-red-500/10 rounded-lg mx-2 mt-6 border-t border-gray-700",
          },
        ]}
      />
    
     </div>
   
   
   
  );
};

export default AdminSidebar;