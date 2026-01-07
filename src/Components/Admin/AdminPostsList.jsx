import React, { useEffect, useState } from 'react'
import { connectToAPI } from '../../Pages/apihandler';
import { LoaderIcon } from 'react-hot-toast';
import Loading from '../Loading';

function AdminPostsList(props) {
    const filters = ["PENDING", "All"];
    const [activeFilter, setActiveFilter] = useState("PENDING");
    const [selectedPost, setSelectedPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const[isLoading,setIsLoading]=useState(false)

    const fetchPostList=async()=>{
        try {
            setIsLoading(true)
            const response = await connectToAPI("api/posts/my-posts");
            console.log(response)
            if(response.status === 200) setPosts(response.data);
        } catch (error) {
            
        }
        setTimeout(()=>{
            setIsLoading(false);
        },500)
    }

    useEffect(()=>{
        fetchPostList();
    },[])

    const filteredPosts = posts.filter((post) =>
        activeFilter === "All" ? post.status !== "PENDING" : post.status === activeFilter
    );

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
                </div>
                <div className="post-list">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                className={`post-con ${selectedPost?.id === post.id ? "active-post" : ""
                                    }`}
                                onClick={() => {setSelectedPost(post)
                                    props.setSelectedId(post?.id)}}
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
            {
                isLoading && <Loading/>
            }
        </>
    )
}

export default AdminPostsList