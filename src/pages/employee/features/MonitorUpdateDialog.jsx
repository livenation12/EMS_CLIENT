import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Autocomplete, Box, Typography } from "@mui/material"
import useFetch from '../../../hooks/useFetch'
import { readEmployeeStatusTypeList } from '../../../api/employee-status-type';
import { updateEmployeeStatus } from '../../../api/employee-status';
import { Circle, Send } from '@mui/icons-material';
import { useEmployeeContext } from '../../../contexts/EmployeeContext';
import { useSnackbar } from '../../../contexts/SnackbarContext';

const initialState = {
  statusId: '',
  task: '',
}

export default function MonitorUpdateDialog() {
  const snackBar = useSnackbar();
  const { state, dispatch } = useEmployeeContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { trigger, data } = useFetch(readEmployeeStatusTypeList);
  const { trigger: update, loading } = useFetch(updateEmployeeStatus, {
    onSuccess: (res) => {
      snackBar(res.message || 'Successfully updated.');
      dispatch({ type: 'RESET_CHECKED_EMPLOYEES' });
      setOpenDialog(false);
    }
  });

  const handleDialogClose = () => {
    setOpenDialog(false);
  }
  const handleDialogOpen = () => {
    setOpenDialog(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    update({ ...formData, employeeIds: Array.from(state.checkedEmployees) });
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
  useEffect(() => {
    trigger();
  }, [])

  return (
    <>
      <Button onClick={handleDialogOpen} disabled={state.checkedEmployees.length === 0} variant="contained" startIcon={<Send />}> Dispatch</Button>
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
        <DialogTitle>Dispatch employees</DialogTitle>
        <DialogContent>
          <DialogContentText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure tempore placeat suscipit repellat eveniet fugit recusandae, minima veniam? Eos dolor atque corrupti consectetur nisi debitis, labore deserunt cum voluptatibus iure?</DialogContentText>
          <Autocomplete
            onChange={(_, newValue) => {
              setFormData({ ...formData, statusId: newValue.id });
            }}
            options={data}
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
                    <Circle sx={{ color: option.colorCode }} /> {option.label}
                  </Typography>
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Status"
                label="Status"
                name="status"
                margin="dense"
              />
            )}
          />
          <TextField
            id="task"
            label="Task"
            multiline
            name="task"
            onChange={handleChange}
            fullWidth
            margin='dense'
            rows={4}
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
