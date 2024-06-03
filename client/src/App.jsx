import { Navigate, Route, Routes } from "react-router-dom";
// End Component Imports
// Begin Public Page Imports
import AppLayout from "./Components/Public/Layout/AppLayout";
import CustomerLogIn from "./pages/auth/CustomerLogIn";
import CustomerSignUp from "./pages/auth/CustomerSignUp";
import Home from "./pages/public/Home";
import ProductDetailPage from "./pages/public/ProductDetail";
import ProductsPage from "./pages/public/ProductsPage";
// End Public Page Imports
// Begin Dashboard Page Imports
import DashboardLayout from "./Components/Dashboard/Layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductCreate from "./pages/dashboard/ProductCreate";
import Products from "./pages/dashboard/Products";
import Profile from "./pages/dashboard/Profile";
// End Dashboard Page Imports
// End Page Imports

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductDetailPage />} />
        <Route path="login" element={<CustomerLogIn />} />
        <Route path="signup" element={<CustomerSignUp />} />
      </Route>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
