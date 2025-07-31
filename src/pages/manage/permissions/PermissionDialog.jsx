import { Add } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { createPermission } from '../../../api/permission'
import { useManage } from '../../../contexts/ManageContext'

const intialState = {
     name: '',
     description: ''
}

export default function PermissionDialog() {
     const { dispatch } = useManage();
     const [formData, setFormData] = useState(intialState);
     const [open, setOpen] = useState(false);
     const { trigger } = useFetch(createPermission, {
          onSuccess: () => {
               setFormData(intialState);
               setOpen(false);
               dispatch({ type: "REFRESH_PERMISSION_TABLE" });
          },
          onError: (error) => {
               console.error("Error creating permission:", error);
          }
     });
     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: name === 'name' ? value.toUpperCase() : value
          }))
     }

     const handleSubmit = (e) => {
          e.preventDefault();
          trigger(formData);
     }
     return (
          <>
               <Button onClick={() => setOpen(true)} variant='contained' startIcon={<Add />}>Permission</Button>
               <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    slotProps={{
                         paper: {
                              component: 'form',
                              onSubmit: handleSubmit
                         }
                    }}
               >
                    <DialogTitle>New Permission</DialogTitle>
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
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                         <Button type="submit" variant="contained" color="primary">Save</Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
