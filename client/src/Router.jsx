import { createBrowserRouter, Navigate } from "react-router-dom";
// End Component Imports
// Begin Public Page Imports 
import PublicLayout from "./Components/Public/Layout";
import Home from "./pages/public/Home";
import CustomerLogIn from "./pages/auth/CustomerLogIn";
import CustomerSignUp from "./pages/auth/CustomerSignUp";
// End Public Page Imports 
// Begin Dashboard Page Imports 
import DashboardLayout from "./Components/Dashboard/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Tables from "./pages/dashboard/Tables";
import Billing from "./pages/dashboard/Billing";
import Profile from "./pages/dashboard/Profile";
// End Dashboard Page Imports 
// End Page Imports

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <CustomerLogIn />,
      },
      {
        path: "signup",
        element: <CustomerSignUp />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "tables",
        element: <Tables />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
