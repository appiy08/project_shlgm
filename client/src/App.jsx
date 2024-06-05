import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/auth/useAuthContext";
// End Imports
// Begin Public Page Imports
import AppLayout from "./Components/Public/Layout/AppLayout";
import CustomerLogIn from "./pages/auth/CustomerLogIn";
import CustomerSignUp from "./pages/auth/CustomerSignUp";
import Home from "./pages/public/Home";
import ProductDetailPage from "./pages/public/ProductDetail";
import ProductsPage from "./pages/public/ProductsPage";
import CartPage from "./pages/public/CartPage";
import CheckoutPage from "./pages/public/CheckoutPage";
import AddAddressPage from "./pages/public/AddAddressPage";
import PaymentPage from "./pages/public/PaymentPage";
// End Public Page Imports
// Begin Dashboard Page Imports
import { get, isEmpty } from "lodash";
import DashboardLayout from "./Components/Dashboard/Layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductCreate from "./pages/dashboard/ProductCreate";
import Products from "./pages/dashboard/Products";
import Profile from "./pages/dashboard/Profile";
// End Dashboard Page Imports
// End Page Imports

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
        <Route path="address" element={<AddAddressPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route
          path="login"
          element={
            isEmpty(get(auth_credentials, "_id", "")) ? (
              <CustomerLogIn />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          path="signup"
          element={
            isEmpty(get(auth_credentials, "_id", "")) ? (
              <CustomerSignUp />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
      </Route>
      <Route
        path="dashboard"
        element={
          !isEmpty(get(auth_credentials, "_id", "")) ? (
            <DashboardLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
