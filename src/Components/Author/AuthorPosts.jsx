import React, { useState } from 'react'
import AuthorPostsList from './AuthorPostsList'
import AuthorPostDetails from './AuthorPostDetails'

function AuthorPosts() {
  const[selectedId,setSelectedId]=useState(null)
  return (
    <>
     <div className="author-posts">
        <div className="author-posts-left">
          <AuthorPostsList setSelectedId={setSelectedId}/>
        </div>
        <div className="author-posts-right">
            <AuthorPostDetails selectedId={selectedId}/>
        </div>
    </div>
    </>
  )
}

export default AuthorPosts