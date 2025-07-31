import { Add } from "@mui/icons-material";
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createRole } from "../../../api/role";
import useFetch from "../../../hooks/useFetch";
import { readAllPermissions } from "../../../api/permission";
import { useManage } from "../../../contexts/ManageContext";

const initialState = {
     name: '',
     description: '',
     permissionIds: []
};

export default function RoleDialog() {
     const { dispatch } = useManage();
     const [open, setOpen] = useState(false);
     const [formData, setFormData] = useState(initialState);
     const { trigger, data, loading } = useFetch(createRole, {
          onSuccess: () => {
               dispatch({ type: "REFRESH_ROLE_TABLE" });
               setFormData(initialState);
               setOpen(false);
          }
     });
     const { trigger: fetchPermissions, data: permissions } = useFetch(readAllPermissions);
     const handleSubmit = (e) => {
          e.preventDefault();
          trigger(formData);
     }

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: name === "name" ? value.toUpperCase() : value
          }));
     }

     const handlePermissionChange = (_, value) => {
          setFormData((prevData) => ({
               ...prevData,
               permissionIds: value.map((permission) => permission.id)
          }));
     }

     useEffect(() => {
          fetchPermissions();
     }, []);

     return (
          <>
               <Button onClick={() => setOpen(true)} variant="contained" startIcon={<Add />}> Role</Button>
               <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    slotProps={
                         {
                              paper: {
                                   component: 'form',
                                   onSubmit: handleSubmit
                              }
                         }
                    }
               >
                    <DialogTitle>New Role</DialogTitle>
                    <DialogContent>
                         <TextField
                              label="Name"
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              fullWidth
                              margin='normal' />
                         <TextField
                              multiline
                              rows={4}
                              label="Description"
                              type="text"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              fullWidth
                              margin='normal' />
                         <Autocomplete
                              multiple
                              onChange={handlePermissionChange}
                              options={permissions || []}
                              getOptionLabel={(option) => option?.name}
                              renderOption={(props, option) => {
                                   const { key, ...optionProps } = props;
                                   return (
                                        <Box
                                             key={key}
                                             component="li"
                                             sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                             {...optionProps}
                                        >
                                             <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                  {option?.name}
                                             </Typography>
                                        </Box>
                                   );
                              }}
                              renderInput={(params) => (
                                   <TextField
                                        {...params}
                                        placeholder="Permissions"
                                        label="Permissions"
                                        name="permissionIds"
                                        margin="normal"
                                   />
                              )}
                         />
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={() => setOpen(false)}>Cancel</Button>
                         <Button type="submit" variant="contained">Create</Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
