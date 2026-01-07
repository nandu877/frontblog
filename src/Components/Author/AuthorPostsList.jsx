import { useEffect, useState } from "react";
import { connectToAPI } from "../../Pages/apihandler";
import Loading from "../Loading";
import toast from "react-hot-toast";


function AuthorPostsList(props) {
  const filters = ["PENDING", "APPROVED", "REJECTED"];
  const [activeFilter, setActiveFilter] = useState("PENDING");
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading,setIsLoading]=useState(false)

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const filteredPosts = posts.filter((post) =>
    activeFilter === "All" ? post.status !== "PENDING" : post.status === activeFilter
  );

  const fetchUserPosts = async () => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;
      const response = await connectToAPI(`api/posts/my-posts/${userId}`);
      if (response?.data) setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setTimeout(()=>{
      setIsLoading(false)
    },500)
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

 


  const handleAddPost = async () => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;
      console.log(newPost)
      const response = await connectToAPI(`api/posts/add`, "POST", {
        ...newPost,
        userId,
      });
      if (response.status === 200) {
        setShowAddPopup(false)
        setNewPost({ title: "", content: "" })
        fetchUserPosts();
        toast.success("Post Added Success...!")

      }
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("Post Add Failed...!")

    }
  };

  return (
    <>
      <div className="post-list-con">
        <div className="post-options">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active-btn" : ""}
              onClick={() => {
                setActiveFilter(filter);
                setSelectedPost(null);
              }}
            >
              {filter}
            </button>
          ))}
          <button onClick={() => setShowAddPopup(true)} className="addbutton">ADD POST</button>
        </div>

        <div className="post-list">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`post-con ${selectedPost?.id === post.id ? "active-post" : ""}`}
                onClick={() => {
                  setSelectedPost(post)
                  props.setSelectedId(post?.id)
                }}
              >
                <p className="post-title">{post.title}</p>
                <span className={`post-status ${post.status.toLowerCase()}`}>
                  {post.status}
                </span>
              </div>
            ))
          ) : (
            <p className="no-posts">No Posts</p>
          )}
        </div>
      </div>

     
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Add New Post</h3>

            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={newPost.title}
              onChange={handleInputChange}
              className="popup-input"
            />

            <textarea
              name="content"
              placeholder="Post Content"
              onChange={(e) =>
                setNewPost({
                  ...newPost,
                  content: e.target.value
                })}
              className="popup-textarea"
            />

            <div className="popup-actions">
              <button
                className="btn cancel"
                onClick={() => {
                  setShowAddPopup(false)
                  setNewPost({ title: "", content: "" })
                }}
              >
                Cancel
              </button>

              <button
                className="btn confirm"
                onClick={handleAddPost}
              >
                Post
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

export default AuthorPostsList;
