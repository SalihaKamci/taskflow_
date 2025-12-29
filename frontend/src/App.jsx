import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminTasks from "./pages/admin/adminTasks";
import AdminEployees from "./pages/admin/adminEmployees"
import ForcePasswordChange from "./pages/login/ForcePasswordChange";
import EmployeeDashboard from "./pages/employee/employeeDashboard";
import EmployeeLayout from "./components/employees/employeLayout";
import EmployeeTask from "./pages/employee/employeeTask";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      <Route path="/change-password" element={<ForcePasswordChange />} />
     
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Admin />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="employees" element= {<AdminEployees/>} />
        </Route>


     <Route path="/employee" element={<EmployeeLayout />}>
       <Route index element={<Navigate to="dashboard" />} />
  <Route path="dashboard" element={<EmployeeDashboard />} />
  <Route path="tasks" element={<EmployeeTask />} />
       
</Route>

  
      
      
      
      
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
