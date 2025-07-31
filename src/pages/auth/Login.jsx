import { Alert, Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { login } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
export default function Login() {
  const navigate = useNavigate()
  const { state, dispatch } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { loading, error, trigger } = useFetch(login, {
    onSuccess: (res) => {
      dispatch({ type: 'LOGIN', payload: res.data });
      navigate("/");
    }
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    trigger(formData);
  }
  return (
    <Box sx={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
    }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography sx={{ textAlign: 'center' }} variant="h5" gutterBottom>
          Login
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
        />
        {error ? <Alert severity="error" sx={{ mt: 1 }}>{error.message}</Alert> : null}
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={isPasswordVisible} onChange={() => setIsPasswordVisible(!isPasswordVisible)} />} label="Show password" />
        </FormGroup>
        <Button
          loading={loading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Log In
        </Button>
      </Box>
    </Box>
  )
}
