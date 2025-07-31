// ResponsiveDrawer.jsx
import React from 'react';
import { Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItemIcon, ListItemText, useTheme, useMediaQuery, ListItemButton, ListItem, ListItemAvatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink, useNavigate } from 'react-router-dom';
import { Campaign, Collections, EventNote, People, Settings, Task } from '@mui/icons-material';
import useFetch from '../hooks/useFetch';
import { logout } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
const drawerWidth = 240;

export default function Sidebar({ children, window }) {
     const navigate = useNavigate();
     const theme = useTheme();
     const {state} = useAuth();
     const { trigger } = useFetch(logout,{
          onSuccess: () => {
               navigate("/login")
          }
     });
     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
     const [mobileOpen, setMobileOpen] = React.useState(false);

     const handleDrawerToggle = () => {
          setMobileOpen(!mobileOpen);
     };

     const menuItems = [
          { text: 'Dashboard', icon: <DashboardIcon /> , path: '/dashboard' },
          { text: 'Employees', icon: <People />, path: '/employees' },
          { text: 'Tasks', icon: <Task />, path: '/tasks' },
          { text: 'Schedules', icon: <EventNote />, path: '/schedules' },
          { text: 'Gallery', icon: <Collections />, path: '/gallery' },
          { text: 'Notices', icon: <Campaign />, path: '/notices' },
          { text: 'Manage', icon: <Settings />, path: '/manage' }
     ];

     const drawer = (
          <>
               <Toolbar>
                    <Typography variant="h6" noWrap>
                         {import.meta.env.VITE_APP_NAME || 'My App'}
                    </Typography>
               </Toolbar>
               <Divider />
               <List sx={{ flexGrow: 1 }}>
                    {menuItems.map((item, index) => (
                         <ListItemButton
                              component={NavLink}
                              to={item.path}
                              key={index}
                              sx={{
                                   textDecoration: 'none',
                                   color: 'inherit',
                                   '&.active': {
                                        backgroundColor: theme.palette.action.selected,
                                   },
                              }}
                         >
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText primary={item.text} />
                         </ListItemButton>
                    ))}
               </List>
               <Divider />
               <List>
                    <ListItem>
                         <ListItemAvatar>
                              <PersonIcon />
                         </ListItemAvatar>
                         <ListItemText primary="Profile" secondary={state.user.email} />
                    </ListItem>
                    <ListItemButton onClick={() => trigger()}>
                         <ListItemIcon>
                              <LogoutIcon />
                         </ListItemIcon>
                         <ListItemText>Logout</ListItemText>
                    </ListItemButton>
               </List>
          </>
     );

     const container = window !== undefined ? () => window().document.body : undefined;

     return (
          <Box sx={{ display: 'flex' }}>
               {/* Top AppBar */}
               <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                         {isMobile && (
                              <IconButton
                                   color="inherit"
                                   aria-label="open drawer"
                                   edge="start"
                                   onClick={handleDrawerToggle}
                                   sx={{ mr: 2 }}
                              >
                                   <MenuIcon />
                              </IconButton>
                         )}
                         <Typography variant="h6" noWrap>
                              {import.meta.env.VITE_APP_NAME || 'My App'}
                         </Typography>
                    </Toolbar>
               </AppBar>

               {/* Drawer */}
               <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="sidebar navigation"
               >
                    {/* Mobile Drawer */}
                    <Drawer
                         container={container}
                         variant="temporary"
                         open={mobileOpen}
                         onClose={handleDrawerToggle}
                         ModalProps={{ keepMounted: true }}
                         sx={{
                              display: { xs: 'block', sm: 'none' },
                              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                         }}
                    >
                         {drawer}
                    </Drawer>

                    {/* Desktop Drawer */}
                    <Drawer
                         variant="permanent"
                         sx={{
                              display: { xs: 'none', sm: 'block' },
                              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                         }}
                         open
                    >
                         {drawer}
                    </Drawer>
               </Box>

               {/* Main Content */}
               <Box
                    component="main"
                    sx={{
                         flexGrow: 1,
                         p: 3,
                         width: { sm: `calc(100% - ${drawerWidth}px)` },
                         mt: 8,
                    }}
               >
                    {children}
               </Box>
          </Box>
     );
}