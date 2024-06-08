import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import App from "./App.jsx";
import "./assets/styles/App.scss";
import ThemeProvider from "./assets/styles/ThemeProvider.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import store from "./store.js";
// End Imports

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AuthContextProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
