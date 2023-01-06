import React from 'react';
import { CommentProp } from '../../models/CommentProp';
import { Link } from 'react-router-dom';
import timeAgo from '../../functions/timeAgo';

interface Props {
    comment: CommentProp;
}

const CommentInList: React.FC<Props> = (props) => {
    const { comment } = props
    return (
        <li className='commentInList'>
            <img className="smallProfilePic" src={comment.profile_picture} alt={`${comment.username}'s profile picture`}></img>
            <div className='commentTextBox'>
                <div className='commentHeader'>
                    <Link to="/profile" className='commentUserName'>{comment.username}</Link>
                    <span className='commentDate'>{timeAgo(comment.created_at)}</span>
                </div>

                <span>{comment.text}</span>
            </div>

        </li>
    );
}

export default CommentInList;