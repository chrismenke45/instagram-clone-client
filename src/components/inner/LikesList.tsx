import React, { useEffect, useContext } from 'react';
import UserInList from './UserInList';
import { useParams } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';
import usersInListActions from '../../stateManagement/actions/usersInListActions';
import UsersInListContext from '../../stateManagement/contexts/UsersInListContext';

const LikesList: React.FC = () => {
    const { post_id } = useParams()
    const user = getUserObject()
    let fetcher = new FetchAPI()
    const {usersInListState, usersInListDispatch} = useContext(UsersInListContext)

    useEffect(() => {
        fetcher.fetchData(`posts/${post_id}/likes`, "GET", user.jwt)
            .then(data => {
                usersInListDispatch(usersInListActions.SET_USERS(data))
            })
    }, [])

    return (
        <ul id="usersList" className='flexVertCenter'>
            {usersInListState.users.map(like => {
                return <UserInList key={like.user_id} user={like} />
            })}
        </ul>
    );
}

export default LikesList;