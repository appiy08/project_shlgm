import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
// End Imports

export const AppDataContext = createContext({
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

const AppDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    auth_credentials: null,
  });

  return (
    <AppDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppDataContext.Provider>
  );
};

AppDataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppDataContextProvider };

