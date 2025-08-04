import { createContext, useContext, useReducer } from "react";
import { Outlet } from "react-router-dom";

const initialState = {
     permission: {
          table: {
               refresh: false,
          },
          refresh: false,
     },
     role: {
          table: {
               refresh: false,
          },
          refresh: false,
     }
}
const manageReducer = (state, action) => {
     switch (action.type) {
          case "REFRESH_PERMISSION_TABLE":
               return {
                    ...state,
                    permission: {
                         ...state.permission,
                         table: {
                              ...state.permission.table,
                              refresh: !state.permission.refresh
                         }
                    },
               };
          case "REFRESH_ROLE_TABLE":
               return {
                    ...state,
                    role: {
                         ...state.role,
                         table: {
                              ...state.role.table,
                              refresh: !state.role.refresh
                         }
                    },
               };
          
          default:
               return state;
     }
};

export const ManageContext = createContext();

export const ManageContextProvider = () => {
     const [state, dispatch] = useReducer(manageReducer, initialState);
     return (
          <ManageContext.Provider value={{ state, dispatch }}>
               <Outlet />
          </ManageContext.Provider>
     );
}

export const useManage = () => useContext(ManageContext);