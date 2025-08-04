import { GalleryContextProvider } from "../contexts/GalleryContext";
import GalleryLayout from "../layouts/GalleryLayout";
import Gallery from "../pages/gallery/Gallery";

const galleryRoutes = {
     path: 'gallery',
     element: <GalleryContextProvider />,
     children: [
          {
               element: <GalleryLayout />,
               children: [
                    {
                         index: true,
                         element: <Gallery />,
                    },     
               ]
          }
     ]
}



export default galleryRoutes;