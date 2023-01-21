import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';
// import getUserObject from '../../functions/user/getUserObject';
// import FetchAPI from '../../functions/fetch/FetchAPI';

const Grid: React.FC<{gridPath: string}> = (props) => {
    const { gridPath } = props
    interface PostUrl {
        picture_url: string;
        id: number;
    }
    const user = getUserObject()
    const [posts, setPosts] = useState<PostUrl[]>([])
    let fetcher = new FetchAPI

    useEffect(() => {
        fetcher.fetchData(gridPath, "GET", user.jwt)
        .then(posts => {
            setPosts(posts)
        })
    }, [])

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