import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import PageNav from '../components/PageNav'
import { CalendarMonth, Settings } from '@mui/icons-material'

export default function ScheduleLayout() {
     const links = [
          { label: 'Calendar', to: '/schedules/calendar', icon: <CalendarMonth /> },
          { label: 'Manage', to: '/schedules/manage', icon: <Settings /> },
     ]
     return (
          <Box>
               <PageNav links={links} />
               <Outlet />
          </Box>
     )
}
