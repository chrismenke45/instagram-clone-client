import React from 'react';
import PostOnFeed from './PostOnFeed';

const Feed: React.FC = () => {


    return (
        <div id="feed" className='flexVertCenter'>
            <PostOnFeed />
            <PostOnFeed />
            <PostOnFeed />
        </div>
    );
}

export default Feed;