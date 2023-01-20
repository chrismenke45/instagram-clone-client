import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import getUserObject from '../../functions/user/getUserObject';
// import FetchAPI from '../../functions/fetch/FetchAPI';

const Grid: React.FC = () => {
    interface PostUrl {
        picture_url: string;
        id: number;
    }
    const [posts, setPosts] = useState<PostUrl[]>([
        {
            id: 0,
            picture_url: "square.jpeg",
        },
        {
            id: 1,
            picture_url: "square.jpeg",
        },
        {
            id: 2,
            picture_url: "square.jpeg",
        },
        {
            id: 3,
            picture_url: "square.jpeg",
        },
        {
            id: 4,
            picture_url: "square.jpeg",
        },
        {
            id: 5,
            picture_url: "square.jpeg",
        },
        {
            id: 6,
            picture_url: "square.jpeg",
        },
        {
            id: 7,
            picture_url: "square.jpeg",
        },
    ])
    //let fetcher = new FetchAPI

    // useEffect(() => {
    //     const userObject = getUserObject()

    //     // below is to test with out of date jwt
    //     // fetcher.fetchData("posts", "GET", 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imd1ZXN0IiwidXNlcl9pZCI6NiwiZXhwIjoxNjczNTQ0OTcyfQ.QSDoDI2RORSvNnHZ7XP8cV4oQkv1NywgF_8O0i7pxng')
    //     fetcher.fetchData("posts", "GET", userObject.jwt)
    //     .then(posts => {
    //         setPosts(posts)
    //     })
    // }, [])

    return (
        <div id="grid" className='flexVertCenter'>
            {posts.map(post => {
                return (
                    <Link
                        to={`posts/${post.id}`}
                        key={post.id}
                        className="gridChild"
                    >
                        <img src={post.picture_url}></img>
                    </Link>
                )
            })}

        </div>
    );
}

export default Grid;