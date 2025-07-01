import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box } from '@mui/material';

const localizer = momentLocalizer(moment);
const dummyEvents = [
     {
          id: 0,
          title: 'Test Shift',
          start: new Date(),
          end: new Date(new Date().getTime() + 60 * 60 * 1000), // +1 hour
     }
];
export default function ScheduleCalendar() {
     const handleChangeRange = ({ start, end }) => {
          console.log("start: " + start, "end: " + end);
          if (start === undefined || end === undefined) return
     };
     return (
          <Box>
               <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    
               </Box>
               <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600, width: '100%' }}
                    events={dummyEvents}
                    onRangeChange={handleChangeRange}
               />
          </Box>
     );
}
