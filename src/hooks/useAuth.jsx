import { createContext, useContext, useReducer } from 'react'

const initialState = {
     user: null,
     isAuthenticated: false,
     loading: false
};

const reducer = (state, action) => {
     switch (action.type) {
          case 'LOGIN':
               return {
                    ...state,
                    user: action.payload,
                    isAuthenticated: true,
                    loading: false
               };
          case 'LOGOUT':
               return {
                    ...initialState
               };
          case 'BEGIN_LOADING':
               return {
                    ...state,
                    loading: true
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
export default function useAuth() {
     return useContext(AuthContext);
}