import React from 'react';
import BackBanner from '../components/outer/BackBanner';
import NavFooter from '../components/outer/NavFooter';

const LikesPage: React.FC = () => {


    return (
        <div id="page">
            <BackBanner header="Likes"/>
            <NavFooter />
        </div>
    );
}

export default LikesPage;