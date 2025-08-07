import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import PageNav from '../components/PageNav'

export default function GalleryLayout() {
     return (
          <Box>
               {/* <PageNav links={[]} /> */}
               <Outlet />
          </Box>
     )
}
