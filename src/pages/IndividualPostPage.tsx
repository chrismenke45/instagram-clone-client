import React, { useEffect, useContext } from 'react';
import BackBanner from '../components/outer/BackBanner';
import { useParams } from 'react-router-dom';
import FetchAPI from '../functions/fetch/FetchAPI';
import getUserObject from '../functions/user/getUserObject';
import PostOnFeed from '../components/inner/PostOnFeed';
import postsActions from '../stateManagement/actions/postsActions';
import PostsContext from '../stateManagement/contexts/PostsContext';

const IndividualPostPage: React.FC = () => {
    const { post_id } = useParams()
    const fetcher = new FetchAPI()
    const user = getUserObject()
    const { postsState, postsDispatch } = useContext(PostsContext)

    useEffect(() => {
        fetcher.fetchData(`posts/${post_id}`, "GET", user.jwt)
            .then(posts => {
                postsDispatch(postsActions.SET_POSTS(posts))
            })
    }, [])

    return (
        <div id="page">
            <BackBanner header="Post" />
            {postsState.posts.length === 1 ?
                <PostOnFeed post={postsState.posts[0]} />
                :
                <div>Error</div>
            }
        </div>
    );
}

export default IndividualPostPage;