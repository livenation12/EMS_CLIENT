
import { Settings, ViewKanban } from '@mui/icons-material';
import { Box, Button, Stack, Toolbar } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom';
import PageNav from '../components/PageNav';

const links = [
  { label: 'Kanban', to: '/tasks/kanban', icon: <ViewKanban /> },
  { label: 'Manage', to: '/tasks/manage', icon: <Settings /> },
];

export default function TaskLayout() {
  return (
    <Box>
      <PageNav links={links} />
      <Outlet />
    </Box>
  )
}
