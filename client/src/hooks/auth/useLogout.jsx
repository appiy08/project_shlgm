import { Cookies } from "react-cookie";
import { useAuthContext } from "./useAuthContext";
// End Imports
export const useLogout = () => {
  const cookies = new Cookies();
  const { dispatch } = useAuthContext();

  const logout = () => {
    // Remove Users Cookies
    cookies.remove("auth_credentials");

    // Dispatch Logout Action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
