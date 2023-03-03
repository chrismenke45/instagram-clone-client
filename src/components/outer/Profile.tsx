import React, {useEffect, useContext, useState} from 'react';
import ProfileSummary from '../inner/ProfileSummary';
import ProfilePosts from './ProfilePosts';
import getUserObject from '../../functions/user/getUserObject';
import { useParams } from 'react-router-dom';
import FetchAPI from '../../functions/fetch/FetchAPI';
import ReloadContext from '../../stateManagement/contexts/ReloadContext';
import reloadActions from '../../stateManagement/actions/reloadActions';
import ProfileContext from '../../stateManagement/contexts/ProfileContext';
import profileActions from '../../stateManagement/actions/profileActions';

const Profile: React.FC = () => {
    let fetcher = new FetchAPI()
    const user = getUserObject()
    const { user_id } = useParams()
    const { reloadState, reloadDispatch } = useContext(ReloadContext)
    const { profileState, profileDispatch } = useContext(ProfileContext)
    const [displayCount, setDisplayCount] = useState<number>(15)

    useEffect(() => {
        fetcher.fetchData(`users/${user_id}`, "GET", user.jwt)
        .then(userProfile => {
            profileDispatch(profileActions.SET_PROFILE(userProfile[0]))
            if (profileState.profile.id === 0) reloadDispatch(reloadActions.INCREMENT())
        })
    }, [reloadState])

    const scrollIncreaseDisplayCount = (e: React.UIEvent<HTMLElement>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight) {
            setDisplayCount(prev => prev + 15);
            reloadDispatch(reloadActions.INCREMENT())
        }
    }

    return (
        <main onScroll={scrollIncreaseDisplayCount}>
            <ProfileSummary profile={profileState.profile}/>
            <ProfilePosts profileId={profileState.profile.id} postCount={displayCount}/>
        </main>
    );
}

export default Profile;