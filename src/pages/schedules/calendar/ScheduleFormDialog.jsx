import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { createSchedule } from '../../../api/schedule';
import useFetch from '../../../hooks/useFetch';
import { useSchedule } from '../../../contexts/ScheduleContext';
import { formatDateToTextField } from '../../../utils/date-formats';


export default function ScheduleFormDialog({ oneDay = false, defaultDate = new Date() }) {
  const initialState = {
    title: '',
    description: '',
    startDate: defaultDate,
    endDate: defaultDate
  }
  const { state, dispatch } = useSchedule();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { trigger, loading, error } = useFetch(createSchedule, {
    onSuccess: () => {
      setFormData(initialState);
      setOpenDialog(false);
      dispatch({ type: 'REFRESH_CALENDAR' });
    }
  });

  const handleClose = () => {
    setOpenDialog(false);
  }
  const handleSubmit = (e) => {
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

  const handleOpen = () => {
    setOpenDialog(true);
  }

  const handleDateChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      startDate: value,
      endDate: value
    }))
  }

  return (
    <>
      <Button onClick={handleOpen} variant='contained'>New Schedule</Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit
          },
        }}
      >
        <DialogTitle>New Schedule</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin='normal'
            required />
          {oneDay ?
            <Grid container columnSpacing={2} size={{ xs: 12, sm: 6 }}>
              <Grid size={12} >
                <TextField
                  helperText="Date *"
                  type="date"
                  name="date"
                  value={formData.startDate}
                  onChange={handleDateChange}
                  margin='normal'
                  fullWidth
                  required />
              </Grid>
              <Grid size={6} >
                <TextField
                  helperText="Start Time *"
                  type="time"
                  name="startTime"
                  value={formData.startDate}
                  onChange={handleChange}
                  margin='normal'
                  fullWidth
                  required />
              </Grid>
              <Grid size={6} >
                <TextField
                  helperText="End Time *"
                  type="time"
                  name="endTime"
                  value={formData.startDate}
                  onChange={handleChange}
                  margin='normal'
                  fullWidth
                  required />
              </Grid>
            </Grid>
            :
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
                  value={formatDateToTextField(formData.startDate)}
                  onChange={handleChange}
                  margin='normal'
                  fullWidth
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
                  } type="datetime-local"
                  name="endDate"
                  value={formatDateToTextField(formData.endDate)}
                  onChange={handleChange}
                  margin='normal'
                  fullWidth
                  required />
              </Grid>
            </Grid>
          }
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' loading={loading}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
