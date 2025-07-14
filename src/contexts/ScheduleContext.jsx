import { createContext, useContext, useReducer } from "react";
import { Outlet } from "react-router-dom";

const initialState = {
     calendar: {
          refresh: false,
     }
}
const scheduleReducer = (state, action) => {
     switch (action.type) {
          case "REFRESH_CALENDAR":
               return {
                    ...state,
                    calendar: {
                         ...state.calendar,
                         refresh: !state.calendar.refresh
                    },
               };
          default:
               return state;
     }
};

export const ScheduleContext = createContext();

export const ScheduleContextProvider = () => {
     const [state, dispatch] = useReducer(scheduleReducer, initialState);
     return (
          <ScheduleContext.Provider value={{ state, dispatch }}>
               <Outlet />
          </ScheduleContext.Provider>
     );
}

export const useSchedule = () => useContext(ScheduleContext);