import { createContext, useContext, useReducer } from "react";
import { Outlet } from "react-router-dom";

export const EmployeeContext = createContext();

const employeeReducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH':
      return {
        ...state,
        refresh: !state.refresh
      };
    default:
      return state;
  }
}

const initialState = {
  refresh: false,
}

export const EmployeeContextProvider = () => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);
  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      <Outlet />
    </EmployeeContext.Provider>
  );
}

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployeeContext must be used within an EmployeeContextProvider");
  }
  return context;
}