import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { createScheduleType } from "../../../api/schedule-type";

const initialState = {
     label: '',
     colorCode: '#808080'
}

export default function ScheduleTypeFormDialog() {
     const [open, setOpen] = useState(false);
     const [formData, setFormData] = useState(initialState);

     const { trigger } = useFetch(createScheduleType, {
          onSuccess: (res) => {
               setOpen(false);
               setFormData(initialState);
          }
     })

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value
          }))
     }

     const handleSubmit = (e) => {
          e.preventDefault();
          trigger(formData);
     }
     return (
          <>
               <Button sx={{ float: 'right' }} onClick={() => setOpen(true)} variant="contained">Schedule Type</Button>
               <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    slotProps={{
                         paper: {
                              component: 'form',
                              onSubmit: handleSubmit
                         },
                    }}
               >
                    <DialogTitle>Add Schedule Type</DialogTitle>
                    <DialogContent>
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
                         <Button onClick={() => setOpen(false)}>Cancel</Button>
                         <Button type="submit" variant="contained">Save</Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
