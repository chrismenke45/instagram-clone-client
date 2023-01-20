import React from 'react';
import ProfileBanner from '../components/outer/ProfileBanner';
import Profile from '../components/outer/Profile';
import NavFooter from '../components/outer/NavFooter';

const ProfilePage: React.FC = () => {


    return (
        <div id="page">
            <ProfileBanner username='Yeehaw' />
            <Profile />
            <NavFooter />
        </div>
    );
}

export default ProfilePage;