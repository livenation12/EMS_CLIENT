import { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import useFetch from '../../../hooks/useFetch';
import { createTask } from '../../../api/task';
import { Person } from '@mui/icons-material';
import { readEmployeeList } from '../../../api/employee';

const initialState = {
     title: '',
     description: '',
     assignedToId: '',
     dueDate: ''
}

export default function TaskFormDialog() {
     const [openTaskDialog, setTaskOpenDialog] = useState(false);
     const [formData, setFormData] = useState(initialState);
     const { trigger, loading } = useFetch(createTask, {
          onSuccess: () => {
               setTaskOpenDialog(false);
               setFormData(initialState);
          }
     });
     const { trigger: fetchEmployees, data: employees } = useFetch(readEmployeeList);

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
          trigger(formData);
     }

     const handleAssignToChange = (_, newValue) => {
          if (newValue) {
               setFormData({ ...formData, assignedToId: newValue.id });
          }
     }

     useEffect(() => {
          fetchEmployees();
     }, [])
     return (
          <>
               <Button onClick={handleFormOpen} variant="contained">New Task</Button>
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
                    <DialogTitle>New Employee</DialogTitle>
                    <DialogContent>
                         <TextField
                              label="Title"
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                              required
                         />
                         <TextField
                              label="Description"
                              type="text"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                              multiline
                              maxRows={4}
                         />
                         <Autocomplete
                              onChange={handleAssignToChange}
                              options={employees?.content || []}
                              getOptionLabel={(option) => option?.fullName}
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
                                                  <Person /> {option?.fullName}
                                             </Typography>
                                        </Box>
                                   );
                              }}
                              renderInput={(params) => (
                                   <TextField
                                        {...params}
                                        placeholder="Select Assign To"
                                        label="Assign To"
                                        name="assignedToId"
                                        margin="normal"
                                   />
                              )}
                         />
                         <TextField label="Due Date"
                              type="date"
                              name="dueDate"
                              value={formData.dueDate}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                         />
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleFormClose}>Cancel</Button>
                         <Button loading={loading} type="submit">Save</Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
