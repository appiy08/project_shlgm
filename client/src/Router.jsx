import { createBrowserRouter, Navigate } from "react-router-dom";
// End Component Imports 
import PublicLayout from "./Components/Public/Layout";
import Home from "./pages/Home";
import CustomerLogIn from "./pages/auth/CustomerLogIn";
import CustomerSignUp from "./pages/auth/CustomerSignUp";
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
]);
