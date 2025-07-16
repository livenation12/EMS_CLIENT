import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import { readEmployeeList } from '../../../api/employee';
import { Person } from '@mui/icons-material';
import { updateScheduleById } from '../../../api/schedule';
import { useSchedule } from '../../../contexts/ScheduleContext';

export default function ScheduleUpdateDialog({ openDialog, onClose, schedule, ...props }) {
     const { dispatch } = useSchedule();
     const [formData, setFormData] = useState({});
     const { trigger: fetchEmployees, data: employees } = useFetch(readEmployeeList);
     const { trigger: updateSchedule, error } = useFetch(updateScheduleById, {
          onSuccess: () => {
               dispatch({ type: 'REFRESH_CALENDAR' });
               onClose();
          }
     });
     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value
          }))
     }
     const handleDateChange = (e) => {
          const value = e.target.value;
          setFormData((prevData) => ({
               ...prevData,
               startDate: value,
               endDate: value
          }))
     }
     const handleParticipantChange = (_, value) => {
          const ids = value.map((participant) => participant.id);
          setFormData((prevData) => ({
               ...prevData,
               participantIds: ids
          }));
     }
     const handleSubmit = (e) => {
          e.preventDefault();
          if (schedule.id) {
               updateSchedule(schedule.id, formData);
          }
     }

     useEffect(() => {
          fetchEmployees();
          if (schedule) {
               const ids = schedule?.participants?.map((participant) => participant.id) ?? [];
               setFormData({
                    title: schedule.title || '',
                    description: schedule.description || '',
                    startDate: schedule.startDate || '',
                    endDate: schedule.endDate || '',
                    participantIds: ids || []
               });
          }
     }, [schedule]);

     return (
          <Dialog
               open={openDialog}
               onClose={onClose}
               {...props}
               slotProps={{
                    paper: {
                         component: 'form',
                         onSubmit: handleSubmit
                    },
               }}
          >
               <DialogTitle>Update Schedule</DialogTitle>
               <DialogContent>
                    <TextField
                         label="Title"
                         type="text"
                         name="title"
                         value={formData?.title}
                         onChange={handleChange}
                         fullWidth
                         margin='normal'
                         required
                         error={error?.data?.title}
                    />
                    <Grid
                         size={{
                              xs: 12,
                              sm: 6
                         }}
                         container spacing={1}>
                         <Grid>
                              <TextField
                                   helperText="Start Date *"
                                   type="datetime-local"
                                   name="startDate"
                                   value={formData.startDate}
                                   onChange={handleChange}
                                   margin='normal'
                                   fullWidth
                                   error={error?.data?.startDate}
                                   required />
                         </Grid>
                         <Grid>
                              <TextField
                                   helperText={
                                        error?.data?.endDate ? (
                                             <Typography variant='caption' color='error'>{error.data.endDate}</Typography>
                                        ) : (
                                             'End Date *'
                                        )
                                   }
                                   type="datetime-local"
                                   name="endDate"
                                   value={formData.endDate}
                                   onChange={handleChange}
                                   margin='normal'
                                   fullWidth
                                   error={error?.data?.endDate}
                                   required />
                         </Grid>
                    </Grid>

                    <Autocomplete
                         onChange={handleParticipantChange}
                         multiple
                         options={employees?.content || []}
                         value={
                              employees?.content?.filter(emp =>
                                   formData?.participantIds?.includes(emp.id)
                              ) || []
                         }
                         getOptionLabel={(option) => option?.fullName || ''}
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
                                   helperText={error?.data?.participantIds ? <Typography variant='caption' color='error'>{error.data.participantIds}</Typography> : 'Participants *'}
                                   {...params}
                                   placeholder="Select Participants"
                                   label="Participants"
                                   name="participants"
                                   margin="normal"
                                   error={error?.data?.participantIds}
                              />
                         )}
                    />

                    <TextField
                         label="Description"
                         type="text"
                         name="description"
                         value={formData.description}
                         onChange={handleChange}
                         fullWidth
                         rows={4}
                         multiline
                         margin='normal'
                    />
                    {error && !error.data ? <Typography variant='caption' color='error'>{error.message}</Typography> : null}
               </DialogContent>
               <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type='submit' variant='contained'>Update</Button>
               </DialogActions>
          </Dialog>
     )
}
