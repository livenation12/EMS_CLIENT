import { Box, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { formatDateTimeString } from '../../../utils/date-formats'
import { CalendarMonth } from '@mui/icons-material'

export default function ScheduleInfoDialog({ openDialog, onClose, schedule, ...props }) {
     return (
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
                         </Box>
                    </Box>
               </DialogContent>
          </Dialog>
     )
}
