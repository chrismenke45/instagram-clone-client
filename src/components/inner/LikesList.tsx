import React from 'react';

const LikesList: React.FC = () => {
    const likes = [{
        username: "boby43",
        name: "bob",
        id: 1
    },
    {
        username: "cm45",
        name: "Chris",
        id: 2
    }
    ]

    return (
        <ul id="LikesList" className='flexVertCenter'>
            {likes.map(like => {
                <li key={like.id}></li>
            })}
        </ul>
    );
}

export default LikesList;