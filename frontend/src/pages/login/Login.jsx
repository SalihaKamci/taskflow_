import { useState } from "react";
import api from "../../api/axios";
import {
  LockOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import {
  Card,
  Input,
  Button,
  Typography,
  Form,
  Tabs
} from "antd";

const { Title } = Typography;
const { TabPane } = Tabs;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setError] = useState("");

  const handleLogin = async () => {
    try {
      const resAPI = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", resAPI.data.token);
      localStorage.setItem("user", JSON.stringify(resAPI.data.user));

      const user = resAPI.data.user;
      if (user.forcePasswordChange) {
        window.location.href = "/change-password";
        return;
      }
      if (user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/employee";
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-500 flex flex-col md:flex-row">

      <div className="md:w-1/2 bg-gradient-to-br from-slate-800 to-slate-500 p-8 md:p-12 flex flex-col justify-center text-white">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <DashboardOutlined className="text-2xl" />
            </div>
            <Title className="!text-white !mb-0">
              TaskFlow
            </Title>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="bg-slate-400 border-gray-700 shadow-xl">
            <Tabs defaultActiveKey="login" className="text-white">
              <TabPane tab="Giriş Yap" key="login">
                <Form layout="vertical" className="mt-6">
                  <Form.Item
                    label={<span className="text-gray-300">Email</span>}
                  >
                    <Input
                      size="large"
                      placeholder="email@ornek.com"
                      prefix={<UserOutlined className="text-gray-400" />}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"

                      style={{ color: 'black' }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={<span className="text-gray-300">Şifre</span>}
                  >
                    <Input.Password
                      size="large"
                      placeholder="••••••••"
                      prefix={<LockOutlined className="text-gray-400" />}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      style={{ color: 'black' }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => handleLogin()}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 border-none"
                    >
                      Giriş Yap
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>



  );
};

export default Login;
