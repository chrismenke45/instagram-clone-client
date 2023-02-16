import React, { useReducer } from 'react';
import ProfileBanner from '../components/outer/ProfileBanner';
import Profile from '../components/outer/Profile';
import NavFooter from '../components/outer/NavFooter';
import ProfileContext, { initialProfileState } from '../stateManagement/contexts/ProfileContext';
import profileReducer from '../stateManagement/reducers/profileReducer';

const ProfilePage: React.FC = () => {

    const [profileState, profileDispatch] = useReducer(
        profileReducer,
        initialProfileState
    )


    return (
        <div id="page">
            <ProfileContext.Provider value={{ profileState, profileDispatch }}>
                <ProfileBanner username={profileState.profile.username} />
                <Profile />
            </ProfileContext.Provider>
            <NavFooter />
        </div>
    );
}

export default ProfilePage;