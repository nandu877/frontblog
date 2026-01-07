import React, { useEffect, useState } from "react";
import { connectToAPI } from "../../Pages/apihandler";
import Loading from "../Loading";

function AdminPostDetails({ selectedId }) {
  const [post, setPost] = useState(null);
  const[isLoading,setIsLoading]=useState(false)

  const [tempStatus, setTempStatus] = useState(null);
  const [showStatusPopup, setShowStatusPopup] = useState(false);


  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const fetchPost = async () => {
    try {
        setIsLoading(true)
      if (!selectedId) return;

      const response = await connectToAPI(
        `/api/posts/my-post/${selectedId}`
      );

      if (response.status === 200) {
        setPost(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    setTimeout(()=>{
        setIsLoading(false)
    },100)
  };

  useEffect(() => {
    fetchPost();
  }, [selectedId]);

 
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus === post?.status) return;

    setTempStatus(newStatus);
    setShowStatusPopup(true);
  };

  const confirmStatusChange = async () => {
    try {
      setIsLoading(true)
      const response = await connectToAPI(`api/posts/update-status/${post.id}/status?status=${tempStatus}`,"PUT");
      if(response.status === 200){
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };


  const confirmDelete = async () => {
    try {
        setIsLoading(true)
     const response = await connectToAPI(`api/posts/delete/${post.id}`, "DELETE");
      if(response.status === 200){
        window.location.reload()
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedId || !post) {
    return (
      <div className="noSelectedId">
        <h3>Please select a post to view details</h3>
      </div>
    );
  }

  return (
    <>
      <section className="author-post-details-con">
        <header className="post-header">
  <div className="post-meta-header">
    <div className="author-info">
      <div className="author-avatar">
        {post.authorName?.charAt(0).toUpperCase()}
      </div>
      <span className="author-name">{post.authorName}</span>
    </div>

    <span className="post-date">
      {new Date(post.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}
    </span>
  </div>
   <h1 className="post-title2">{post.title}</h1>
</header>


        <article className="post-content">
          <p>{post.content}</p>
        </article>

        <footer className="post-footer">
         {
            post?.status === "PENDING" ?(
                 <>
                 <div>
                    <span>Status:</span>
                 <select
            value={post.status}
            onChange={handleStatusChange}
            className={`status-select ${post.status}`}
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
                 </div>
                 </>
            )
            :
            (
                <>
                 <span>Status: <span className={`post-status ${post.status.toLowerCase()}`}>
                                    {post.status}
                 </span></span>
                </>
            )
         }

          <button
            className="delete-btn"
            onClick={() => setShowDeletePopup(true)}
          >
            Delete Post
          </button>
        </footer>
      </section>

     
      {showStatusPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Status Change</h3>
            <p>
              Change status to <b>{tempStatus}</b>?
            </p>

            <div className="modal-actions">
              <button
                className="btn cancel"
                onClick={() => setShowStatusPopup(false)}
              >
                Cancel
              </button>
              <button className="btn confirm" onClick={confirmStatusChange}>
                Yes, Change
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className="modal-overlay">
          <div className="modal danger">
            <h3>Delete Post</h3>
            <p>
              Are you sure you want to permanently delete this post?
            </p>

            <div className="modal-actions">
              <button
                className="btn cancel"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button className="btn confirm" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
       {
                isLoading && <Loading/>
            }
    </>
  );
}

export default AdminPostDetails;
