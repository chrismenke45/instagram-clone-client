import React, { useState, useEffect } from 'react';
import BackBanner from '../components/outer/BackBanner';
import { PostProp } from '../models/PostProp';
import { useParams } from 'react-router-dom';
import FetchAPI from '../functions/fetch/FetchAPI';
import getUserObject from '../functions/user/getUserObject';
import PostOnFeed from '../components/inner/PostOnFeed';

const IndividualPostPage: React.FC = () => {
    const { post_id } = useParams()
    const fetcher = new FetchAPI()
    const user = getUserObject()
    const [postInArray, setPostInArray] = useState<PostProp[]>([])

    useEffect(() => {
        fetcher.fetchData(`posts/${post_id}`, "GET", user.jwt)
            .then(postArr => {
                console.log(postArr)
                setPostInArray(postArr)
            })
    }, [])
    return (
        <div id="page">
            <BackBanner header="Post" />
            {postInArray.length === 1 ?
                <PostOnFeed post={postInArray[0]} />
                :
                <div>haw</div>
            }
        </div>
    );
}

export default IndividualPostPage;