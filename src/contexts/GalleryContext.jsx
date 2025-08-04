import { createContext, useContext, useReducer } from "react";
import { Outlet } from "react-router-dom";

const GalleryContext = createContext();

const reducer = (state, action) => {
     switch (action.type) {
          case "REFRESH_GALLERY":
               return {
                    ...state,
                    refresh: !state.refresh,
               };
          default:
               return state;
     }
};

const initialState = {
     refresh: false
};
export const GalleryContextProvider = ({ children }) => {
     const [state, dispatch] = useReducer(reducer, initialState);
     return (
          <GalleryContext.Provider value={{ state, dispatch }}>
               <Outlet />
          </GalleryContext.Provider>
     );
}

export const useGallery = () => {
     return useContext(GalleryContext);
}