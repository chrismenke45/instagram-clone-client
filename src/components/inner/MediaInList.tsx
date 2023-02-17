import React, { useContext } from 'react';
import { MediaProp } from '../../models/MediaProp';
import { Link } from 'react-router-dom';
import timeAgo from '../../functions/timeAgo';
import { follow, unfollow } from "../../functions/eventHandlers/followHandlers"
import shortenTime from '../../functions/shortenTime';
import MediaContext from '../../stateManagement/contexts/MediaContext';
import mediaActions from '../../stateManagement/actions/mediaActions';

interface Props {
    media: MediaProp;
}

const MediaInList: React.FC<Props> = (props) => {
    const { media } = props
    const { mediaDispatch } = useContext(MediaContext)

    const handleFollow = (id: number) => {
        mediaDispatch(mediaActions.FOLLOW(id))
        follow(id)
            .catch(err => {
                mediaDispatch(mediaActions.UNFOLLOW(id))
            })
    }
    const handleUnfollow = (id: number) => {
        mediaDispatch(mediaActions.UNFOLLOW(id))
        unfollow(id)
            .catch(err => {
                mediaDispatch(mediaActions.FOLLOW(id))
            })
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