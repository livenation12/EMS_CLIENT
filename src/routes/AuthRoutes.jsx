import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { CircularProgress, Backdrop } from '@mui/material';
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { verifyToken } from '../api/auth';

export default function AuthRoutes() {
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
  if (state.loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (state.isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;

}
