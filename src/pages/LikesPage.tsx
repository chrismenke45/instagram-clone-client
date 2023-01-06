import React from 'react';
import BackBanner from '../components/outer/BackBanner';
import NavFooter from '../components/outer/NavFooter';
import LikesList from '../components/inner/LikesList';

const LikesPage: React.FC = () => {


    return (
        <div id="page">
            <BackBanner header="Likes"/>
            <LikesList />
            <NavFooter />
        </div>
    );
}

export default LikesPage;