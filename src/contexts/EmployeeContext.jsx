import { createContext, useContext, useReducer } from "react";
import { Outlet } from "react-router-dom";

const initialState = {
  refresh: false,
  checkedEmployees: []
}
export const EmployeeContext = createContext();

const employeeReducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH':
      return {
        ...state,
        refresh: !state.refresh
      };
    case 'SET_CHECKED_EMPLOYEES':
      return {
        ...state,
        checkedEmployees: action.payload
      }
    case 'RESET_CHECKED_EMPLOYEES':
      return {
        ...state,
        checkedEmployees: []
      }
    case 'TOGGLE_CHECKED_EMPLOYEE': {
      const newSet = new Set(state.checkedEmployees);
      if (newSet.has(action.payload)) {
        newSet.delete(action.payload);
      } else {
        newSet.add(action.payload);
      }
      return {
        ...state,
        checkedEmployees: Array.from(newSet),
      };
    }
    default:
      return state;
  }
}

export const EmployeeContextProvider = () => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);
  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      <Outlet />
    </EmployeeContext.Provider>
  );
}

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployeeContext must be used within an EmployeeContextProvider");
  }
  return context;
}