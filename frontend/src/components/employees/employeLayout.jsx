import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "./employeSidebar";
const { Sider, Content } = Layout;

const EmployeeLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
    
      <Sider width={220}>  <EmployeeSidebar /> </Sider>

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

export default EmployeeLayout;
