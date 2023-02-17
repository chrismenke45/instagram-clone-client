import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { ProfileProp } from '../../models/ProfileProp';
import getUserObject from '../../functions/user/getUserObject';
import { follow, unfollow } from '../../functions/eventHandlers/followHandlers';
import profileActions from '../../stateManagement/actions/profileActions';
import ProfileContext from '../../stateManagement/contexts/ProfileContext';

const ProfileSummary: React.FC<{ profile: ProfileProp }> = (props) => {
    const { profile } = props
    const user = getUserObject()
    const { profileDispatch } = useContext(ProfileContext)

    const handleFollow = () => {
        profileDispatch(profileActions.FOLLOW())
        follow(profile.id)
        .catch(err => {
            profileDispatch(profileActions.UNFOLLOW())
            console.error(err)
        })
    }

    const handleUnfollow = () => {
        profileDispatch(profileActions.UNFOLLOW())
        unfollow(profile.id)
        .catch(err => {
            profileDispatch(profileActions.FOLLOW())
            console.error(err)
        })
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


            {profile.id === user.user_id ? (
                <div id="profileOptionButtons">
                        <Link to="edit">Edit Profile</Link>
                </div>
            ) : (
                <div id="profileOptionButtons">
                    {profile.current_user_follows ? (
                        <button onClick={handleUnfollow}>Following</button>
                    ) : (
                        <button onClick={handleFollow}>Follow</button>
                    )}
                    <button>Message</button>
                </div>
            )}

        </section>
    );
}

export default ProfileSummary;