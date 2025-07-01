import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { createSchedule } from '../../../api/schedule';
import useFetch from '../../../hooks/useFetch';
const initialState = {
  title: '',
  description: '',
  startDate: new Date(),
  endDate: new Date()
}

export default function ScheduleFormDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { trigger, loading } = useFetch(createSchedule, {
    onSuccess: (res) => {
      setFormData(initialState);
      setOpenDialog(false);
    }
  })
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
                required />
            </Grid>
            <Grid>
              <TextField
                helperText="End Date *"
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                margin='normal'
                fullWidth
                required />
            </Grid>
          </Grid>
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
