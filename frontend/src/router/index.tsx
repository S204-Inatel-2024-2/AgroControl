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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LoginPage />} />
          <Route path="home" element={<Home />} />
          <Route path="employees" element={<Employees />} />
          <Route
            path="employeeregistration"
            element={<EmployeeRegistration />}
          />
          <Route path="employeeregistration" element={<EmployeeRegistration />} />
          <Route path="registerfinances" element={<RegisterFinances />} />
          <Route path="employeedetails/:id" element={<EmployeeDetails />} />
          <Route path="RegistrarReceitas" element={<RegisterReceitas />} />
          <Route path="servicedetails/:id" element={<ServiceDetails />} />
          <Route path="services" element={<Services/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
