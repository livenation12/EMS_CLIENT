import { ScheduleContextProvider } from "../contexts/ScheduleContext";
import ScheduleLayout from "../layouts/ScheduleLayout";
import ScheduleIndex from "../pages/schedules/ScheduleIndex";


const scheduleRoutes = {
     path: 'schedules',
     element: <ScheduleContextProvider />,
     children: [
          {
               element: <ScheduleLayout />,
               children: [
                    {
                         index: true,
                         element: <ScheduleIndex />
                    }
               ]
          }
     ]
}



export default scheduleRoutes;