import React, { useEffect, useContext, useState } from 'react';
import PostOnFeed from './PostOnFeed';
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';
import postsActions from '../../stateManagement/actions/postsActions';
import PostsContext from '../../stateManagement/contexts/PostsContext';
import LoadingIcon from './LoadingIcon';

const Feed: React.FC<{ feedPath: string }> = (props) => {
    const { feedPath } = props
    const { postsState, postsDispatch } = useContext(PostsContext)
    const [loading, setLoading] = useState<boolean>(true)
    let fetcher = new FetchAPI()
    const userObject = getUserObject()

    useEffect(() => {
        fetcher.fetchData(feedPath, "GET", userObject.jwt)
            .then(posts => {
                postsDispatch(postsActions.SET_POSTS(posts))
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }, [])

    return (
        <div id="feed" className='flexVertCenter'>
            {loading ?
                <LoadingIcon />
                :
                postsState.posts.length ?
                    postsState.posts.map(post => {
                        return <PostOnFeed key={post.id} post={post} />
                    })
                    :
                    <p id="noResults">No posts</p>
            }
        </div>
    );
}

export default Feed;