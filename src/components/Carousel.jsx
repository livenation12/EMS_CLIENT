import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Box, IconButton, Slide, Typography } from '@mui/material';
import { useState } from 'react'
import { renderUpload } from '../utils/string-formats';

export default function Carousel({ items = [], url = 'url', label = 'label' }) {
     const [index, setIndex] = useState(0);
     const [direction, setDirection] = useState('left');
     const prevSlide = () => {
          setDirection('right');
          setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
     };

     const nextSlide = () => {
          setDirection('left');
          setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
     };

     
     return (
          <Box sx={{ position: 'relative', maxWidth: 800, margin: 'auto', overflow: 'hidden' }}>
               {items.map((img, i) => (
                    <Slide key={i} in={i === index}  timeout={500} appear={false} direction={direction}>
                         <Box
                              component="img"
                              src={renderUpload(img[url])}
                              alt={img[label]}
                              sx={{
                                   width: '100%',
                                   height: 400,
                                   objectFit: 'cover',
                                   display: i === index ? 'block' : 'none',
                                   borderRadius: 2,
                              }}
                         />
                    </Slide>
               ))}

               {/* Navigation Arrows */}
               <IconButton
                    onClick={prevSlide}
                    sx={{
                         position: 'absolute',
                         top: '50%',
                         left: 16,
                         transform: 'translateY(-50%)',
                         bgcolor: 'rgba(0,0,0,0.4)',
                         color: 'white',
                         '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
                    }}
               >
                    <ArrowBackIosNew />
               </IconButton>
               <IconButton
                    onClick={nextSlide}
                    sx={{
                         position: 'absolute',
                         top: '50%',
                         right: 16,
                         transform: 'translateY(-50%)',
                         bgcolor: 'rgba(0,0,0,0.4)',
                         color: 'white',
                         '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
                    }}
               >
                    <ArrowForwardIos />
               </IconButton>
               <Typography variant='caption' component={'p'} sx={{float: 'right', mt: 1, mr: 1}}>
                    {index + 1} / {items.length}
               </Typography>
               {/* Optional: Caption
               <Typography
                    variant="subtitle1"
                    sx={{
                         position: 'absolute',
                         bottom: 16,
                         left: 16,
                         color: 'white',
                         backgroundColor: 'rgba(0, 0, 0, 0.5)',
                         px: 2,
                         py: 1,
                         borderRadius: 1,
                    }}
               >
                    {items[index].label}
               </Typography> */}
          </Box>
     )
}
