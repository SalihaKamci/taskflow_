import { useEffect, useState } from "react";
import api from "../api/axios";

const Admin = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        api.get("/dashboard/admin", { headers: { Authorization: `Bearer ${token}` } }
        ).then((res) => setStats(res.data)
        ).catch(() => alert("admin fail"));
    }, []);

    if (!stats) return <div>Loading...</div>;

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Total Projects: {stats.totals.projects}</p>
            <p>Total Tasks: {stats.totals.tasks}</p>
            <p>Total Employees: {stats.totals.employees}</p>
        </div>
    );
};

export default Admin;
