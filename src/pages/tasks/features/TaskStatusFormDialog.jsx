import { Autocomplete, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { createTaskStatus } from "../../../api/task-status";
import {useSnackbar} from "../../../contexts/SnackbarContext";
import useFetch from "../../../hooks/useFetch";
const initialState = {
     label: '',
     colorCode: '#808080',
     isDefault: false
}

export default function TaskStatusFormDialog() {
     const snackbar = useSnackbar();
     const [openTaskDialog, setTaskOpenDialog] = useState(false);
     const [formData, setFormData] = useState(initialState);
     const { trigger, loading } = useFetch(createTaskStatus, {
          onSuccess: (res) => {
               setTaskOpenDialog(false);
               setFormData(initialState);
               snackbar(res.message || 'Successfully created.');
          }
     })

     const handleFormClose = () => {
          setTaskOpenDialog(false);
     }
     const handleFormOpen = () => {
          setTaskOpenDialog(true);
     }
     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value
          }));
     }

     const handleSubmit = (e) => {
          e.preventDefault();
          console.log(formData);
          trigger(formData);
     }

     return (
          <>
               <Button onClick={handleFormOpen} variant="contained">New Status</Button>
               <Dialog
                    open={openTaskDialog}
                    onClose={handleFormClose}
                    slotProps={{
                         paper: {
                              component: 'form',
                              onSubmit: handleSubmit
                         },
                    }}
               >
                    <DialogTitle>New Task Status</DialogTitle>
                    <DialogContent>
                         <TextField
                              label="Label"
                              type="text"
                              name="label"
                              value={formData.label}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                              required
                         />
                         <TextField
                              label="Color code"
                              type="color"
                              name="colorCode"
                              value={formData.colorCode}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                         />
                         <FormControlLabel control={<Checkbox checked={formData.isDefault} value={formData.isDefault} onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })} />} label="Use as Default" />
                         
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleFormClose}>Cancel</Button>
                         <Button loading={loading} type="submit">Save</Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
