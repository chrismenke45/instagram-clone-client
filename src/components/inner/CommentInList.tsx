import React from 'react';
import { CommentProp } from '../../models/CommentProp';
import { Link } from 'react-router-dom';
import timeAgo from '../../functions/timeAgo';
import ImageWithFallback from './ImageWithFallback';

interface Props {
    comment: CommentProp;
}

const CommentInList: React.FC<Props> = (props) => {
    const { comment } = props
    return (
        <li className='commentInList'>
            <ImageWithFallback src={comment.profile_picture} classes="smallProfilePic" profilePicture={true}></ImageWithFallback>
            <div className='commentTextBox'>
                <div className='commentHeader'>
                    <Link to={`/profile/${comment.user_id}`} className='commentUserName'>{comment.username}</Link>
                    <span className='commentDate'>{timeAgo(comment.created_at, true)}</span>
                </div>

                <span>{comment.text}</span>
            </div>

        </li>
    );
}

export default CommentInList;