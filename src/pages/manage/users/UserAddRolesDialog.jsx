import { Autocomplete, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, List, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import { assignRolesToUser, readUserById } from '../../../api/user';
import { readAllRoles } from '../../../api/role';

export default function UserAddRolesDialog({ open, onClose, userId }) {
     const [roles, setRoles] = useState([]);
     const [selectedRoles, setSelectedRoles] = useState([]);

     // Fetch requests
     const { trigger: fetchUserById, data: userData, loading: fetchUserLoading } = useFetch(readUserById);

     const { trigger: fetchRoles } = useFetch(readAllRoles, {
          onSuccess: (res) => {
               setRoles(res.data);
          }
     });

     const { trigger: assignRoles } = useFetch(assignRolesToUser, {
          onSuccess: () => {
               onClose();
          }
     });

     const userRoleIds = new Set(userData?.roles?.map(role => role.id));
     const filteredRoles = roles.filter(role => !userRoleIds.has(role.id));

     const handleRolesChange = (_, values) => {
          const selected = values.map(role => role.id);
          setSelectedRoles(selected);
     }

     const handleSubmit = (e) => {
          e.preventDefault();
          const payload = {
               roleIdList: selectedRoles
          };
          assignRoles(userId, payload);
     }

     useEffect(() => {
          if (open) {
               fetchUserById(userId);
               fetchRoles();
          }
     }, [open, userId]);

     return (
          <Dialog
               slotProps={
                    {
                         paper: {
                              component: 'form',
                              onSubmit: handleSubmit
                         }
                    }
               }
               open={open} onClose={onClose} maxWidth="sm" fullWidth>
               <DialogContent sx={{
                    minWidth: 400,
                    minHeight: 200
               }}>
                    {
                         fetchUserLoading ? "Loading..." :
                              <>
                                   <Box
                                        component={"header"}
                                        sx={{ display: "flex", justifyContent: "space-between", gap: 2, alignItems: "center", mb: 1 }}
                                   >
                                        <Typography variant='h6'>
                                             Add <span style={{ fontWeight: 'bold' }}>{userData?.employee?.fullName}</span> Roles
                                        </Typography>
                                   </Box>
                                   <Box marginBottom={1}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Current roles</Typography>
                                        {
                                             userData?.roles?.length > 0
                                                  ? userData.roles?.map(role => (
                                                       <Chip key={role.id} label={role.name} />
                                                  )) :
                                                  <Typography variant='body2' fontStyle={'italic'}>No curent roles</Typography>
                                        }
                                   </Box>

                                   <Autocomplete
                                        onChange={handleRolesChange}
                                        multiple
                                        options={filteredRoles || []}
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(props, option) => {
                                             const { key, ...optionProps } = props;
                                             return (
                                                  <Box
                                                       key={key}
                                                       component="li"
                                                       {...optionProps}
                                                  >
                                                       <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            {option.name}
                                                       </Typography>
                                                  </Box>
                                             )
                                        }
                                        }
                                        renderInput={(params) => (
                                             <TextField
                                                  {...params}
                                                  placeholder="Select Roles"
                                                  label="Roles"
                                                  name="roles"
                                                  margin="dense"
                                             />
                                        )}
                                   />
                              </>
                    }
               </DialogContent>
               <DialogActions>
                    <Button onClick={() => onClose()}>Cancel</Button>
                    <Button type='submit' variant='contained'>Add Roles</Button>
               </DialogActions>
          </Dialog>
     )
}
