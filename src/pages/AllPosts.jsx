import React, { useEffect } from 'react'
import { getAllPosts } from '../api/postApi.js'
import { PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(()=>{
        const fetchPosts = async()=>{
            try {
                const response = await getAllPosts();
                setPosts(response.data.message);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    },[])

    return !loading? (
        <div className="">
            <div className="p-4 sm:p-6 lg:p-8 space-y-4">
                {posts.length === 0 ? (
                    <p className="text-gray-500 text-center">No posts available.</p>
                ) : (
                    posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))
                )}
            </div>
        </div>
    ):(
        <p>Loading...</p>
    )
}

export default AllPosts
