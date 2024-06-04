import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { get, isEmpty } from "lodash";
import { AuthContext } from "../../context/AuthContext";
// End Imports

const ProtectedRoute = () => {
  const { auth_credentials } = useContext(AuthContext);

  return isEmpty(get(auth_credentials, "_id", "")) ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

ProtectedRoute.propTypes = {};

const PrivateRoute = () => {
  const { auth_credentials } = useContext(AuthContext);

  return !isEmpty(get(auth_credentials, "_id", "")) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

PrivateRoute.propTypes = {};

export { PrivateRoute, ProtectedRoute };

