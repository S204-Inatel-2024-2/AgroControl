import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import Layout from "../layout";
import { EmployeeRegistration } from "../pages/EmployeeRegistration";
import { RegisterFinances } from "../pages/RegisterFinances";
import { EmployeeDetails } from "../pages/EmployeeDetails";
import { ServiceDetails } from "../pages/ServiceDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LoginPage />} />
          <Route path="home" element={<Home />} />
          <Route path="employeeregistration" element={<EmployeeRegistration />} />
          <Route path="registerfinances" element={<RegisterFinances />} />
          <Route path="employeedetails/:id" element={<EmployeeDetails />} />
          <Route path="servicedetails/:id" element={<ServiceDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
