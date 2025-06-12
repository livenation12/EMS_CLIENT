import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/AppRoutes'
import { AuthProvider } from './hooks/useAuth'


createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
)
