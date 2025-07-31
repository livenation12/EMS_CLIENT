import { createContext, useContext, useReducer } from 'react'

const initialState = {
     isAuthenticated: false,
     user: null,
     loading: true, // loading during token verification
     authChecked: false, // <- NEW
};

const reducer = (state, action) => {
     switch (action.type) {
          case 'LOGIN':
               return {
                    ...state,
                    isAuthenticated: true,
                    user: action.payload,
                    loading: false,
                    authChecked: true,
               };
          case 'LOGOUT':
               return {
                    ...state,
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                    authChecked: true,
               };
          case 'BEGIN_LOADING':
               return {
                    ...state,
                    loading: true,
               };
          default:
               return state;
     }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
     const [state, dispatch] = useReducer(reducer, initialState);
     return (
          <AuthContext.Provider value={{ state, dispatch }}>
               {children}
          </AuthContext.Provider>
     );
}
export function useAuth() {
     return useContext(AuthContext);
}