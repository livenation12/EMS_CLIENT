import { ScheduleContextProvider } from "../contexts/ScheduleContext";
import ScheduleLayout from "../layouts/ScheduleLayout";
import ScheduleCalendar from "../pages/schedules/ScheduleCalendar";
import ScheduleManage from "../pages/schedules/ScheduleManage";

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
                         element: <ScheduleManage />
                    }
               ]
          }
     ]
}



export default scheduleRoutes;