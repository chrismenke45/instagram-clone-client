import React from 'react';
import { UserInListProp } from '../../models/UserInListProp';
import { Link } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import { follow, unfollow } from '../../functions/eventHandlers/followHandlers';

interface Props {
    user: UserInListProp;
}

const UserInList: React.FC<Props> = (props) => {
    const currentUser = getUserObject()
    const { user } = props

    const handleFollow = () => {
        follow(user.user_id)
    }
    const handleUnfollow = () => {
        unfollow(user.user_id)
    }
    return (
        <li className='userInList'>
            <img className="smallProfilePic" src={user.profile_picture} alt={`${user.username}'s profile`}></img>
            <div className='userListTextBox'>
                <Link to="/profile" className='userListUserName'>{user.username}</Link>
                <span className='userListName'>{user.name}</span>
            </div>
            {currentUser.user_id !== user.user_id && user.current_user_follows !== undefined ?
                user.current_user_follows ? 
                <div className='buttonContainer'>
                    <button onClick={handleUnfollow}>Following</button>
                </div>
                :
                <div className='buttonContainer'>
                    <button onClick={handleFollow}>Follow</button>
                </div>
                :
                null
            }

        </li>
    );
}

export default UserInList;