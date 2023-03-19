import React from 'react';
import Post from '../components/outer/Post';
import NavFooter from '../components/outer/NavFooter';

const PostPage: React.FC = () => {


    return (
        <div id="page">
            <Post />
            <NavFooter />
        </div>
    );
}

export default PostPage;