import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import RoleDialog from './roles/RoleDialog';
import useFetch from '../../hooks/useFetch';
import { readAllRoles } from '../../api/role';
import { useEffect } from 'react';

const tableHeaders = [
     { id: 'name', label: 'Role Name' },
     { id: 'description', label: 'Description' },
];
export default function ManageRoles() {
     const { trigger, data, loading } = useFetch(readAllRoles);

     useEffect(() => {
          trigger();
     }, []);

     return (
          <Box>
               <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mb: 2 }}>
                    <RoleDialog />
               </Box>
               <TableContainer>
                    <Table>
                         <TableHead sx={{ backgroundColor: 'background.gray.main' }}>
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
                                   loading ? <div>Loading...</div> :
                                        data?.map((role) => (
                                             <TableRow key={role.id}>
                                                  <TableCell sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{role.name}</TableCell>
                                                  <TableCell>{role.description}</TableCell>
                                             </TableRow>
                                        ))
                              }
                         </TableBody>
                    </Table>
               </TableContainer>
          </Box>
     )
}
