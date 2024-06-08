import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/auth/useAuthContext";
// End Dependencies
import DashboardLayout from "./Components/Dashboard/Layout/DashboardLayout";
import AppLayout from "./Components/Public/Layout/AppLayout";
import CustomerLogIn from "./pages/auth/CustomerLogIn";
import CustomerSignUp from "./pages/auth/CustomerSignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductCreate from "./pages/dashboard/ProductCreate";
import Products from "./pages/dashboard/Products";
import Profile from "./pages/dashboard/Profile";
import NotFoundPage from "./pages/error/NotFoundPage";
import AddAddressPage from "./pages/public/AddAddressPage";
import AddressPage from "./pages/public/AddressPage";
import CartPage from "./pages/public/CartPage";
import CheckoutPage from "./pages/public/CheckoutPage";
import Home from "./pages/public/Home";
import ProductDetailPage from "./pages/public/ProductDetail";
import ProductsPage from "./pages/public/ProductsPage";
// End Layout, Pages, Component Imports

const App = () => {
  const { auth_credentials } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="address" element={<AddressPage />} />
        <Route path="address/add" element={<AddAddressPage />} />
        <Route
          path="login"
          element={
            !auth_credentials ? <CustomerLogIn /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="signup"
          element={
            !auth_credentials ? (
              <CustomerSignUp />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route path="404" element={<NotFoundPage />} />
      </Route>
      <Route
        path="dashboard"
        element={
          auth_credentials ? <DashboardLayout /> : <Navigate to="/login" />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default App;
