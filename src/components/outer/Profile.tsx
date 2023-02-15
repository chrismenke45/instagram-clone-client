import React, {useState, useEffect, useContext} from 'react';
import ProfileSummary from '../inner/ProfileSummary';
import ProfilePosts from './ProfilePosts';
import getUserObject from '../../functions/user/getUserObject';
import { useParams } from 'react-router-dom';
import FetchAPI from '../../functions/fetch/FetchAPI';
import { ProfileProp } from '../../models/ProfileProp';
import ReloadContext from '../../stateManagement/contexts/reloadContext';

const Profile: React.FC = () => {
    let fetcher = new FetchAPI()
    const user = getUserObject()
    const { user_id } = useParams()

    
    const { reloadState } = useContext(ReloadContext)

    const [profile, setProfile] = useState<ProfileProp>({
        post_count: 0,
        follower_count: 0,
        followee_count: 0,
        id: 0,
        username: "-",
        name: "-",
        bio: "",
        profile_picture: process.env.REACT_APP_DEFAULT_PROFILE_PICTURE || "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/White_square_50%25_transparency.svg/2048px-White_square_50%25_transparency.svg.png",
        current_user_follows: false
    })
    useEffect(() => {
        fetcher.fetchData(`users/${user_id}`, "GET", user.jwt)
        .then(userProfile => {
            setProfile(userProfile[0])
        })
    }, [reloadState])


    return (
        <main>
            <ProfileSummary profile={profile}/>
            <ProfilePosts profileId={profile.id}/>
        </main>
    );
}

export default Profile;