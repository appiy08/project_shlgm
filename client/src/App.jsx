import { Navigate, Route, Routes } from "react-router-dom";
// End Component Imports
// Begin Public Page Imports
import PublicLayout from "./Components/Public/Layout";
import CustomerLogIn from "./pages/auth/CustomerLogIn";
import CustomerSignUp from "./pages/auth/CustomerSignUp";
import Home from "./pages/public/Home";
// End Public Page Imports
// Begin Dashboard Page Imports
import DashboardLayout from "./Components/Dashboard/layout/DashboardLayout";
import Billing from "./pages/dashboard/Billing";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import Tables from "./pages/dashboard/Tables";
// End Dashboard Page Imports
// End Page Imports

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<CustomerLogIn />} />
        <Route path="signup" element={<CustomerSignUp />} />
      </Route>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="home" element={<Dashboard />} />
        <Route path="tables" element={<Tables />} />
        <Route path="billing" element={<Billing />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
