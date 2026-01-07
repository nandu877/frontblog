import React, { useEffect, useState } from 'react'
import { connectToAPI } from '../../Pages/apihandler';
import { LoaderIcon } from 'react-hot-toast';
import Loading from '../Loading';

function BlogList(props) {

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    function timeAgo(dateString) {

        const past = new Date(dateString + "Z");
        const now = new Date();

        const seconds = Math.floor((now - past) / 1000);

        const intervals = [
            { label: "year", seconds: 31536000 },
            { label: "month", seconds: 2592000 },
            { label: "day", seconds: 86400 },
            { label: "hour", seconds: 3600 },
            { label: "minute", seconds: 60 }
        ];

        for (let i of intervals) {
            const count = Math.floor(seconds / i.seconds);
            if (count >= 1) {
                return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
            }
        }

        return "just now";
    }



    const fetchPostList = async () => {
        try {
            setIsLoading(true)
            const response = await connectToAPI("api/public/posts");
            console.log(response)
            if (response.status === 200) {
                const sortedPosts = [...response.data].sort(
                    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                );

                setPosts(sortedPosts);
            }

        } catch (error) {

        }
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }

    useEffect(() => {
        fetchPostList();
    }, [])


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
                                onClick={() => {
                                    setSelectedPost(post)
                                    props.setSelectedId(post?.id)
                                }}
                            >
                                <p className="post-title">{post?.title}</p>
                                <span className="post-time">
                                    {timeAgo(post?.updatedAt)}
                                </span>

                            </div>
                        ))
                    ) : (
                        <p className="no-posts">No Posts</p>
                    )}
                </div>
            </div>
            {
                isLoading && <Loading />
            }
        </>
    )
}

export default BlogList