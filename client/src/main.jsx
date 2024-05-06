import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { config } from "./assets/styles/theme.js";
import { router } from "./Router.jsx";
import "./assets/styles/App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={config}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
