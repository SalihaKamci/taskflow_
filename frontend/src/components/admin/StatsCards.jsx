import { Card } from "antd";

const StatsCards = ({ stats }) => {
  const items = [
    {
      title: "Toplam Proje",
      value: stats.totals.projects,
    },
    {
      title: "Toplam Task",
      value: stats.totals.tasks,
    },
    {
      title: "Toplam Çalışan",
      value: stats.totals.employees,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {items.map((item) => (
        <Card key={item.title} bordered={false}>
          <p className="text-gray-500">{item.title}</p>
          <p className="text-3xl font-semibold mt-2">
            {item.value}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
