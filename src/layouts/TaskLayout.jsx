
import { Settings, ViewKanban } from '@mui/icons-material';
import { Box, Button, Stack, Toolbar } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { label: 'Kanban', to: '/tasks/kanban', icon: <ViewKanban /> },
  { label: 'Manage', to: '/tasks/manage', icon: <Settings /> },
];

export default function TaskLayout() {
  return (
    <Box>
      <Box component="nav" sx={{ borderBottom: '1px solid #ccc', mb: 2 }}>
        <Toolbar>
          <Stack direction="row" spacing={2}>
            {links.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                sx={{
                  color: 'text.primary',
                  gap: 1,
                  '&.active': {
                    fontWeight: 'bold',
                    color: 'primary.main',
                    borderBottom: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: 0,
                  },
                }}
              >
                {link.icon} {link.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </Box>
        <Outlet />
    </Box>
  )
}
