import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "./Components/Public/Layout";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        path: "/Home",
        element: <Home />,
      },
    ],
  },
]);
