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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LoginPage />} />
          <Route path="home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="employees" element={<ProtectedRoute element={<Employees />} />} />
          <Route path="employeeregistration" element={<ProtectedRoute element={<EmployeeRegistration />} />} />
          <Route path="registerfinances" element={<ProtectedRoute element={<RegisterFinances />} />} />
          <Route path="employeedetails/:id" element={<ProtectedRoute element={<EmployeeDetails />} />} />
          <Route path="RegistrarReceitas" element={<ProtectedRoute element={<RegisterReceitas />} />} />
          <Route path="servicedetails/:id" element={<ProtectedRoute element={<ServiceDetails />} />} />
          <Route path="services" element={<ProtectedRoute element={<Services />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
