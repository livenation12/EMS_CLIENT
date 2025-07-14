import { createContext, useContext, useReducer } from "react";
import { Outlet } from "react-router-dom";

const TaskContext = createContext();

const taskReducer = (state, action) => {
     switch (action.type) {
          case "REFRESH_KANBAN":
               return {
                    ...state,
                    kanban: {
                         ...state.kanban,
                         refresh: !state.kanban.refresh,
                    },
               };
          case "REFRESH_TASK_LOGS":
               return {
                    ...state,
                    logs: {
                         ...state.logs,
                         refresh: !state.logs.refresh
                    }
               }
          default:
               return state;
     }
}

const initialState = {
     kanban: {
          refresh: false
     },
     logs: {
          refresh: false
     }
}

export const TaskContextProvider = ({ children }) => {
     const [state, dispatch] = useReducer(taskReducer, initialState);
     return (
          <TaskContext.Provider value={{ state, dispatch }}>
               <Outlet />
          </TaskContext.Provider>
     );
};

export const useTaskContext = () => {
     return useContext(TaskContext);
};