import React from 'react';
import { MessageProp } from '../../models/MessageProp';
import timeAgo from "../../functions/timeAgo"
import shortenTime from '../../functions/shortenTime';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

interface Props {
    message: MessageProp
}

const MessageInList: React.FC<Props> = (props) => {
    const { message } = props
    return (
        <li className='messageInList'>
            <Link to={`/messages/${message.user_id}`}>
                <ImageWithFallback src={message.profile_picture} classes="smallProfilePic" profilePicture={true}></ImageWithFallback>
                <div className='messagesInfo'>
                    <span className='messagesUsername'>{message.username}</span>
                    <div className='messageText'>
                        <p>{message.text}</p>
                        <span className='messageDate'>{shortenTime(timeAgo(message.created_at, true))}</span>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default MessageInList;