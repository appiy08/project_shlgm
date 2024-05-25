import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./assets/styles/App.css";
import ThemeProvider from "./assets/styles/ThemeProvider.jsx";
import { router } from "./Router.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
// End Imports 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
