import React, { useEffect, useState, useContext } from 'react';
import PostOnFeed from './PostOnFeed';
import getUserObject from '../../functions/user/getUserObject';
import { PostProp } from '../../models/PostProp';
import FetchAPI from '../../functions/fetch/FetchAPI';
import postsActions from '../../stateManagement/actions/postsActions';
import PostsContext from '../../stateManagement/contexts/PostsContext';

const Feed: React.FC<{feedPath: string}> = (props) => {
    const { feedPath } = props
    const { postsState, postsDispatch } = useContext(PostsContext)
    let fetcher = new FetchAPI
 
    useEffect(() => {
        const userObject = getUserObject()
       
        // below is to test with out of date jwt
        // fetcher.fetchData("posts", "GET", 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imd1ZXN0IiwidXNlcl9pZCI6NiwiZXhwIjoxNjczNTQ0OTcyfQ.QSDoDI2RORSvNnHZ7XP8cV4oQkv1NywgF_8O0i7pxng')
        fetcher.fetchData(feedPath, "GET", userObject.jwt)
        .then(posts => {
            postsDispatch(postsActions.SET_POSTS(posts))
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    return (
        <div id="feed" className='flexVertCenter'>
            {postsState.posts.map(post => {
                return <PostOnFeed key={post.id} post={post} />
            })}
        </div>
    );
}

export default Feed;