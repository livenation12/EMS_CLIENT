import { Box, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import RoleDialog from './roles/RoleDialog';
import useFetch from '../../hooks/useFetch';
import { readAllRoles } from '../../api/role';
import { useEffect, useState } from 'react';
import { useManage } from '../../contexts/ManageContext';
import { MoreHoriz } from '@mui/icons-material';
import { roleTHeaders } from '../../static-data/table-heads';
import RoleAddPermissionDialog from './roles/RoleAddPermissionDialog';

export default function ManageRoles() {
     const { state } = useManage();
     const [anchorEl, setAnchorEl] = useState();
     const [dialog, setDialog] = useState({
          open: '',
          roleId: null
     });
     const { trigger, data, loading } = useFetch(readAllRoles);

     const open = Boolean(anchorEl);

     const handleClose = () => {
          setAnchorEl(null);
     }

     const handleOpenDialog = (menu) => {
          setAnchorEl(null);
          setDialog({
               open: menu,
               roleId: dialog.roleId
          });
     }

     const handleMenuClick = (event, roleId) => {
          setAnchorEl(event.currentTarget);
          setDialog(prev => ({
               ...prev,
               roleId
          }));
     }

     useEffect(() => {
          trigger();
     }, [state.role.table.refresh]);

     const handleDialogClose = () => {
          setDialog({ open: '', roleId: null })
     }

     return (
          <>
               <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mb: 2 }}>
                         <RoleDialog />
                    </Box>
                    <TableContainer>
                         <Table>
                              <TableHead sx={{ boxShadow: 1, border: '1px solid #e0e0e0' }}>
                                   <TableRow>
                                        {
                                             roleTHeaders.map((header) => (
                                                  <TableCell key={header.id}>
                                                       {header.label}
                                                  </TableCell>
                                             ))
                                        }
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {
                                        loading ? <TableCell colSpan={roleTHeaders.length}>Loading...</TableCell> :
                                             data?.map((role) => (
                                                  <TableRow key={role.id}>
                                                       <TableCell>
                                                            <IconButton
                                                                 onClick={(e) => handleMenuClick(e, role.id)}
                                                            ><MoreHoriz /></IconButton>
                                                       </TableCell>
                                                       <TableCell sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{role.name}</TableCell>
                                                       <TableCell>{role.description}</TableCell>
                                                  </TableRow>
                                             ))
                                   }
                              </TableBody>
                         </Table>
                    </TableContainer>
               </Box>
               <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                    <MenuItem onClick={() => handleOpenDialog('details')}>Details</MenuItem>
                    <MenuItem onClick={() => handleOpenDialog('permissions')}>Add permissions</MenuItem>
               </Menu>
               <RoleAddPermissionDialog open={dialog.open === 'permissions'} onClose={handleDialogClose} roleId={dialog.roleId} />
          </>
     )
}
