import React from 'react';
import { FaRegHeart, FaRegComment, FaHeart, FaEllipsisH } from "react-icons/fa"
import pluralize from '../../functions/pluralize';
import { Link } from 'react-router-dom'

const PostOnFeed: React.FC = () => {
const post = {
    liked: true,
    id: 1,
    user: {
        photoUrl: "square.jpeg",
        name: "chris45"
    },
    photoUrl: "square.jpeg",
    likes: 3,
    commentCount: 2,
}

    return (
        <article className='postOnFeed flexVertCenter'>
            <div className='postHeader'>
                <div>
                    <img className="smallProfilePic" src={post.user.photoUrl}></img>
                    <h4>{post.user.name}</h4>
                </div>
                <FaEllipsisH></FaEllipsisH>
            </div>
            <img className="postImg" src={post.photoUrl} alt=''></img>
            <div className='postOptions'>
                {post.liked ? <FaHeart className='likedHeart'></FaHeart> : <FaRegHeart></FaRegHeart>}
                <Link to={`posts/${post.id}/comments`}><FaRegComment></FaRegComment></Link>
            </div>
            <Link to={`posts/${post.id}/likes`}  className='postLikes'><FaHeart></FaHeart>&nbsp;{pluralize(post.likes, "like")}</Link>
            { post.commentCount > 1 && <Link to={`posts/${post.id}/comments`} className='postComments'>View all {pluralize(post.commentCount, "comment")}</Link>}
        </article>
    );
}

export default PostOnFeed;