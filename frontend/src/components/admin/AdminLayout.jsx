import { Layout } from "antd";
import AdminSidebar from "./AdminSidebar";

const { Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={220} theme="dark">
        <AdminSidebar />
      </Sider>

      <Layout>
        <Content
          style={{
            padding: "32px",
            background: "#1f1f1f", // dark uyum
          }}
        >
          {/* ⬇️ BU WRAPPER OLMADAN OLMAZ */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-7xl">
              {children}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
