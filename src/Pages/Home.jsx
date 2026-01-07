import React, { useContext, useState } from 'react'
import { AuthContext } from '../Components/AuthContext'
import { NavLink } from 'react-router-dom';
import AuthorPostsList from '../Components/Author/AuthorPostsList';
import BlogList from '../Components/PublicComp/BlogList';
import BlogDetails from '../Components/PublicComp/BlogDetails';

function Home() {
    const{isLogin,role}=useContext(AuthContext);
    const[selectedId,setSelectedId]=useState(null);
    return (
        <>
            <div className="homecon">
                <div className="homenav">
                    <h1>Blog <span>Box</span></h1>
                    {
                        !isLogin ? (
                            <>
                               <div>
                                <NavLink to={"/login"}>Login</NavLink>
                                <NavLink to={"/signup"}>Signup</NavLink>
                               </div>
                            </>
                        ) : (
                            <NavLink to={role === "ADMIN" ? "/admin" : "/author"}>Dashboard</NavLink>
                        )
                    }
                </div>
                <div className="main">
                    
                    <div className="public-posts">
                        <div className="public-posts-left">
                            <BlogList setSelectedId={setSelectedId}/>
                        </div>
                        <div className="public-posts-right">
                            <BlogDetails selectedId={selectedId}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home