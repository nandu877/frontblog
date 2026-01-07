import React, { useEffect, useState } from 'react'
import { connectToAPI } from '../../Pages/apihandler';
import { LoaderIcon } from 'react-hot-toast';
import Loading from '../Loading';

function BlogList(props) {
   
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const[isLoading,setIsLoading]=useState(false)

    const fetchPostList=async()=>{
        try {
            setIsLoading(true)
            const response = await connectToAPI("api/posts/my-posts");
            console.log(response)
            if(response.status === 200) {
             let posts=response.data;
             let approvedPosts = posts.filter((post)=>post.status === "APPROVED")   
             setPosts(approvedPosts);
            }
                
        } catch (error) {
            
        }
        setTimeout(()=>{
            setIsLoading(false);
        },500)
    }

    useEffect(()=>{
        fetchPostList();
    },[])

   
    return (
        <>
            <div className="post-list-con">
                
                <div className="post-list listpad">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div
                                key={post.id}
                                className={`post-con ${selectedPost?.id === post.id ? "active-post" : ""
                                    }`}
                                onClick={() => {setSelectedPost(post)
                                    props.setSelectedId(post?.id)}}
                            >
                                <p className="post-title">{post.title}</p>
                                
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

export default BlogList