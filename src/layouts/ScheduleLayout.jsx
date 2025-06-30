import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function ScheduleLayout() {
     return (
          <Box>
               <Outlet />
          </Box>
     )
}
