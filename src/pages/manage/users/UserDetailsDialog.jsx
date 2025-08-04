import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { readUserById } from '../../../api/user';
import { AddCircleOutline, Email, MoreHoriz } from '@mui/icons-material';
import UserAddRolesDialog from './UserAddRolesDialog';

export default function UserDetailsDialog({ open, onClose, userId }) {
     const [addRolesOpen, setAddRolesOpen] = useState(false);
     const [targetUserId, setTargetUserId] = useState(null);

     const { trigger, data, loading } = useFetch(readUserById);

     const handleAddRolesClick = () => {
          setTargetUserId(userId);
          setAddRolesOpen(true);
          onClose();
     };

     useEffect(() => {
          if (open) {
               trigger(userId);
          }
     }, [userId, open]);

     return (
          <>
               <UserAddRolesDialog open={addRolesOpen} onClose={() => setAddRolesOpen(false)} userId={targetUserId} />
               <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                    <DialogContent sx={{
                         minWidth: 400,
                         minHeight: 300
                    }}>
                         {loading ? "Loading..." :
                              data &&
                              <>
                                   <Box
                                        component={"header"}
                                        sx={{ display: "flex", justifyContent: "space-between", gap: 2, alignItems: "center", mb: 1 }}
                                   >
                                        <Box>
                                             <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{data.employee.fullName}</Typography>
                                             <Box sx={{ color: 'text.secondary', }}>
                                                  <Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center" }}>
                                                       {data.employee.office}
                                                       <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                                                       {data.employee.jobTitle}
                                                  </Typography>
                                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                       <Email fontSize='small' /> <Typography variant='body2' sx={{ fontStyle: "italic" }}>{data.email}</Typography>
                                                  </Box>
                                             </Box>
                                        </Box>
                                        <IconButton>
                                             <MoreHoriz />
                                        </IconButton>
                                   </Box>
                                   <Divider />
                                   <List component={"dl"}>
                                        <ListItem component={"dt"} sx={{ display: "flex", gap: 1 }}> </ListItem>
                                   </List>
                                   <Box sx={{ mt: 1 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                             <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Roles</Typography>
                                             <IconButton onClick={handleAddRolesClick}>
                                                  <AddCircleOutline />
                                             </IconButton>
                                        </Box>
                                        {
                                             data && data.roles.length > 0 ? data.roles.map((role) => (
                                                  <Box key={role.id} sx={{ mt: 1 }}>
                                                       <Chip label={role.name} />
                                                  </Box>
                                             )) :
                                                  <Box sx={{ mt: 1 }}>
                                                       <Typography variant='body2'>No current roles assigned</Typography>
                                                  </Box>
                                        }
                                   </Box>
                              </>
                         }
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={onClose}>Close</Button>
                    </DialogActions>
               </Dialog >
          </>
     )
}
