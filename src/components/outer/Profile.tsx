import React from 'react';
import ProfileSummary from '../inner/ProfileSummary';
import ProfilePosts from './ProfilePosts';

const Profile: React.FC = () => {


    return (
        <main>
            <ProfileSummary />
            <ProfilePosts />
        </main>
    );
}

export default Profile;