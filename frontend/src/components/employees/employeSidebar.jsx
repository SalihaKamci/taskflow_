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
    <Menu
      theme="dark"
      mode="inline"
     selectedKeys={[location.pathname]}
           onClick={({ key }) => navigate(key)}

      items={[
        {
        key: "/employee/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
        },
     
          {
        key: "/employee/tasks",
      icon: <ProfileOutlined />,
      label: "Tasklar",
        },
      
      
      ]}
    />
  );
};

export default EmployeeSidebar;