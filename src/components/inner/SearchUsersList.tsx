import React from 'react';
import UserInList from './UserInList';
import { UserInListProp } from '../../models/UserInListProp';

interface Props {
    users: UserInListProp[];
}

const SearchUsersList: React.FC<Props> = (props) => {
    const { users } = props
    return (
        <ul id="usersList" className='flexVertCenter'>
            {users.map(user => {
                return <UserInList key={user.user_id} user={user} />
            })}
        </ul>
    );
}

export default SearchUsersList;