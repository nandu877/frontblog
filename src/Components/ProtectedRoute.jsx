import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({isLogin,role,allowdRole}) {
  if(!isLogin) return <Navigate to={"/login"} replace/>
    if(role !== allowdRole) return <Navigate to={role == "ADMIN" ? "/admin" : "/author"}/>
  return <Outlet/>
}

export default ProtectedRoute