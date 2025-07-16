import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from '@mui/material'
import { formatDateTimeString } from '../../../utils/date-formats'
import { CalendarMonth, Group } from '@mui/icons-material'
import { useRef, useState } from 'react';
import ScheduleUpdateDialog from './ScheduleUpdateDialog';

export default function ScheduleInfoDialog({ openDialog, onClose, schedule, ...props }) {
     const [openUpdateDialog, setUpdateDialog] = useState(false);
     const handleUpdateDialog = () => {
          onClose();
          setUpdateDialog(true);
     }
     return (
          <>
               <Dialog
                    open={openDialog}
                    onClose={onClose}
                    {...props}
               >
                    <DialogTitle>{schedule?.title}</DialogTitle>
                    <DialogContent>
                         <Box component='dl'>
                              <Box
                                   sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '150px 1fr',
                                        rowGap: 2,
                                        columnGap: 3,
                                   }}
                              >
                                   <Typography
                                        component="dt"
                                        variant='body2'
                                        sx={{
                                             display: 'inline-flex',
                                             alignItems: 'center',
                                             gap: 1
                                        }}
                                        fontWeight="bold">
                                        <CalendarMonth /> Date
                                   </Typography>
                                   <Typography component="dd" variant='body2' m={0}>
                                        {formatDateTimeString(schedule?.startDate)} - {formatDateTimeString(schedule?.endDate)}
                                   </Typography>
                                   <Typography
                                        component="dt"
                                        variant='body2'
                                        sx={{
                                             display: 'inline-flex',
                                             alignItems: 'center',
                                             gap: 1
                                        }}
                                        fontWeight="bold">
                                        <Group /> Participants
                                   </Typography>
                                   <Stack spacing={1}>

                                        {
                                             schedule?.participants?.length ? schedule?.participants?.map((participant) => (
                                                  <Typography component="dd" variant='body2' m={0} key={participant.id}>
                                                       {participant.fullName}
                                                  </Typography>
                                             )) :
                                                  <Typography component="dd" variant='body2' m={0}>
                                                       No participants
                                                  </Typography>
                                        }
                                   </Stack>

                              </Box>
                         </Box>
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={onClose}>Close</Button>
                         <Button variant='contained' onClick={handleUpdateDialog}>Update</Button>
                    </DialogActions>
               </Dialog>
               <ScheduleUpdateDialog
                    openDialog={openUpdateDialog}
                    onClose={() => setUpdateDialog(false)}
                    schedule={schedule}
               />
          </>
     )
}
