import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileProp } from '../../models/ProfileProp';
import FetchAPI from '../../functions/fetch/FetchAPI';
import getUserObject from '../../functions/user/getUserObject';

const ProfileSummary: React.FC<{ profile: ProfileProp }> = (props) => {
    const { profile } = props
    const user = getUserObject()
    const fetcher = new FetchAPI

    const handleFollow = () => {
        fetcher.fetchData(`users/${profile.id}/follows`, "POST", user.jwt)
            .then(co => console.log(co))
    }
    const handleUnfollow = () => {
        fetcher.fetchData(`users/${profile.id}/follows`, "DELETE", user.jwt)
            .then(co => console.log(co))
    }


    return (
        <section id="profileSummary">
            <div>
                <img src={profile.profile_picture}></img>
                <div className='profileCountSummary'>
                    <span className='profileCountNumber'>{profile.post_count}</span>
                    <span className='profileCountSubject'>posts</span>
                </div>
                <Link to={`/profile/${profile.id}/followers`} className='profileCountSummary'>
                    <span className='profileCountNumber'>{profile.follower_count || 0}</span>
                    <span className='profileCountSubject'>followers</span>
                </Link>
                <Link to={`/profile/${profile.id}/following`} className='profileCountSummary'>
                    <span className='profileCountNumber'>{profile.followee_count || 0}</span>
                    <span className='profileCountSubject'>following</span>
                </Link>
            </div>
            <span id="profileName">{profile.name}</span>
            <p id="profileBio">{profile.bio}</p>
            <div id="profileOptionButtons">
                {profile.current_user_follows ? (
                    <button onClick={handleUnfollow}>Unfollow</button>
                ) : (
                    <button onClick={handleFollow}>Follow</button>
                )
                }
                <button>Message</button>
            </div>
        </section>
    );
}

export default ProfileSummary;