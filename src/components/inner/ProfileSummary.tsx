import React, {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';

const ProfileSummary: React.FC = () => {
    let fetcher = new FetchAPI
    const { user_id } = useParams()
    const profile = {
        post_count: 3,
        follower_count: 5,
        following_count: 6,
        id: 6,
        username: "bobbymge",
        name: "Bobby",
        bio: "I'm bobby mcGee",
        profile_picture: "square.jpeg"
    }
    useEffect(() => {
        const userObject = getUserObject()
        fetcher.fetchData(`users/${user_id}`, "GET", userObject.jwt)
        .then(profile => {
            console.log(profile)
        })
    }, [])

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