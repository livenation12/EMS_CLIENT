import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/AppRoutes'
import { AuthProvider } from './hooks/useAuth'
import { SnackbarProvider } from './contexts/SnackbarContext'
window.global = window;

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <SnackbarProvider>
            <RouterProvider router={router} />
        </SnackbarProvider>
    </AuthProvider>
)
