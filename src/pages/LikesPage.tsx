import React from 'react';
import Banner from '../components/outer/Banner';
import Likes from '../components/outer/Likes';
import NavFooter from '../components/outer/NavFooter';

const LikesPage: React.FC = () => {


    return (
        <div id="page">
            <Banner />
            <Likes />
            <NavFooter />
        </div>
    );
}

export default LikesPage;