import React from 'react';
import { FaRegHeart, FaRegComment, FaHeart, FaEllipsisH } from "react-icons/fa"
import pluralize from '../../functions/pluralize';
import { Link } from 'react-router-dom'
import { PostProp } from '../../models/PostProp';
import timeAgo from "../../functions/timeAgo"
import getUserObject from '../../functions/user/getUserObject';
import fetchData from '../../functions/fetch/fetchData';

interface Props {
    post: PostProp;
}
const PostOnFeed: React.FC<Props> = (props) => {
    const user = getUserObject()
    const { post } = props
    console.log(post)

    const handleLikeSubmit = (e: React.FormEvent<SVGElement>) => {
        e.preventDefault()
            fetchData(`posts/${post.id}/likes`, "POST", undefined, (user.jwt ? user.jwt : undefined))
                .then(data => {
                    console.log(data)
                })
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
                {post.current_user_liked ? <FaHeart className='likedHeart'></FaHeart> : <FaRegHeart onClick={handleLikeSubmit}></FaRegHeart>}
                <Link to={`posts/${post.id}/comments`}><FaRegComment></FaRegComment></Link>
            </div>
            <Link to={`posts/${post.id}/likes`} className='postLikes'><FaHeart></FaHeart>&nbsp;{pluralize(post.like_count, "like")}</Link>
            {post.caption && <p className='postCaption'><span>{post.username}</span>{post.caption}</p>}
            {post.comment_count > 0 && <Link to={`posts/${post.id}/comments`} className='postComments'>View all {pluralize(post.comment_count, "comment")}</Link>}
            <time>{timeAgo(post.created_at)}</time>
        </article>
    );
}

export default PostOnFeed;