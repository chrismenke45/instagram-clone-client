import React from 'react';
import { LikeProp } from '../../models/LikeProp';
import { Link } from 'react-router-dom';
import timeAgo from '../../functions/timeAgo';

interface Props {
    like: LikeProp;
}

const LikeInList: React.FC<Props> = (props) => {
    const { like } = props
    return (
        <li className='likeInList'>
            <img className="smallProfilePic" src={like.profile_picture} alt={`${like.username}'s profile picture`}></img>
            <div className='likeTextBox'>
                <Link to="/profile" className='likeUserName'>{like.username}</Link>
                <span className='likeName'>{like.name}</span>
            </div>

        </li>
    );
}

export default LikeInList;