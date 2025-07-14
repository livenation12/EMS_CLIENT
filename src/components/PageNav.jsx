import { Box, Button, Stack, Toolbar } from '@mui/material'
import { NavLink } from 'react-router-dom'

export default function PageNav({ links = [] }) {
     return (
          <Box component="nav" sx={{ borderBottom: '1px solid #ccc', mb: 2 }}>
               <Toolbar>
                    <Stack direction="row" spacing={2}>
                         {links.map((link) => (
                              <Button
                                   startIcon={link.icon}
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
                              > {link.label}
                              </Button>
                         ))}
                    </Stack>
               </Toolbar>
          </Box>
     )
}
