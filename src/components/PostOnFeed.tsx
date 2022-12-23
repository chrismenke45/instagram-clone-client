import React from 'react';
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa"

const PostOnFeed: React.FC = () => {
const post = {
    user: {
        photoUrl: "square.jpeg",
        name: "chris45"
    },
    photoUrl: "square.jpeg",
    likes: []
}

    return (
        <article className='postOnFeed flexVertCenter'>
            <div className='postHeader'>
                <div>
                    <img src={post.user.photoUrl}></img>
                    <h4>{post.user.name}</h4>
                </div>
                <p>...</p>
            </div>
            <img className="postImg" src={post.photoUrl} alt=''></img>
            <div className='postOptions'>
                <FaRegHeart></FaRegHeart>
                <FaRegComment></FaRegComment>
            </div>
            <span className='postLikes'><FaHeart></FaHeart>&nbsp;{post.likes.length} likes</span>
        </article>
    );
}

export default PostOnFeed;