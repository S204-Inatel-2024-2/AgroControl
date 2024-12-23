import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import Layout from "../layout";
import { EmployeeRegistration } from "../pages/EmployeeRegistration";
import { RegisterFinances } from "../pages/RegisterFinances";
import { EmployeeDetails } from "../pages/EmployeeDetails";
import { ServiceDetails } from "../pages/ServiceDetails";
import { Employees } from "../pages/Employees";
import { Services } from "../pages/Services";
import { RegisterReceitas } from "../pages/RegisterReceitas";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { Finances } from "../pages/Finances";
import { Dashboard } from "../pages/Dashboard";
import { ServiceEdit } from "../pages/ServicesEdit";
import { FuncionarioEdit } from "../components/FuncionarioEdit";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LoginPage />} />
          <Route path="home" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="employees"
            element={<ProtectedRoute element={<Employees />} />}
          />
          <Route
            path="employeeregistration"
            element={<ProtectedRoute element={<EmployeeRegistration />} />}
          />
          <Route
            path="registrarservico"
            element={<ProtectedRoute element={<RegisterFinances />} />}
          />
          <Route
            path="employeedetails/:id"
            element={<ProtectedRoute element={<EmployeeDetails />} />}
          />
          <Route
            path="employeeEdit/:id"
            element={<ProtectedRoute element={<FuncionarioEdit />} />}
          />
          <Route
            path="RegistrarReceitas"
            element={<ProtectedRoute element={<RegisterReceitas />} />}
          />
          <Route
            path="servicedetails/:id"
            element={<ProtectedRoute element={<ServiceDetails />} />}
          />
          <Route
            path="serviceEdit/:id"
            element={<ProtectedRoute element={<ServiceEdit />} />}
          />
          <Route
            path="services"
            element={<ProtectedRoute element={<Services />} />}
          />
          <Route
            path="finances"
            element={<ProtectedRoute element={<Finances />} />}
          />
          <Route
            path="dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
