import React, { useEffect, useState } from 'react';
import LikeInList from './LikeInList';
import { useParams } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import { LikeProp } from '../../models/LikeProp';
import FetchAPI from '../../functions/fetch/FetchAPI';

const LikesList: React.FC = () => {
    const { post_id } = useParams()
    const user = getUserObject()
    let fetcher = new FetchAPI
    const [likes, setLikes] = useState<LikeProp[]>([{
        username: "",
        name: "",
        user_id: 0,
        profile_picture: "",
        id: null
    }])

    useEffect(() => {
        fetcher.fetchData(`posts/${post_id}/likes`, "GET", user.jwt)
            .then(data => {
                console.log(data)
                setLikes(data)
            })
    }, [])

    return (
        <ul id="likesList" className='flexVertCenter'>
            {likes.map(like => {
                return <LikeInList key={like.id} like={like} />
            })}
        </ul>
    );
}

export default LikesList;