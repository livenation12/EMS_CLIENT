import { useRef, useState } from 'react';
import {
     Box,
     FormControl,
     FormHelperText,
     IconButton,
     Typography,
} from '@mui/material';
import { ClearAll } from '@mui/icons-material';
import { overlay } from '../utils/styles';

export default function InputFile({ ...props }) {
     const fileInputRef = useRef(null);
     const [preview, setPreview] = useState(null);
     const [error, setError] = useState('');
     const [helperText, setHelperText] = useState('');
     const [loading, setLoading] = useState(false);
     const handleImageClick = () => {
          fileInputRef.current?.click();
     };

     const handleFileChange = (e) => {
          const file = e.target.files[0];

          if (file) {
               const fileCount = e.target.files.length;

               if (fileCount > 1) {
                    setHelperText(`${fileCount} images`)
               }
               if (!file.type.startsWith('image/')) {
                    setError('Please select an image file');
                    return;
               }
               setError('');
               const reader = new FileReader();
               reader.onloadstart = () => setLoading(true);
               reader.onloadend = () => setLoading(false);
               reader.onload = () => setPreview(reader.result);
               reader.readAsDataURL(file);
          }
          props.onChange?.(e);
     };

     const handleClear = (event) => {
          event.stopPropagation();
          setPreview(null);
          setError('');
     }

     return (
          <FormControl fullWidth error={!!error}>
               <Box
                    onClick={handleImageClick}
                    sx={{
                         position: 'relative',
                         border: '1px solid',
                         borderColor: error ? 'error.main' : 'grey.400',
                         borderRadius: 1,
                         cursor: 'pointer',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         minHeight: 120,
                         backgroundColor: '#fafafa',
                         '&:hover': {
                              borderColor: 'primary.main',
                         },
                    }}
               >
                    {preview ? (
                         <Box sx={{ position: 'relative' }}>
                              <Box
                                   component="img"
                                   src={preview}
                                   alt="Selected"
                                   sx={{
                                        maxHeight: 100,
                                        objectFit: 'contain',
                                        display: 'block',
                                   }}
                              />
                              <Typography
                                   sx={overlay}
                                   variant="body2"
                              >
                                   {helperText}
                              </Typography>
                         </Box>

                    ) : (
                         <Typography variant="body2" color="text.secondary">
                              {loading ? "Uploading..." : "Click to upload an image"}
                         </Typography>
                    )}
                    {preview && <IconButton
                         sx={{ position: 'absolute', top: 3, right: 3, zIndex: 2 }}
                         onClick={handleClear}
                    >
                         <ClearAll />
                    </IconButton>}
               </Box>

               <input
                    multiple
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    {...props}
               />

               {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
     );
}
