import React, { useMemo } from 'react'
import { useAuthStore } from '../hooks';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    
  const { status, checkAuthToken } = useAuthStore();
  const isAuthenticated = useMemo(() => status === 'authenticated', [status])
  
  return (isAuthenticated)
    ? children
    : <Navigate to="/auth/login" />
}
