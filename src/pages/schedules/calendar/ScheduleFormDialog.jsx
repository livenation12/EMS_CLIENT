import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { createSchedule } from '../../../api/schedule';
import useFetch from '../../../hooks/useFetch';
import { useSchedule } from '../../../contexts/ScheduleContext';
import { formatDateToTextField } from '../../../utils/date-formats';
import { Add, Event, Person } from '@mui/icons-material';
import { readEmployeeList } from '../../../api/employee';
import { readAllScheduleTypes } from '../../../api/schedule-type';


export default function ScheduleFormDialog({ oneDay = false, defaultDate = new Date() }) {
  const initialState = {
    title: '',
    description: '',
    startDate: defaultDate,
    endDate: defaultDate,
    typeId: '',
    participantIds: []
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

  const { trigger: fetchEmployees, data: employees } = useFetch(readEmployeeList);
  const { trigger: fetchScheduleTypes, data: scheduleTypes } = useFetch(readAllScheduleTypes);

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
  const handleParticipantChange = (_, value) => {
    const ids = value.map((participant) => participant.id);
    setFormData((prevData) => ({
      ...prevData,
      participantIds: ids
    }));
  }

  const handleTypeChange = (_, value) => {
    setFormData((prevData) => ({
      ...prevData,
      typeId: value.id
    }))
   }

  useEffect(() => {
    fetchScheduleTypes();
    fetchEmployees();
  }, []);

  return (
    <>
      <Button onClick={handleOpen} variant='contained' startIcon={<Add />}>Schedule</Button>
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

          <Autocomplete
            onChange={handleTypeChange}
            options={scheduleTypes || []}
            getOptionLabel={(option) => option.label}
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
                    <Event sx={{ color: option?.colorCode }} /> {option?.label}
                  </Typography>
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Schedule Type"
                label="Schedule Type"
                name="scheduleTypeId"
                margin="normal"
              />
            )}
          />
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
          <Autocomplete
            onChange={handleParticipantChange}
            multiple={true}
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
                placeholder="Select Participants"
                label="Participants"
                name="participants"
                margin="normal"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' loading={loading}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
