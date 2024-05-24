import { useAuthContext } from "../context/useAuthContext";
import { useWorkoutsContext } from "../context/useWorkouts";
import { Cookies } from "react-cookie";

export const useLogout = () => {
  const cookies = new Cookies();
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    // Remove Users Cookies
    cookies.remove("user");

    // Dispatch Logout Action
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUT", payload: null });
  };

  return { logout };
};
