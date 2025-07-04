import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { CircularProgress, Box, Backdrop } from '@mui/material';
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { verifyToken } from '../api/auth';
export default function ProtectedRoutes() {
  const { state, dispatch } = useAuth();
  const { trigger } = useFetch(verifyToken, {
    onError: () => {
      dispatch({ type: 'LOGOUT' });
    },
    onSuccess: (res) => {
      dispatch({ type: 'LOGIN', payload: res.data });
    },
  });
  useEffect(() => {
    dispatch({ type: 'BEGIN_LOADING' });
    trigger()
  }, [])
  if (state.loading || !state.authChecked) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return state.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
