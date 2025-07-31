import { Box, Button, Stack, Toolbar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { borderBottom } from '../utils/styles';
export default function PageNav({ links = [] }) {
     const { user } = useAuth();
     const filteredLinks = links.filter((link) => !link.permittedRoles || link.permittedRoles.some(role => user.roles?.includes(role)));
     return (
          <Box component="nav" sx={{ borderBottom: '1px solid #ccc', mb: 2 }}>
               <Toolbar>
                    <Stack direction="row" spacing={2}>
                         {filteredLinks.map((link) => (
                              <Button
                                   startIcon={link.icon}
                                   key={link.to}
                                   component={NavLink}
                                   to={link.to}
                                   sx={{
                                        color: 'text.primary',
                                        gap: 1,
                                        '&.active': {
                                             ...borderBottom,
                                             fontWeight: 'bold'
                                        },
                                   }}
                              > {link.label}
                              </Button>
                         ))}
                    </Stack>
               </Toolbar>
          </Box>
     )
}
