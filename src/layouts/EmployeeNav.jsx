import { Monitor, List, Settings } from '@mui/icons-material';
import { Box, Button, Stack, Toolbar } from '@mui/material'
import { NavLink } from 'react-router-dom';

const links = [
     { label: 'List', to: '/employees/list', icon: <List /> },
     { label: 'Monitor', to: '/employees/monitor', icon: <Monitor /> },
     { label: 'Manage', to: '/employees/manage', icon: <Settings /> },
];

export default function EmployeeNav() {
     return (
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
     )
}
