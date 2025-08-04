import { Avatar, Box, Card, CardHeader, CardMedia, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import GalleryAddDialog from './GalleryAddDialog'
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { readAllGalleries } from '../../api/gallery';
import { renderUpload } from '../../utils/string-formats';
import { useGallery } from '../../contexts/GalleryContext';

export default function Gallery() {
     const { state } = useGallery();
     const { trigger, data } = useFetch(readAllGalleries)
     const [hover, setHover] = useState("");

     useEffect(() => {
          trigger();
     }, [state.refresh]);

     return (
          <Box>
               <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mb: 2 }}>
                    <GalleryAddDialog />
               </Box>
               <Grid container spacing={2} sx={{ mt: 2 }}>
                    {
                         data && data.length > 0 ? data.map((gallery) => (
                              <Grid key={gallery.id} size={{
                                   xs: 12,
                                   sm: 6,
                                   lg: 4
                              }}>
                                   <Card sx={{ width: '100%', position: 'relative' }}>
                                        <CardHeader
                                             avatar={
                                                  <Tooltip title={gallery.createdBy?.employee?.fullName || gallery.createdBy?.email}>
                                                       <Avatar>
                                                            {
                                                                 gallery.createdBy?.employee?.fullName.charAt(0).toUpperCase() ||
                                                                 gallery.createdBy?.email.charAt(0).toUpperCase()
                                                            }
                                                       </Avatar>
                                                  </Tooltip>
                                             }
                                             action={
                                                  <IconButton aria-label="settings">
                                                  </IconButton>
                                             }
                                             title={gallery.title}
                                             subheader={gallery.createdAt}
                                        />

                                        <Box
                                             sx={{ position: 'relative', display: 'block' }}
                                             onMouseEnter={() => setHover(gallery.id)}
                                             onMouseLeave={() => setHover(null)}
                                        >
                                             {hover === gallery.id ? (
                                                  <Box
                                                       sx={{
                                                            position: 'absolute',
                                                            top: 8,
                                                            left: 8,
                                                            color: '#fff',
                                                            borderRadius: '4px',
                                                            zIndex: 1,
                                                            inset: 0,
                                                            backdropFilter: 'blur(1.5px)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                       }}
                                                  >
                                                       <Typography variant="h2">
                                                            {gallery.attachmentList.length - 1} +
                                                       </Typography>
                                                  </Box>
                                             ) : null}

                                             <CardMedia
                                                  component="img"
                                                  height="194"
                                                  image={renderUpload(gallery.attachmentList[0].fullPath)}
                                                  alt={`${gallery.title} attachments`}
                                                  sx={{
                                                       inset: 0,
                                                  }}
                                             />
                                        </Box>
                                   </Card>
                              </Grid>
                         )) : <Grid>No galleries found</Grid>
                    }
               </Grid>
          </Box>
     )
}
