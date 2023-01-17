import React, { useEffect, useState } from 'react';
import LikeInList from './LikeInList';
import fetchData from '../../functions/fetch/fetchData';
import { useParams } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import { LikeProp } from '../../models/LikeProp';

const LikesList: React.FC = () => {
    const { post_id } = useParams()
    const user = getUserObject()
    const [likes, setLikes] = useState<LikeProp[]>([{
        username: "",
        name: "",
        user_id: 0,
        profile_picture: "",
        id: null
    }])

    useEffect(() => {
        fetchData(`posts/${post_id}/likes`, "GET", undefined, (user.jwt ? user.jwt : undefined))
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