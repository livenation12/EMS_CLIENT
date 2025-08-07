import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import useFetch from '../../../hooks/useFetch'
import { createEmployeeStatusType } from '../../../api/employee-status-type'
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { Add } from '@mui/icons-material';

const initialState = {
     label: '',
     colorCode: '#808080'
}

export default function EmployeeStatusTypeDialog() {
     const snackbar = useSnackbar();
     const [openDialog, setOpenDialog] = useState(false)
     const [formData, setFormData] = useState(initialState)
     const { loading, trigger } = useFetch(createEmployeeStatusType, {
          onSuccess: (res) => {
               setOpenDialog(false);
               setFormData(initialState);
               snackbar(res.message || 'Successfully created.');
          }
     })
     const handleDialogClose = () => {
          setOpenDialog(false);
     }
     const handleDialogOpen = () => {
          setOpenDialog(true);
     }

     const handleSubmit = (e) => {
          console.log(formData.colorCode);
          e.preventDefault();
          trigger(formData);
     }
     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value
          }))
     }
     return (
          <>
               <Button onClick={handleDialogOpen} variant="contained" startIcon={<Add />}>Status</Button>
               <Dialog
                    open={openDialog}
                    onClose={handleDialogClose}
                    slotProps={{
                         paper: {
                              component: 'form',
                              onSubmit: handleSubmit
                         },
                    }}
               >
                    <DialogTitle>New Status Type</DialogTitle>
                    <DialogContent>
                         <DialogContentText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure tempore placeat suscipit repellat eveniet fugit recusandae, minima veniam? Eos dolor atque corrupti consectetur nisi debitis, labore deserunt cum voluptatibus iure?</DialogContentText>
                         <TextField
                              label="Label"
                              autoFocus
                              type="text"
                              name="label"
                              value={formData.label}
                              margin="normal"
                              onChange={handleChange}
                              fullWidth
                              variant="standard"
                              required />
                         <TextField
                              sx={{ width: 200 }}
                              label="Color"
                              autoFocus
                              type="color"
                              name="colorCode"
                              value={formData.colorCode}
                              margin="normal"
                              onChange={handleChange}
                              variant="outlined"
                              required
                         />
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleDialogClose}>Close</Button>
                         <Button loading={loading} type="submit">Save</Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
