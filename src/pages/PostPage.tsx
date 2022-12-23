import React from 'react';
import Banner from '../components/outer/Banner';
import Post from '../components/outer/Post';
import NavFooter from '../components/outer/NavFooter';

const PostPage: React.FC = () => {


    return (
        <div id="page">
            <Banner />
            <Post />
            <NavFooter />
        </div>
    );
}

export default PostPage;