import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/auth/Login";
import Employees from "../pages/employee/Employees";
import Register from "../pages/auth/Register";
import AuthRoutes from "./AuthRoutes";

const router = createBrowserRouter([
     //Authentication routes
     {
          element: <AuthRoutes />,
          children: [
               {
                    path: "/login",
                    element: <Login />,
               },
               {
                    path: "/register",
                    element: <Register />,
               },
          ]
     },
     // Main application routes
     {
          path: "/",
          element: <ProtectedRoutes />,
          children: [
               {
                    path: "/",
                    element: <MainLayout />,
                    children: [
                         {
                              path: "employees",
                              element: <Employees />
                         },
                    ]
               }
          ]
     }


]);

export default router;