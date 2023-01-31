import React from 'react';
import Banner from '../components/outer/Banner';
import BackBanner from '../components/outer/BackBanner';
import Media from '../components/outer/Media';
import NavFooter from '../components/outer/NavFooter';

const MediaPage: React.FC = () => {


    return (
        <div id="page">
            <BackBanner header="Media"/>
            <Media />
            <NavFooter />
        </div>
    );
}

export default MediaPage;