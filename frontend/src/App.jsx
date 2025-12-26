import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminProjects from "./pages/AdminProjects";
import AdminTasks from "./pages/adminTasks";
import AdminEployees from "./pages/adminEmployees"
import ForcePasswordChange from "./pages/ForcePasswordChange";

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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
