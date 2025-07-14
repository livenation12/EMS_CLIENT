import { Campaign } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'

export default function NoticeMegaphone() {
     const [open, setOpen] = useState(false)
     const handleSubmit = () => { }
     return (
          <>
               <Button onClick={() => setOpen(true)} variant='contained' startIcon={<Campaign />}>Announce</Button>
               <Dialog
                    open={open}
                    slotProps={{
                         paper: {
                              component: 'form',
                              onSubmit: handleSubmit
                         },
                    }}>
                    <DialogTitle>Make an Announcement</DialogTitle>
                    <DialogContent>
                         <TextField
                              autoFocus
                              margin="normal"
                              id="name"
                              label="Title"
                              type="text"
                              fullWidth
                              variant="standard"
                         />
                         <TextField
                              autoFocus
                              margin="normal"
                              id="name"
                              label="Description"
                              type="text"
                              fullWidth
                              variant="standard"
                         />
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={() => setOpen(false)}>Cancel</Button>
                         <Button variant='contained' type="submit">Announce</Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
