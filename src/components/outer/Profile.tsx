import React, {useState, useEffect} from 'react';
import ProfileSummary from '../inner/ProfileSummary';
import ProfilePosts from './ProfilePosts';
import getUserObject from '../../functions/user/getUserObject';
import { useParams } from 'react-router-dom';
import FetchAPI from '../../functions/fetch/FetchAPI';
import { ProfileProp } from '../../models/ProfileProp';

const Profile: React.FC = () => {
    let fetcher = new FetchAPI()
    const user = getUserObject()
    const { user_id } = useParams()
    const [profile, setProfile] = useState<ProfileProp>({
        post_count: 3,
        follower_count: 5,
        followee_count: 6,
        id: 6,
        username: "bobbymge",
        name: "Bobby",
        bio: "I'm bobby mcGee",
        profile_picture: "square.jpeg",
        current_user_follows: false
    })
    useEffect(() => {
        fetcher.fetchData(`users/${user_id}`, "GET", user.jwt)
        .then(userProfile => {
            setProfile(userProfile[0])
        })
    }, [])


    return (
        <main>
            <ProfileSummary profile={profile}/>
            <ProfilePosts profileId={profile.id}/>
        </main>
    );
}

export default Profile;