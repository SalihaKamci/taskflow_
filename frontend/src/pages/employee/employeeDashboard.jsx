import { useEffect } from "react";
const EmployeeDashboard = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "employee") {
      window.location.href = "/";
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: 32 }}>
      <h1>Employee Dashboard</h1>
      <p>Hoş geldin, <strong>{user?.fullName}</strong></p>
    </div>
  );
};

export default EmployeeDashboard;