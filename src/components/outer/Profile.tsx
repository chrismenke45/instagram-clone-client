import React, {useEffect, useContext} from 'react';
import ProfileSummary from '../inner/ProfileSummary';
import ProfilePosts from './ProfilePosts';
import getUserObject from '../../functions/user/getUserObject';
import { useParams } from 'react-router-dom';
import FetchAPI from '../../functions/fetch/FetchAPI';
import ReloadContext from '../../stateManagement/contexts/ReloadContext';
import ProfileContext from '../../stateManagement/contexts/ProfileContext';
import profileActions from '../../stateManagement/actions/profileActions';

const Profile: React.FC = () => {
    let fetcher = new FetchAPI()
    const user = getUserObject()
    const { user_id } = useParams()

    
    const { reloadState } = useContext(ReloadContext)
    const { profileState, profileDispatch } = useContext(ProfileContext)
    useEffect(() => {
        fetcher.fetchData(`users/${user_id}`, "GET", user.jwt)
        .then(userProfile => {
            profileDispatch(profileActions.SET_PROFILE(userProfile[0]))
        })
    }, [reloadState])


    return (
        <main>
            <ProfileSummary profile={profileState.profile}/>
            <ProfilePosts profileId={profileState.profile.id}/>
        </main>
    );
}

export default Profile;