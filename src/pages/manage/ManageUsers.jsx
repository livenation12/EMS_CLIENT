import { Box, Button, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react';
import { readAllUsers } from '../../api/user';
import UserDetailsDialog from './users/UserDetailsDialog';
import { MoreHoriz } from '@mui/icons-material';
import UserAddRolesDialog from './users/UserAddRolesDialog';

const tableHeaders = [
  { id: 'actions' },
  { id: 'employeeName', label: 'Employee Name' },
];

export default function ManageUsers() {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const [dialog, setDialog] = useState({
    open: '',
    userId: null,
  });
  const { trigger: fetchUsers, data, loading } = useFetch(readAllUsers);

  const handleOpenDialog = (menu) => {
    setAnchorEl(null);
    setDialog({
      open: menu,
      userId: dialog.userId
    });
  }

  const handleMenuClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setDialog(prev => ({
      ...prev,
      userId: userId
    }));
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleCloseDialog = () => {
    setDialog({ open: '', userId: null });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} >
            <TableHead sx={{ boxShadow: 1, border: '1px solid #e0e0e0' }}>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell key={header.id}>
                    {header.label || ''}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, user.id)}>
                      <MoreHoriz />
                    </IconButton>
                  </TableCell>
                  <TableCell>{user.employee.fullName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <UserDetailsDialog
          open={dialog.open === 'details'}
          onClose={handleCloseDialog}
          userId={dialog.userId}
        />
        <UserAddRolesDialog
          open={dialog.open === 'roles'}
          onClose={handleCloseDialog}
          userId={dialog.userId} />
      </Box>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={() => handleOpenDialog('details')}>Details</MenuItem>
        <MenuItem onClick={() => handleOpenDialog('roles')}>Add roles</MenuItem>
      </Menu>
    </>
  )
}

