import React from 'react';
import UserInList from './UserInList';
import { UserInListProp } from '../../models/UserInListProp';

interface Props {
    users: UserInListProp[];
    message?: boolean;
}

const SearchUsersList: React.FC<Props> = (props) => {
    const { users, message } = props
    return (
        <ul id="usersList" className='flexVertCenter'>
            {users.map(user => {
                return <UserInList key={user.user_id} user={user} message={message} />
            })}
        </ul>
    );
}

export default SearchUsersList;