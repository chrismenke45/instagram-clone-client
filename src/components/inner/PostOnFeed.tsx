import React from 'react';
import { FaRegHeart, FaRegComment, FaHeart, FaEllipsisH } from "react-icons/fa"
import pluralize from '../../functions/pluralize';
import { Link } from 'react-router-dom'
import { PostProp } from '../../models/PostProp';

const PostOnFeed: React.FC = () => {
    const post: PostProp = {
        id: 1,
        user_id: 1,
        profile_picture: "square.jpeg",
        username: "chris45",
        picture_url: "square.jpeg",
        like_count: 3,
        comment_count: 2,
        created_at: "2023-01-13T04:01:53.174Z"
    }

    return (
        <article className='postOnFeed flexVertCenter'>
            <div className='postHeader'>
                <div>
                    <img className="smallProfilePic" src={post.profile_picture}></img>
                    <Link to={`/profile/${post.user_id}`}><h4>{post.username}</h4></Link>
                </div>
                <FaEllipsisH></FaEllipsisH>
            </div>
            <img className="postImg" src={post.picture_url} alt=''></img>
            <div className='postOptions'>
                {false ? <FaHeart className='likedHeart'></FaHeart> : <FaRegHeart></FaRegHeart>}
                <Link to={`posts/${post.id}/comments`}><FaRegComment></FaRegComment></Link>
            </div>
            <Link to={`posts/${post.id}/likes`} className='postLikes'><FaHeart></FaHeart>&nbsp;{pluralize(post.like_count, "like")}</Link>
            {post.comment_count > 1 && <Link to={`posts/${post.id}/comments`} className='postComments'>View all {pluralize(post.comment_count, "comment")}</Link>}
        </article>
    );
}

export default PostOnFeed;