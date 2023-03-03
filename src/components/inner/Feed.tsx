import React, { useEffect, useContext, useState } from 'react';
import PostOnFeed from './PostOnFeed';
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';
import postsActions from '../../stateManagement/actions/postsActions';
import PostsContext from '../../stateManagement/contexts/PostsContext';
import LoadingIcon from './LoadingIcon';
import { Link } from 'react-router-dom';
import ReloadContext from '../../stateManagement/contexts/ReloadContext';
import generateQueryParams from '../../functions/generateQueryParams';
import { QueryParamObjProp } from '../../models/QueryParamObjProp';

const Feed: React.FC<{ feedPath: string, queryParams?: QueryParamObjProp, homePage?: boolean }> = (props) => {
    const { feedPath, queryParams, homePage } = props
    const { postsState, postsDispatch } = useContext(PostsContext)
    const { reloadState } = useContext(ReloadContext)
    const [loading, setLoading] = useState<boolean>(true)
    let fetcher = new FetchAPI()
    const userObject = getUserObject()

    useEffect(() => {
        setLoading(true)
        let path = feedPath + (queryParams ? generateQueryParams(queryParams) : "")
        fetcher.fetchData(path, "GET", userObject.jwt)
            .then(posts => {
                postsDispatch(postsActions.SET_POSTS(posts))
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }, [reloadState])

    return (
        <div id="feed" className='flexVertCenter'>
            {loading && !postsState.posts.length?
                <LoadingIcon />
                :
                postsState.posts.length ?
                <>
                    {postsState.posts.map(post => {
                        return <PostOnFeed key={post.id} post={post} />
                    })}
                    {loading && <div id="loadingMoreContainer">
                        <LoadingIcon />
                    </div>}
                </>
                    :
                    homePage ?
                    <Link to='/search' id='toSearchPage'>Find people</Link>
                    :
                    <p id="noResults">No posts</p>
            }
        </div>
    );
}

export default Feed;