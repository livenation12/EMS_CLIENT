import { createContext } from "react";
import { Outlet } from "react-router-dom";


export const ScheduleContext = createContext();

export const ScheduleContextProvider = () => {
     return (
          <ScheduleContext.Provider>
               <Outlet />
          </ScheduleContext.Provider>
     );
} 