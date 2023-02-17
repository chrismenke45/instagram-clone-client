import React, { useContext} from 'react';
import { FaRegHeart, FaRegComment, FaHeart, FaEllipsisH } from "react-icons/fa"
import pluralize from '../../functions/pluralize';
import { Link } from 'react-router-dom'
import { PostProp } from '../../models/PostProp';
import timeAgo from "../../functions/timeAgo"
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';
import postsActions from '../../stateManagement/actions/postsActions';
import PostsContext from '../../stateManagement/contexts/PostsContext';

interface Props {
    post: PostProp;
}
const PostOnFeed: React.FC<Props> = (props) => {
    const user = getUserObject()
    const { post } = props
    const { postsDispatch } = useContext(PostsContext)
    let fetcher = new FetchAPI()

    const handleLikeSubmit = (e: React.FormEvent<SVGElement>) => {
        e.preventDefault()
        postsDispatch(postsActions.LIKE_POST(post.id))
        fetcher.fetchData(`posts/${post.id}/likes`, 'POST', user.jwt)
            .catch(err => {
                postsDispatch(postsActions.UNLIKE_POST(post.id))
                console.error(err)
            })
    }

    const handleUnlikeSubmit = (e: React.FormEvent<SVGElement>) => {
        e.preventDefault()
        postsDispatch(postsActions.UNLIKE_POST(post.id))
        fetcher.fetchData(`posts/${post.id}/likes`, 'DELETE', user.jwt)
            .catch(err => {
                postsDispatch(postsActions.LIKE_POST(post.id))
                console.error(err)
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
                {post.current_user_liked ? <FaHeart className='likedHeart' onClick={handleUnlikeSubmit}></FaHeart> : <FaRegHeart onClick={handleLikeSubmit}></FaRegHeart>}
                <Link to={`/posts/${post.id}/comments`}><FaRegComment></FaRegComment></Link>
            </div>
            <Link to={`/posts/${post.id}/likes`} className='postLikes'><FaHeart></FaHeart>&nbsp;{pluralize(post.like_count, "like")}</Link>
            {post.caption && <p className='postCaption'><span>{post.username}</span>{post.caption}</p>}
            {post.comment_count > 0 && <Link to={`/posts/${post.id}/comments`} className='postComments'>View all {pluralize(post.comment_count, "comment")}</Link>}
            <time>{timeAgo(post.created_at)}</time>
        </article>
    );
}

export default PostOnFeed;