import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../AuthContext'

function AdminNav() {
    const{logout}= useContext(AuthContext)
    return (
        <>
           <div className="admin-nav">
                <div className="admin-nav-links">
                    <div className="nav-flex">
                        <h3>Admin <span>Dashboard</span></h3>
                    <NavLink to="/admin/posts" className="nav-link">
                        Posts
                    </NavLink>
                    <NavLink to="/admin/users" className="nav-link">
                        Users
                    </NavLink>
                    <NavLink to="/admin/profile" className="nav-link">
                        Profile
                    </NavLink>
                    <NavLink to="/" className="nav-link">
                        Home
                    </NavLink>
                    </div>
                    <p className="logout" onClick={logout}><i class="fa-solid fa-power-off"></i></p>
                </div>
            </div>
            
        </>
    )
}

export default AdminNav