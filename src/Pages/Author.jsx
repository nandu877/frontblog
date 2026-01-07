import React from 'react'
import AuthorNav from '../Components/Author/AuthorNav'
import { Outlet } from 'react-router-dom'

function Author() {
  return (
    <>
     <div className="author-con">
        <AuthorNav/>
        <div className="author-content">
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default Author