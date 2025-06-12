import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
     return (
          <Box>
               <Sidebar>
                    <Outlet />
               </Sidebar>
          </Box>
     )
}
