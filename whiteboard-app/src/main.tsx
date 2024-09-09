import React from "react";
import ReactDOM from "react-dom/client"; // Change this import
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Component/Pages/Home/Home.tsx";
import Error from "./Component/Shared/Error/Error.tsx";
import DrawingDetailPage from "./Component/Pages/Drawing/DrawingDetails/DrawingDetailPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/drawings/:id",
        element: <DrawingDetailPage />,
      },
    ],
  },
]);

// Use createRoot from react-dom/client
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
