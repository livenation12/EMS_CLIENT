import { Add } from '@mui/icons-material';
import { TextField, Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Input } from '@mui/material';
import { useState } from 'react'
import useFetch from '../../hooks/useFetch';
import { uploadGallery } from '../../api/gallery';
import { useGallery } from '../../contexts/GalleryContext';


export default function GalleryAddDialog() {
     const { dispatch } = useGallery();
     const [openDialog, setOpenDialog] = useState(false);
     const { trigger, loading } = useFetch(uploadGallery, {
          onSuccess: () => {
               setOpenDialog(false);
               dispatch({ type: 'REFRESH_GALLERY' });
          }
     })
     const handleOpen = () => {
          setOpenDialog(true);
     }

     const handleClose = () => {
          setOpenDialog(false);
     }

     const handleSubmit = (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          trigger(formData);
     }
     return (
          <>
               <Button startIcon={<Add />} onClick={handleOpen} variant="contained">Gallery</Button>
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
                    <DialogTitle>Gallery</DialogTitle>
                    <DialogContent>
                         <TextField
                              label="Title"
                              type="text"
                              name="title"
                              // value={formData.title}
                              // onChange={handleChange}
                              fullWidth
                              margin='normal'
                              required
                         />
                         <TextField
                              label="Description"
                              type="text"
                              name="description"
                              // value={formData.description}
                              // onChange={handleChange}
                              fullWidth
                              margin='normal'
                              multiline
                              maxRows={4}
                         />
                         <input
                              name="attachments"
                              multiple
                              type="file"
                              accept="image/*"
                         />
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleClose}>Cancel</Button>
                         <Button
                              loading={loading}
                              variant="contained"
                              type="submit"
                         >
                              Save
                         </Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}
