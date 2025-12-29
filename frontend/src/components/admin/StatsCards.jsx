import { Card, Row, Col } from "antd";
import { 
  ProjectOutlined, 
  ProfileOutlined, 
  TeamOutlined,
  ClockCircleOutlined 
} from "@ant-design/icons";

const StatsCards = ({ stats }) => {
  const items = [
    {
      title: "Toplam Proje",
      value: stats.totals.projects,
       icon: <ProjectOutlined className="text-2xl text-blue-400" />,
      color: "blue",
    },
    {
      title: "Toplam Task",
      value: stats.totals.tasks,
        icon: <ProfileOutlined className="text-2xl text-green-400" />,
      color: "green",
    },
    {
      title: "Toplam Çalışan",
      value: stats.totals.employees,
        icon: <TeamOutlined className="text-2xl text-purple-400" />,
      color: "purple",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {items.map((item) => (
        <Col xs={24} sm={12} lg={6} key={item.title}>
          <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">{item.title}</p>
                <p className="text-3xl font-bold text-white">{item.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${item.color}-500 bg-opacity-10`}>
                {item.icon}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatsCards;
