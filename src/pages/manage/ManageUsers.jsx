import { Box, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react';
import { readAllUsers } from '../../api/user';
import UserDetailsDialog from './users/UserDetailsDialog';
import { MoreHoriz } from '@mui/icons-material';

const tableHeaders = [
  { id: 'actions' },
  { id: 'email', label: 'Email' },
  { id: 'employeeName', label: 'Employee Name' },
];

export default function ManageUsers() {
  const [dialog, setDialog] = useState({
    open: false,
    userId: null
  });
  const { trigger: fetchUsers, data, loading } = useFetch(readAllUsers);

  const handleOpenDialog = (userId) => {
    setDialog({
      open: true,
      userId: userId
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} >
          <TableHead sx={{ backgroundColor: 'background.gray.main' }}>
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
                  <IconButton onClick={() => handleOpenDialog(user.id)}>
                    <MoreHoriz />
                  </IconButton>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.employee.fullName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserDetailsDialog open={dialog.open} onClose={() => setDialog(false)} userId={dialog.userId} />
    </Box>
  )
}

