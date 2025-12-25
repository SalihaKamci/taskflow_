import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
const { Sider, Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
    
      <Sider width={220}>  <AdminSidebar /> </Sider>

      <Layout>
        <Content
          style={{
            padding: "32px",
            margin: "16px",
            background: "#1f1f1f",
            width: "500px",
          }}
        >
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
