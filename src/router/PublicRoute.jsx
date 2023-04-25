import React, { useMemo } from 'react'
import { useAuthStore } from '../hooks';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({children}) => {
    
  const { status, checkAuthToken } = useAuthStore();
  const isNotAuthenticated = useMemo(() => status === 'not-authenticated', [status])
  
  return (isNotAuthenticated)
    ? children
    : <Navigate to="/" />
}
