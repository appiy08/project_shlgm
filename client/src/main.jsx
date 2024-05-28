import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./assets/styles/App.css";
import ThemeProvider from "./assets/styles/ThemeProvider.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
// End Imports

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <ThemeProvider>
            <App/>
          </ThemeProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
