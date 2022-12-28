import React from 'react';
import Banner from '../components/outer/Banner';
import Media from '../components/outer/Media';
import NavFooter from '../components/outer/NavFooter';

const MediaPage: React.FC = () => {


    return (
        <div id="page">
            <Banner />
            <Media />
            <NavFooter />
        </div>
    );
}

export default MediaPage;