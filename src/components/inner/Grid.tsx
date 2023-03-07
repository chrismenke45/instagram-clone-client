import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';
import LoadingIcon from './LoadingIcon';
import ReloadContext from '../../stateManagement/contexts/ReloadContext';
import { QueryParamObjProp } from '../../models/QueryParamObjProp';
import generateQueryParams from '../../functions/generateQueryParams';
import ImageWithFallback from './ImageWithFallback';

const Grid: React.FC<{ gridPath: string, queryParams?: QueryParamObjProp }> = (props) => {
    const { gridPath, queryParams } = props
    interface PostUrl {
        picture_url: string;
        id: number;
    }
    const user = getUserObject()
    const [posts, setPosts] = useState<PostUrl[]>([])
    const [activelySearching, setActivelySearching] = useState<boolean>(false)
    const { reloadState } = useContext(ReloadContext)
    let fetcher = new FetchAPI()

    useEffect(() => {
        setActivelySearching(true)
        let path = gridPath + (queryParams ? generateQueryParams(queryParams) : "")
        fetcher.fetchData(path, "GET", user.jwt)
            .then(posts => {
                setPosts(posts)
                setActivelySearching(false)
            })
            .catch(err => {
                setActivelySearching(false)
            })
    }, [reloadState])

    return (
        <>
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
                                <ImageWithFallback src={post.picture_url} post={true}></ImageWithFallback>
                            </Link>
                        )
                    })
                    :
                    activelySearching ?
                        <LoadingIcon />
                        :
                        <p id="noResults">No posts</p>}

            </div>
            {activelySearching && posts.length > 0 && <div id="loadingMoreContainer" className='flexVertCenter'>
                        <LoadingIcon />
                    </div>}
        </>
    );
}

export default Grid;