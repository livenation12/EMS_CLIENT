import { Box } from '@mui/material'
import ScheduleCalendar from './features/ScheduleCalendar'
import ScheduleFormDialog from './features/ScheduleFormDialog'

export default function ScheduleIndex() {
     return (
          <Box>
               <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <ScheduleFormDialog />
               </Box>
               <ScheduleCalendar />
          </Box>
     )
}
