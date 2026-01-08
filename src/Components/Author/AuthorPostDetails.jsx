import React, { useEffect, useState } from "react";
import { connectToAPI } from "../../Pages/apihandler";
import Loading from "../Loading";
import toast from "react-hot-toast";

function AuthorPostDetails({ selectedId }) {
    const [showPopup, setShowPopup] = useState(false);
    const [post, setPost] = useState({});
    const [formData, setFormData] = useState({
        title: post?.title || "",
        content: post?.content || ""
    });
    const [isLoading, setIsLoading] = useState(false)
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const openUpdatePopup = () => {
        setFormData({
            title: post.title,
            content: post.content
        });
        setShowPopup(true);
    };

    const handleUpdatePost = async () => {
        try {
            setIsLoading(true);
            const payload = {
                title: formData.title,
                content: formData.content
            };

            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user?.id;
            const response = await connectToAPI(`api/posts/update/${post?.id}/${userId}`, "PUT", {
                ...payload
            });

            if (response.status === 200) {
                window.location.reload()
                toast.success("Post Update Success...!")
            }
        } catch (error) {
            console.error("Error updating post:", error);
            toast.error("Post Update Failed...!")
        }
    };

    const fetchPost = async () => {
        try {
            setIsLoading(true);
            if (selectedId !== null) {
                const response = await connectToAPI(`/api/posts/my-post/${selectedId}`);
                if (response.status === 200) {
                    setPost(response?.data);
                }
            }
        } catch (error) {

        }
        setTimeout(()=>{
            setIsLoading(false)
        },200)
    }
    useEffect(() => {
        fetchPost();
    }, [selectedId])

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
            <>
                <div className="noSelectedId">
                    <h3>Please select a post to view details</h3>
                </div>
            </>
        )
    }

    return (
        <>
            <section className="author-post-details-con">
                <header className="post-header">
                    <h1 className="post-title2">{post?.title}</h1>
                </header>

                <article className="post-content">
                    <p>{post?.content}</p>
                </article>

                <footer className="post-footer">
                    <span>Status:  <span className={`post-status ${post?.status?.toLowerCase()}`}>
                        {post?.status}
                    </span></span>

                    <div className="post-footer-buttons">
                        <button className="update-btn" onClick={openUpdatePopup}>
                        Update Post
                    </button>
                    <button className="delete-btn" onClick={() => setShowDeletePopup(true)}>
                        Delete Post
                    </button>
                    </div>
                </footer>
            </section>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h3>Update Post</h3>

                        <input
                            type="text"
                            placeholder="Post Title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                        />

                        <textarea
                            className="popup-textarea"
                            placeholder="Post Content"
                            value={formData.content}
                            onChange={(e) =>
                                setFormData({ ...formData, content: e.target.value })
                            }
                        />

                        <div className="popup-actions">
                            <button
                                className="btn cancel"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn confirm"
                                onClick={handleUpdatePost}
                            >
                                Update
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
                isLoading && <Loading />
            }
        </>
    );
}

export default AuthorPostDetails;
