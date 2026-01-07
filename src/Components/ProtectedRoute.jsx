import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isLogin, role, allowdRole }) {
  if (isLogin === false) return <Navigate to="/login" replace />; 
  if (!role) return null; 
  if (role !== allowdRole) return <Navigate to={role === "ADMIN" ? "/admin" : "/author"} replace />;

  return <Outlet />;
}

export default ProtectedRoute;
