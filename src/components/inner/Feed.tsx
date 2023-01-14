import React, { useEffect, useState } from 'react';
import PostOnFeed from './PostOnFeed';
import getUserObject from '../../functions/user/getUserObject';
import fetchData from '../../functions/fetch/fetchData';
import { PostProp } from '../../models/PostProp';

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<PostProp[]>([
        {
            id: 0,
            user_id: 0,
            profile_picture: "",
            username: "",
            picture_url: "",
            like_count: 0,
            comment_count: 0,
            created_at: "",
            caption: ""
        }
    ])

    useEffect(() => {
        const userObject = getUserObject()
        fetchData("posts", "GET", undefined, (userObject ? userObject.jwt : undefined))
        // below is to test with out of date jwt
        // fetchData("posts", "GET", undefined, 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imd1ZXN0IiwidXNlcl9pZCI6NiwiZXhwIjoxNjczNTQ0OTcyfQ.QSDoDI2RORSvNnHZ7XP8cV4oQkv1NywgF_8O0i7pxng')
        
        .then(posts => {
            setPosts(posts)
        })
    }, [])

    return (
        <div id="feed" className='flexVertCenter'>
            {posts.map(post => {
                return <PostOnFeed key={post.id} post={post} />
            })}
        </div>
    );
}

export default Feed;