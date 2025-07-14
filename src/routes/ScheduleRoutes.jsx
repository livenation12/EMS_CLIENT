import { ScheduleContextProvider } from "../contexts/ScheduleContext";
import ScheduleLayout from "../layouts/ScheduleLayout";
import ScheduleCalendar from "../pages/schedules/ScheduleCalendar";
import NotReady from "../pages/NotReady";

const scheduleRoutes = {
     path: 'schedules',
     element: <ScheduleContextProvider />,
     children: [
          {
               element: <ScheduleLayout />,
               children: [
                    {
                         index: true,
                         element: <ScheduleCalendar />
                    },
                    {
                         path: 'calendar',
                         element: <ScheduleCalendar />
                    },
                    {
                         path: 'manage',
                         element: <NotReady />
                    }
               ]
          }
     ]
}



export default scheduleRoutes;