import { Autocomplete, Box, Button, Chip, Dialog, DialogActions, DialogContent, Divider, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import { readAllPermissions } from '../../../api/permission';
import { readRoleById } from '../../../api/role';

export default function RoleAddPermissionDialog({ open, onClose, roleId }) {
  const { trigger: fetchPermissions, data: permissions } = useFetch(readAllPermissions);
  const { trigger: fetchRoles, data: role, loading: fetchRolesLoading } = useFetch(readRoleById);

  const filteredPermissions = permissions?.filter(permission => !role?.permissions?.some(rolePermission => rolePermission.id === permission.id));

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handlePermissionChange = () => { }

  useEffect(() => {
    if (open) {
      fetchPermissions();
      fetchRoles(roleId);
    }
  }, [open, roleId]);

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
          fetchRolesLoading ? "Loading..." :
            <>
              <Box
                component={"header"}
                sx={{ display: "flex", justifyContent: "space-between", gap: 2, alignItems: "center", mb: 1 }}
              >
                <Typography variant='h6'>
                  Add <span style={{ fontWeight: 'bold' }}>{role?.name}</span> Permissions
                </Typography>
              </Box>
              <Box gap={2}>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>Current permissions</Typography>
                <Box gap={1} display='flex' flexWrap={'wrap'}>
                  {
                    role?.permissions?.length > 0
                      ? role?.permissions?.map(permission => (
                        <Chip key={permission.id} label={permission.name} />
                      )) :
                      <Typography variant='body2' fontStyle={'italic'}>No curent roles</Typography>
                  }
                </Box>
              </Box>
              
              <Divider sx={{ marginBlock: 2 }} />

              <Autocomplete
                onChange={handlePermissionChange}
                multiple
                options={filteredPermissions || []}
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
                    placeholder="Select Permissions"
                    label="Permissions"
                    name="permissions"
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
