import React from 'react'
import AdminNav from '../Components/Nav/AdminNav'
import { Outlet } from 'react-router-dom'

function Admin() {
  return (
    <>
    <div className="admin-con">
        <AdminNav/>
        <div className="admin-content">
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default Admin