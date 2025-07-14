import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { readSchuduleList } from '../../api/schedule';
import { useSchedule } from '../../contexts/ScheduleContext';
import ScheduleInfoDialog from './calendar/ScheduleInfoDialog';
import ScheduleFormDialog from './calendar/ScheduleFormDialog';
const localizer = momentLocalizer(moment);

const now = new Date();
export default function ScheduleCalendar() {
     const { state } = useSchedule();
     const [range, setRange] = useState({
          startDate: new Date(now.getFullYear(), now.getMonth(), 1),
          endDate: new Date(now.getFullYear(), now.getMonth() + 1, 0)
     });
     const [openDialog, setOpenDialog] = useState(false);
     const [selectedSchedule, setSelectedSchedule] = useState({});
     const { trigger, data } = useFetch(readSchuduleList);

     const handleChangeRange = ({ start, end }) => {
          // console.log("start: " + start, "end: " + end);
          if (start === undefined || end === undefined) return
          setRange({ startDate: start, endDate: end });
     };

     const handleSelectEvent = (event) => {
          setSelectedSchedule(event);
          setOpenDialog(true);
     }

     useEffect(() => {
          trigger(range);
     }, [range, state.calendar.refresh]);

     return (
          <Box>
               <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <ScheduleFormDialog />
               </Box>
               <Calendar
                    localizer={localizer}
                    startAccessor={
                         (event) => new Date(event.startDate)
                    }
                    endAccessor={
                         (event) => new Date(event.endDate)
                    }
                    style={{ height: 600, width: '100%' }}
                    events={data || []}
                    onRangeChange={handleChangeRange}
                    onSelectEvent={handleSelectEvent}
               />
               <ScheduleInfoDialog
                    schedule={selectedSchedule}
                    openDialog={openDialog}
                    onClose={() => setOpenDialog(false)}
               />
          </Box>
     );
}
