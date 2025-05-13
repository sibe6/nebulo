import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
import React from 'react';
import type { ReactElement } from 'react';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;