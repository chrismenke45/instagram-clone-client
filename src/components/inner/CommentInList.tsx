import React from 'react';
import { CommentProp } from '../../models/CommentProp';

interface Props {
    comment: CommentProp;
}

const CommentInList: React.FC<Props> = (props) => {
    const { comment } = props
    return (
        <li className='commentInList'>
            <img className="smallProfilePic" src={comment.profile_picture} alt={`${comment.username}'s profile picture`}></img>
            <div>
                <h6 className='commentUserName'>{comment.username}</h6>
                <span>{comment.text}</span>
            </div>
            
        </li>
    );
}

export default CommentInList;