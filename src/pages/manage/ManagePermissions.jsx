import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import useFetch from '../../hooks/useFetch';
import { readAllPermissions } from '../../api/permission';
import { useEffect } from 'react';
import PermissionDialog from './permissions/PermissionDialog';
import { truncate } from '../../utils/styles';
import { useManage } from '../../contexts/ManageContext';

const tableHeaders = [
  { id: 'name', label: 'Permission Name' },
  { id: 'description', label: 'Description' },
];

export default function ManagePermissions() {
  const { state, dispatch } = useManage();
  const { trigger, data, loading } = useFetch(readAllPermissions)

  useEffect(() => {
    trigger();
  }, [state.permission.table.refresh]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mb: 2 }}>
        <PermissionDialog />
      </Box>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: 'background.gray.main', padding: 2 }}>
            <TableRow>
              {
                tableHeaders.map((header) => (
                  <TableCell key={header.id}>
                    {header.label}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data?.length > 0 ? data?.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{permission.name}</TableCell>
                  <TableCell sx={truncate}>{permission.description || "-"}</TableCell>
                </TableRow>
              ))
                :
                <TableRow>
                  <TableCell colSpan={tableHeaders.length} sx={{ textAlign: 'center' }}>
                    No permissions found.
                  </TableCell>
                </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
