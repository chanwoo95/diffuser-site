import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Basket from "./pages/Basket";
import NewProduct from "./pages/NewProduct";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "/new",
        element: <NewProduct />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
