import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, Typography } from '@mui/material'
import { useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import { readUserById } from '../../../api/user';
import { Email, More, MoreHoriz } from '@mui/icons-material';

export default function UserDetailsDialog({ open, onClose, userId }) {
     const { trigger, data, loading } = useFetch(readUserById);
     useEffect(() => {
          if (userId) {
               trigger(userId);
          }
     }, [userId]);

     return (
          <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
               <DialogContent sx={{
                    minWidth: 400
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
                                   <Typography variant='subtitle1'>Roles</Typography>
                              </Box>
                         </>
                    }
               </DialogContent>
          </Dialog >
     )
}
