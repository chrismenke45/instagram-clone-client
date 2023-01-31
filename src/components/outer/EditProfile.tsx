import React, { useState, useEffect } from 'react';
import getUserObject from '../../functions/user/getUserObject';
import { useParams } from 'react-router-dom';
import FetchAPI from '../../functions/fetch/FetchAPI';
import { ProfileProp } from '../../models/ProfileProp';
import { useNavigate } from 'react-router-dom';
import { HiXMark, HiCheck } from "react-icons/hi2"


const EditProfile: React.FC = () => {
    let fetcher = new FetchAPI()
    const user = getUserObject()
    const { user_id } = useParams()
    const navigate = useNavigate()
    const [profile, setProfile] = useState<ProfileProp>({
        post_count: 0,
        follower_count: 0,
        followee_count: 0,
        id: 0,
        username: "",
        name: "",
        bio: "",
        profile_picture: "",
        current_user_follows: false
    })
    useEffect(() => {
        if (Number(user_id) === user.user_id) {
            fetcher.fetchData(`users/${user_id}`, "GET", user.jwt)
                .then(userProfile => {
                    console.log(userProfile)
                    setProfile(userProfile[0])

                })
        } else {
            navigate(`/profile/${user_id}`)
        }

    }, [])

    const logOut = () => {
        localStorage.clear()
        navigate("/login")
    }


    return (
        <main id="editProfile">
            <form>
                <div id='postBanner'>
                    <HiXMark onClick={() => navigate(-1)} className='arrowBack'></HiXMark>
                    <span>Edit Profile</span>
                    <HiCheck></HiCheck>
                </div>
                <img src={profile.profile_picture}></img>
                <input
                    type="text"
                    value={profile.username}
                    placeholder="Username"
                ></input>
                <input
                    type="text"
                    value={profile.name}
                    placeholder="name"
                ></input>
                <textarea
                    value={profile.bio}
                    placeholder="bio (optional)"
                ></textarea>

            </form>
            <button onClick={logOut}>Log out</button>

        </main>
    );
}

export default EditProfile;