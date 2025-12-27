const TaskStatusBar = ({ data }) => {
  if (!data) return null;

  const maxValue = Math.max(...Object.values(data), 1);

  return (
    <div className="bg-[#141414] text-white rounded-lg p-6 shadow-sm mt-8">
      <h3 className="text-lg font-semibold mb-6">Task Durumları</h3>

      <div className="space-y-4">
        {Object.entries(data).map(([status, value]) => {
          const width = (value / maxValue) * 100;

          return (
            <div key={status}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">{status}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-blue-600 transition-all"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskStatusBar;
