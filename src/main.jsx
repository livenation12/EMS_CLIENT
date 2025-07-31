import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { SnackbarProvider } from './contexts/SnackbarContext'
import { createTheme, ThemeProvider } from '@mui/material'
window.global = window;

const theme = createTheme({
    palette: {
        background: {
            default: '#f2f2f2f2',
            paper: '#ffffff',
            gray: {
                main: '#f2f2f2',
                light: '#f5f5f5',
                dark: '#e0e0e0'
            }
        }
    }
})

createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <AuthProvider>
            <SnackbarProvider>
                <RouterProvider router={router} />
            </SnackbarProvider>
        </AuthProvider>
    </ThemeProvider>
)
