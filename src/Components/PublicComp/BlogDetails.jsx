import React, { useEffect, useState } from "react";
import { connectToAPI } from "../../Pages/apihandler";
import Loading from "../Loading";
import toast from "react-hot-toast";

function BlogDetails({ selectedId }) {

    const [post, setPost] = useState({});

    const [isLoading, setIsLoading] = useState(false)



    const fetchPost = async () => {
        try {
            setIsLoading(true);
            if (selectedId !== null) {
                const response = await connectToAPI(`/api/public/posts/${selectedId}`);
                if (response.status === 200) {
                    setPost(response?.data);
                }
            }
        } catch (error) {

        }
        setTimeout(() => {
            setIsLoading(false)
        }, 200)
    }
    useEffect(() => {
        fetchPost();
    }, [selectedId])

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
                    <p>{post?.content}</p>
                </article>


            </section>


            {
                isLoading && <Loading />
            }
        </>
    );
}

export default BlogDetails;
