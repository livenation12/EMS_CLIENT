import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AuthRoutes from "./AuthRoutes";
import employeeRoutes from "./EmployeeRoutes";
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
                              index: true,
                              element: "Dashboard",
                         },
                         {
                              path: "/dashboard",
                              element: "Dashboard",
                         },
                         employeeRoutes
                    ]
               }
          ]
     }


]);

export default router;