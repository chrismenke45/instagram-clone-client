import React, { useEffect, useContext } from 'react';
import UserInList from './UserInList';
import { useParams } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';
import usersInListActions from '../../stateManagement/actions/usersInListActions';
import UsersInListContext from '../../stateManagement/contexts/UsersInListContext';

interface Props {
    followType: string;
}
const FollowsList: React.FC<Props> = (props) => {
    const { followType } = props
    const { user_id } = useParams()
    const user = getUserObject()
    let fetcher = new FetchAPI()
    const {usersInListState, usersInListDispatch} = useContext(UsersInListContext)

    useEffect(() => {
        let url = `users/${user_id}/follows` + (followType === "Following" ? '?following=true' : "")
        fetcher.fetchData(url, "GET", user.jwt)
            .then(data => {
                usersInListDispatch(usersInListActions.SET_USERS(data))
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return (
        <ul id="usersList" className='flexVertCenter'>
            
            {usersInListState.users.length > 0 && usersInListState.users.map(follow => {
                return <UserInList key={follow.user_id} user={follow} />
            })}
        </ul>
    );
}

export default FollowsList;