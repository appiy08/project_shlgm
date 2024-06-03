import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import { getCookie } from "../lib/Session";
// End Imports

export const AuthContext = createContext({
  auth_credentials: null,
  dispatch: () => {},
});

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { auth_credentials: action.payload };
    }
    case "SIGNUP": {
      return { auth_credentials: action.payload };
    }
    case "LOGOUT": {
      return { auth_credentials: null };
    }
    default: {
      return state;
    }
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    auth_credentials: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCookie("auth_credentials");
      if (result) {
        dispatch({ type: "LOGIN", payload: result });
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider };
