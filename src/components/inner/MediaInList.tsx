import React from 'react';
import { MediaProp } from '../../models/MediaProp';
import { Link } from 'react-router-dom';
import timeAgo from '../../functions/timeAgo';
import { follow, unfollow } from "../../functions/eventHandlers/followHandlers"
import shortenTime from '../../functions/shortenTime';

interface Props {
    media: MediaProp;
}

const MediaInList: React.FC<Props> = (props) => {
    const { media } = props

    const handleFollow = (id: number) => {
        follow(id)
    }
    const handleUnfollow = (id: number) => {
        unfollow(id)
    }
    
    return (
        <li className='mediaInList'>
            <img className="smallProfilePic" src={media.profile_picture} alt={`${media.username}'s profile picture`}></img>
            {media.id === 76 || media.id === 67 ?
                media.id === 76 ?
                    <p className='mediaTextBox'>
                        <Link
                            to={`/profile/${media.user_id}`}
                            className="mediaUserName"
                        >
                            {media.username}
                        </Link>
                        &nbsp;liked your photo
                        <span>&nbsp;{shortenTime(timeAgo(media.created_at, true))}</span>
                    </p>
                    :
                    <p className='mediaTextBox'>
                        <Link
                            to={`/profile/${media.user_id}`}
                            className="mediaUserName"
                        >
                            {media.username}
                        </Link>
                        &nbsp;commented on your photo: {media.text}
                        <span>&nbsp;{shortenTime(timeAgo(media.created_at, true))}</span>
                    </p>
                :
                <p className='mediaTextBox'>
                    <Link
                        to={`/profile/${media.user_id}`}
                        className="mediaUserName"
                    >
                        {media.username}
                    </Link>
                    &nbsp;started following you
                    <span>&nbsp;{shortenTime(timeAgo(media.created_at, true))}</span>
                </p>
            }

            {media.picture_url ?
                <img className="smallPostPic" src={media.picture_url}></img>
                :
                media.current_user_follows ?
                    <button onClick={() => handleUnfollow(media.user_id)}>Following</button>
                    :
                    <button onClick={() => handleFollow(media.user_id)}>Follow</button>
            }

        </li>
    );
}

export default MediaInList;