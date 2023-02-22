import React, { useContext, useState } from 'react';
import { FaRegHeart, FaRegComment, FaHeart, FaEllipsisH } from "react-icons/fa"
import pluralize from '../../functions/pluralize';
import { Link } from 'react-router-dom'
import { PostProp } from '../../models/PostProp';
import timeAgo from "../../functions/timeAgo"
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';
import postsActions from '../../stateManagement/actions/postsActions';
import PostsContext from '../../stateManagement/contexts/PostsContext';
import deleteFile from '../../firebase/deleteFile';

interface Props {
    post: PostProp;
}
const PostOnFeed: React.FC<Props> = (props) => {
    const user = getUserObject()
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const { post } = props
    const { postsDispatch } = useContext(PostsContext)
    let fetcher = new FetchAPI()

    const handleLikeSubmit = (e: React.FormEvent<SVGElement>) => {
        e.preventDefault()
        postsDispatch(postsActions.LIKE_POST(post.id))
        fetcher.fetchData(`posts/${post.id}/likes`, 'POST', user.jwt)
            .catch(err => {
                postsDispatch(postsActions.UNLIKE_POST(post.id))
            })
    }
    const handleShowOptions = () => {
        setShowOptions(true)
    }
    const handleHideOptions = () => {
        setShowOptions(false)
    }
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const pictureUrl = post.picture_url
        fetcher.fetchData(`posts/${post.id}`, 'DELETE', user.jwt)
            .then(data => {
                console.log(data)
                postsDispatch(postsActions.DELETE_POST(post.id))
                deleteFile(pictureUrl)
                .then(res => console.log(res))
            })
    }

    const handleUnlikeSubmit = (e: React.FormEvent<SVGElement>) => {
        e.preventDefault()
        postsDispatch(postsActions.UNLIKE_POST(post.id))
        fetcher.fetchData(`posts/${post.id}/likes`, 'DELETE', user.jwt)
            .catch(err => {
                postsDispatch(postsActions.LIKE_POST(post.id))
            })
    }

    return (
        <article className='postOnFeed flexVertCenter'>
            <div className='postHeader'>
                <div>
                    <img className="smallProfilePic" src={post.profile_picture}></img>
                    <Link to={`/profile/${post.user_id}`}><h4>{post.username}</h4></Link>
                </div>
                <FaEllipsisH onClick={handleShowOptions}></FaEllipsisH>
                {showOptions ?
                    user.user_id === post.user_id ?
                        <button className='deletePost optionsForPost' onMouseLeave={handleHideOptions} onClick={handleDelete}>Delete Post</button>
                        :
                        <span className="optionsForPost" onMouseLeave={handleHideOptions}>No Options</span>
                    :
                    null
                }

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