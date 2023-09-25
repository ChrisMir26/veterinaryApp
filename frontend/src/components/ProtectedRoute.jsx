import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ element }) {
  const { user, loading } = useAuth();
  
  
  return user ? element : <Navigate to="/" />
}

export default ProtectedRoute;
