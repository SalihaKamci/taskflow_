import { Menu } from "antd";
import {
  DashboardOutlined,
  ProjectOutlined,
  TeamOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
  return (
    <Menu
      theme="dark"
      mode="inline"
     selectedKeys={[location.pathname]}
           onClick={({ key }) => navigate(key)}

      items={[
        {
        key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
        },
        {
         key: "/admin/projects",
      icon: <ProjectOutlined />,
      label: "Projeler",
        },
          {
        key: "/admin/tasks",
      icon: <ProfileOutlined />,
      label: "Tasklar",
        },
        {
        
      key: "/admin/employees",
      icon: <TeamOutlined />,
      label: "Çalışanlar",
        },
      
      ]}
    />
  );
};

export default AdminSidebar;