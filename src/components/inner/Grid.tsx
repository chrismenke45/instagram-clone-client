import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';
import LoadingIcon from './LoadingIcon';
import ReloadContext from '../../stateManagement/contexts/ReloadContext';
// import getUserObject from '../../functions/user/getUserObject';
// import FetchAPI from '../../functions/fetch/FetchAPI';

const Grid: React.FC<{ gridPath: string }> = (props) => {
    const { gridPath } = props
    interface PostUrl {
        picture_url: string;
        id: number;
    }
    const user = getUserObject()
    const [posts, setPosts] = useState<PostUrl[]>([])
    const [activelySearching, setActivelySearching] = useState<boolean>(false)
    const { reloadState} = useContext(ReloadContext)
    let fetcher = new FetchAPI()

    useEffect(() => {
        setActivelySearching(true)
        fetcher.fetchData(gridPath, "GET", user.jwt)
            .then(posts => {
                setPosts(posts)
                setActivelySearching(false)
            })
    }, [gridPath, reloadState])

    return (
        <div id="grid" className='flexVertCenter'>
            {posts.length < 1 && <div></div>}
            {posts.length > 0 ?
                posts.map(post => {
                    return (
                        <Link
                            to={`/posts/${post.id}`}
                            key={post.id}
                            className="gridChild"
                        >
                            <img src={post.picture_url}></img>
                        </Link>
                    )
                })
                :
                activelySearching ?
                    <LoadingIcon />
                    :
                    <p id="noResults">No posts</p>}

        </div>
    );
}

export default Grid;