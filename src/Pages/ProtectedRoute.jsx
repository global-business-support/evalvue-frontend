// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../Contextfile';
import Dashboard from './Dashboard/Dashboard';

const ProtectedRoute = () => {
  const { userId } = useContext(UserContext);

  return userId ? <Dashboard/> : <Navigate to="/login" />;
};

export default ProtectedRoute;
