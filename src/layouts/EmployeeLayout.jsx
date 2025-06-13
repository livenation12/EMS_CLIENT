

import { Box } from "@mui/material";
import EmployeeNav from "./EmployeeNav";
import { Outlet } from "react-router-dom";

export default function EmployeeLayout() {
     return (
          <Box>
               <EmployeeNav />
               <Outlet />
          </Box>
     )
}
