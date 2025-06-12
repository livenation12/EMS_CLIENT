import { Alert, Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { register } from '../../api/auth';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const defaultFormData = {
  email: '',
  password: '',
  confirmPassword: ''
}
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormData)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: '',
  });
  const { loading, error, trigger } = useFetch(register, {
    onSuccess: (res) => {
      setOpenSnackbar({ open: true, message: res.message || 'Registration successful!' });
      setFormData(defaultFormData);
      navigate('/login');
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    trigger(formData);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Typography sx={{ textAlign: 'center' }} variant="h5" gutterBottom>
          Register
        </Typography>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!(error?.data?.email)}
          helperText={error?.data?.email || ''}
        />

        <TextField
          label="Password"
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!(error?.data?.password)}
          helperText={error?.data?.password || ''}
        />
        <TextField
          label="Confirm Password"
          type={isPasswordVisible ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!(error?.data?.confirmPassword)}
          helperText={error?.data?.confirmPassword || ''}
        />
        {error?.data.passwordsMatch ? <Alert severity="error" sx={{ mt: 1 }}>{error.data.passwordsMatch}</Alert> : null}
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={isPasswordVisible} onChange={() => setIsPasswordVisible(!isPasswordVisible)} />}
            label="Show passwords"
          />
        </FormGroup>
        <Button
          loading={loading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  )
}
