import { Avatar, Box, Card, CardHeader, CardMedia, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import GalleryAddDialog from './GalleryAddDialog'
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { readAllGalleries } from '../../api/gallery';
import { renderUpload } from '../../utils/string-formats';
import { useGallery } from '../../contexts/GalleryContext';
import GalleryCarouselDialog from './GalleryCarouselDialog';
import { overlay } from '../../utils/styles';

export default function Gallery() {
     const { state } = useGallery();
     const { trigger, data } = useFetch(readAllGalleries)
     const [hover, setHover] = useState("");
     const [viewedDialog, setViewedDialog] = useState({
          open: false,
          gallery: null
     });
     useEffect(() => {
          trigger();
     }, [state.refresh]);
     return (
          <Box>
               <Box sx={{ position: 'sticky', top: 0, display: 'flex', justifyContent: 'end', alignItems: 'center', mb: 2 }}>
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
                                             title={
                                                  <Typography sx={{ width: '80%', whiteSpace: 'nowrap', textWrap: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                                       {gallery.title}
                                                  </Typography>
                                             }
                                             subheader={gallery.createdAt}
                                        />

                                        <Box
                                             sx={{ position: 'relative', display: 'block' }}
                                             onMouseEnter={() => setHover(gallery.id)}
                                             onMouseLeave={() => setHover(null)}
                                             onClick={() => setViewedDialog({ open: true, gallery })}
                                        >
                                             {hover === gallery.id ? (
                                                  <Box
                                                       sx={overlay}
                                                  >
                                                       <Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
                                                            {gallery.attachmentList.length - 1 > 0 ?
                                                                 <Typography variant="h4">
                                                                      {gallery.attachmentList.length} image(s)
                                                                 </Typography>
                                                                 : null}
                                                            <Typography sx={{ display: 'block' }} variant='body1'>
                                                                 Click to view
                                                            </Typography>
                                                       </Box>
                                                  </Box>
                                             ) : null}

                                             <CardMedia
                                                  component="img"
                                                  height="194"
                                                  image={renderUpload(gallery.attachmentList[0]?.fullPath)}
                                                  alt={`${gallery.title} attachments`}
                                                  sx={{
                                                       inset: 0,
                                                  }}
                                             />
                                        </Box>
                                   </Card>
                              </Grid>
                         )) : <Grid>
                              <Typography variant='body1'> No galleries found
                              </Typography>
                         </Grid>
                    }
               </Grid>
               <GalleryCarouselDialog open={viewedDialog.open} onClose={() => setViewedDialog({ open: false, gallery: null })} gallery={viewedDialog.gallery} />
          </Box>
     )
}
