import { Box, Typography } from '@mui/material'
import image from '../assets/dasmo_img.jpg';
import { Link } from 'react-router-dom';
export default function NotFound() {
     return (
          <Box sx={{
               minHeight: '100vh',
               maxWidth: '100vw',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'
          }}>
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <img src={image} alt="404 Not Found" style={{ width: 300, borderRadius: '50%' }} />
                    <Box sx={{ textAlign: 'center' }}>
                         <Typography variant='h1' sx={{ display: 'block' }}>404</Typography>
                         <Typography variant='h2'>Not found</Typography>
                         <Typography variant='body1'>The page you are looking for does not exist.</Typography>
                         <Typography variant='body2'>
                              <Link to={'/'}>Back to main page</Link>
                         </Typography>
                    </Box>
               </Box>
          </Box>
     )
}
