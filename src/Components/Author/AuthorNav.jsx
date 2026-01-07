import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../AuthContext'

function AuthorNav() {
    const { logout } = useContext(AuthContext);
    return (
        <>
            <div className="author-nav">
                <div className="author-nav-links">
                    <div className='nav-flex'>
                        <h3>Author <span>Dashboard</span></h3>
                        <NavLink to="/author/posts" className="nav-link">
                            Posts
                        </NavLink>
                        <NavLink to="/author/profile" className="nav-link">
                            Profile
                        </NavLink>
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                    </div>
                    <p className='logout' onClick={logout}><i class="fa-solid fa-power-off"></i></p>
                </div>
            </div>
        </>
    )
}

export default AuthorNav