
import { Box, Typography } from '@mui/material'
import image from '../assets/dasmo_img.jpg';
import { Link } from 'react-router-dom';

export default function NotReady() {
     return (
          <Box sx={{
               minHeight: '60vh',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'
          }}>
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <img src={image} alt="404 Not Found" style={{ width: 300, borderRadius: '50%' }} />
                    <Box sx={{ textAlign: 'center' }}>
                         <Typography variant='h2'>Not ready</Typography>
                         <Typography variant='body1'>The page is not ready yet. Stay soon.</Typography>
                         <Typography variant='body2'>
                         </Typography>
                    </Box>
               </Box>
          </Box>
     )
}
