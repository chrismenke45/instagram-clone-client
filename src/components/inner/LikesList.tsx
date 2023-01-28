import React, { useEffect, useState } from 'react';
import UserInList from './UserInList';
import { useParams } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import { UserInListProp } from '../../models/UserInListProp';
import FetchAPI from '../../functions/fetch/FetchAPI';

const LikesList: React.FC = () => {
    const { post_id } = useParams()
    const user = getUserObject()
    let fetcher = new FetchAPI()
    const [likes, setLikes] = useState<UserInListProp[]>([{
        username: "",
        name: "",
        user_id: 0,
        profile_picture: "",
        id: null,
        current_user_follows: false
    }])

    useEffect(() => {
        fetcher.fetchData(`posts/${post_id}/likes`, "GET", user.jwt)
            .then(data => {
                console.log(data)
                setLikes(data)
            })
    }, [])

    return (
        <ul id="usersList" className='flexVertCenter'>
            {likes.map(like => {
                return <UserInList key={like.user_id} user={like} />
            })}
        </ul>
    );
}

export default LikesList;