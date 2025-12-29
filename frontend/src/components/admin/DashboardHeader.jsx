import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const DashboardHeader = ({ adminName }) => {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <Title level={2} className="!text-white !mb-2">
            {adminName || "Admin"} Dashboard
          </Title>
          <Text className="text-gray-400">
            Genel durum ve istatistikler
          </Text>
        </div>
        <div className="mt-4 md:mt-0">
          <Text className="text-gray-400">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default DashboardHeader;
