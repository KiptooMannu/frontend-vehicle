import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Authcontext'; // Adjust the import path as needed

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
