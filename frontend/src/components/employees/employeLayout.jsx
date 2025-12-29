import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "./employeSidebar";
const { Sider, Content } = Layout;

const EmployeeLayout = () => {
  return (
    <Layout className="min-h-screen bg-gray-900">
      <Sider
        width={220}
        className="!fixed !left-0 !top-0 !bottom-0 h-screen overflow-auto bg-gray-800"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="pt-5">
          <EmployeeSidebar />
        </div>
      </Sider>

      <Layout className="ml-0 lg:ml-220 min-h-screen transition-all duration-300">
        <Content  className="p-4 md:p-8 min-h-screen bg-gray-900">
          <div className="w-full max-w-7xl mx-auto">
            <div className="bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
               <Outlet />
            </div>
           
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EmployeeLayout;
