import React, { useState } from 'react'
import AdminPostsList from './AdminPostsList'
import AdminPostDetails from './AdminPostDetails'

function AdminPosts() {
  const[selectedId,setSelectedId]=useState(null);
  return (
    <>
    <div className="admin-posts">
        <div className="admin-posts-left">
          <AdminPostsList setSelectedId={setSelectedId}/>
        </div>
        <div className="admin-posts-right">
          <AdminPostDetails selectedId={selectedId}/>
        </div>
    </div>
    </>
  )
}

export default AdminPosts