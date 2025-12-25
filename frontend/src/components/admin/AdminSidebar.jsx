import { Menu } from "antd";
import {
  DashboardOutlined,
  ProjectOutlined,
  TeamOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const AdminSidebar = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      items={[
        {
          key: "dashboard",
          icon: <DashboardOutlined />,
          label: "Dashboard",
        },
        {
          key: "projects",
          icon: <ProjectOutlined />,
          label: "Projeler",
        },
        {
          key: "employees",
          icon: <TeamOutlined />,
          label: "Çalışanlar",
        },
        {
          key: "tasks",
          icon: <ProfileOutlined />,
          label: "Tasklar",
        },
      ]}
    />
  );
};

export default AdminSidebar;