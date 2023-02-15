import React, { useState, useEffect, useContext } from 'react';
import BackBanner from '../components/outer/BackBanner';
import { PostProp } from '../models/PostProp';
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
    //const [postInArray, setPostInArray] = useState<PostProp[]>([])

    useEffect(() => {
        fetcher.fetchData(`posts/${post_id}`, "GET", user.jwt)
            .then(postArr => {
                console.log(postArr)
                postsDispatch(postsActions.SET_POSTS(postArr))
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