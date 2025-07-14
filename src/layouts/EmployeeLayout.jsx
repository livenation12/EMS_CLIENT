

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";
import { List, Monitor, Settings } from "@mui/icons-material";

const links = [
     { label: 'List', to: '/employees/list', icon: <List /> },
     { label: 'Monitor', to: '/employees/monitor', icon: <Monitor /> },
     { label: 'Manage', to: '/employees/manage', icon: <Settings /> },
];

export default function EmployeeLayout() {
     return (
          <Box>
               <PageNav links={links} />
               <Outlet />
          </Box>
     )
}
