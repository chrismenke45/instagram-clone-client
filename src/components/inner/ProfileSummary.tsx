import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProfileProp } from '../../models/ProfileProp';

const ProfileSummary: React.FC<{profile: ProfileProp}> = (props) => {
    const { profile } = props
    

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
                    <span className='profileCountNumber'>{profile.following_count || 0}</span>
                    <span className='profileCountSubject'>following</span>
                </Link>
            </div>
            <span id="profileName">{profile.name}</span>
            <p id="profileBio">{profile.bio}</p>
            <div id="profileOptionButtons">
                <button>Follow</button>
                <button>Message</button>
            </div>
        </section>
    );
}

export default ProfileSummary;