import React from 'react';
import LikeInList from './LikeInList';

const LikesList: React.FC = () => {
    const likes = [{
        username: "boby43",
        user_id: 1,
        name: "bob",
        id: 1,
        profile_picture: "square.jpeg",
    },
    {
        username: "cm45",
        name: "chris",
        user_id: 2,
        id: 2,
        profile_picture: "square.jpeg",
    }
    ]

    return (
        <ul id="likesList" className='flexVertCenter'>
            {likes.map(like => {
                return <LikeInList key={like.id} like={like}/>
            })}
        </ul>
    );
}

export default LikesList;