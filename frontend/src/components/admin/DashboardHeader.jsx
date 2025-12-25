const DashboardHeader = ({ adminName }) => {
  return (
    <div className="mb-20">
      <h1 className="text-2xl font-semibold">
        {adminName} Dashboard
      </h1>
      <p className="text-gray-500">
        Genel durum ve istatistikler
      </p>
    </div>
  );
};

export default DashboardHeader;
