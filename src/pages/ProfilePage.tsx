import React from 'react';
import Banner from '../components/outer/Banner';
import Profile from '../components/outer/Profile';
import NavFooter from '../components/outer/NavFooter';

const ProfilePage: React.FC = () => {


    return (
        <div id="page">
            <Banner />
            <Profile />
            <NavFooter />
        </div>
    );
}

export default ProfilePage;