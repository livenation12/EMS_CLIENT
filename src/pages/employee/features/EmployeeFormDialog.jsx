import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import useFetch from '../../../hooks/useFetch';
import { createEmployee } from '../../../api/employee';
import { useEmployeeContext } from '../../../contexts/EmployeeContext';

const initialState = {
     firstName: '',
     lastName: '',
     middleName: '',
     jobTitle: '',
     office: '',
     birthDate: '',
     jobStatus: '',
     email: ''
}

export default function EmployeeFormDialog() {

     const [openEmployeeForm, setOpenEmployeeForm] = useState(false);
     const [formData, setFormData] = useState(initialState);
     const { dispatch } = useEmployeeContext();
     const { trigger, loading } = useFetch(createEmployee, {
          onSuccess: () => {
               setOpenEmployeeForm(false);
               setFormData(initialState);
               dispatch({ type: 'REFRESH' });
          }
     });
     const handleFormClose = () => {
          setOpenEmployeeForm(false);
     }
     const handleFormOpen = () => {
          setOpenEmployeeForm(true);
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
     return (
          <>
               <Button onClick={handleFormOpen} variant="contained">New Employee</Button>
               <Dialog
                    open={openEmployeeForm}
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
                         <TextField label="First Name"
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                              required />
                         <TextField label="Last Name"
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                              required />
                         <TextField label="Middle Name"
                              type="text"
                              name="middleName"
                              value={formData.middleName}
                              onChange={handleChange}
                              fullWidth
                              margin='normal' />
                         <TextField label="Birth Date"
                              type="date"
                              name="birthDate"
                              value={formData.birthDate}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                              required />
                         <TextField label="Email"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                              required />
                         <TextField label="Job Title"
                              type="text"
                              name="jobTitle"
                              value={formData.jobTitle}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                              required />
                         <TextField label="Office"
                              type="text"
                              name="office"
                              value={formData.office}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                              required />
                         <TextField label="Job Status"
                              type="text"
                              name="jobStatus"
                              value={formData.jobStatus}
                              onChange={handleChange}
                              fullWidth
                              margin='normal'
                              required />
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleFormClose}>Cancel</Button>
                         <Button loading={loading} type="submit">Save</Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
