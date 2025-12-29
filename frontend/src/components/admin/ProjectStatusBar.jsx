import { Card, Typography } from "antd";

const { Title } = Typography;
const ProjectStatusBar = ({ data }) => {
  const statusLabels = {
    today: "Bugünkü Tasklar",
    weekly: "Bu Haftanın Taskları",
    overdue: "Gecikmiş Tasklar",
    pending: "Bekleyen Tasklar",
    onHold: "Askıdaki Tasklar",
  };
const maxValue = Math.max(...Object.values(data), 1);

  return (
  <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <Title level={4} className="!text-white !mb-6">
        Task Durumları
      </Title>

      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => {
          const width = (value / maxValue) * 100;
          const label = statusLabels[key] || key;

          return (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300 capitalize">
                  {label}
                </span>
                <span className="text-sm font-medium text-white">
                  {value}
                </span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ProjectStatusBar;
