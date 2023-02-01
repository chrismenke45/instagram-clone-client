import React, { useState, useEffect, useContext, useRef } from 'react';
import getUserObject from '../../functions/user/getUserObject';
import { useParams } from 'react-router-dom';
import FetchAPI from '../../functions/fetch/FetchAPI';
import { ProfileProp } from '../../models/ProfileProp';
import { useNavigate } from 'react-router-dom';
import { HiXMark, HiCheck } from "react-icons/hi2"
import { BiCheck} from "react-icons/bi"

import ImageCropper from '../inner/ImageCropper';
import ImageCropperContext from '../../stateManagement/contexts/ImageCropperContext';
import imageCropperActions from '../../stateManagement/actions/imageCropperActions';

const EditProfile: React.FC = () => {
    let fetcher = new FetchAPI()
    const { imageCropperState, imageCropperDispatch } = useContext(ImageCropperContext)
    const user = getUserObject()
    const { user_id } = useParams()
    const navigate = useNavigate()
    const submitButtonRef = useRef<HTMLButtonElement>(null)
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
        imageCropperDispatch(imageCropperActions.CLOSE_CROPPER())
        if (Number(user_id) === user.user_id) {
            fetcher.fetchData(`users/${user_id}`, "GET", user.jwt)
                .then(userProfile => {
                    setProfile(userProfile[0])

                })
        } else {
            navigate(`/profile/${user_id}`)
        }

    }, [])

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProfile(prev => {
            return { ...prev, bio: e.target.value }
        })
        console.log(profile)
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile(prev => {
            return { ...prev, name: e.target.value }
        })
    }
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile(prev => {
            return { ...prev, username: e.target.value }
        })
    }

    useEffect(() => {
        setProfile(prev => {
            return {...prev, profile_picture: imageCropperState.photoUrl }
        })
    }, [imageCropperState.photoUrl])

    const handleImageSelect = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault()
        imageCropperDispatch(imageCropperActions.OPEN_CROPPER(profile.profile_picture))
    }

    const logOut = () => {
        localStorage.clear()
        navigate("/login")
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetcher.buildFormData([
            ["user[username]", profile.username],
            ["user[name]", profile.name],
            ["user[bio]", profile.bio],
            ["user[profile_picture]", profile.profile_picture],
        ])
        fetcher.fetchData(`users/${user.user_id}`, "PUT", user.jwt)
            .then(data => {
                console.log(data)
                    navigate(`/profile/${user.user_id}`)
            })
            .catch(err => console.error(err))

    }
    const handleClickSubmitRef = () => {
        if (submitButtonRef?.current) {
            submitButtonRef.current.click()
        } 
    }

    return (
        <main id="editProfile">
            <form onSubmit={handleSubmit}>
                <div id='editBanner'>
                    <HiXMark onClick={() => navigate(-1)} className='arrowBack'></HiXMark>
                    <span>Edit Profile</span>
                    <BiCheck className="checkmark" onClick={handleClickSubmitRef}></BiCheck>
                    <button type='submit' hidden={true} ref={submitButtonRef}></button>
                </div>
                <img
                    className='profilePicture'
                    src={profile.profile_picture}
                    onClick={handleImageSelect}
                ></img>
                <div className='formGroup'>
                    <input
                        type="text"
                        minLength={3}
                        maxLength={30}
                        value={profile.username}
                        onChange={handleUsernameChange}
                        placeholder="Username"
                    >
                    </input>
                </div>
                <div className='formGroup'>
                    <input
                        type="text"
                        minLength={3}
                        maxLength={30}
                        value={profile.name}
                        onChange={handleNameChange}
                        placeholder="name"
                    >
                    </input>
                </div>
                <div className='formGroup'>
                    <textarea
                        name="bio"
                        placeholder="Bio (optional)"
                        maxLength={2200}
                        value={profile.bio || ""}
                        onChange={handleBioChange}
                    >
                    </textarea>
                </div>
                {imageCropperState.showImageSelect && <ImageCropper imageFolder={'profilePictures'} ruleOfThirds={false} circularCrop={true} />}
            </form>
            <button id="logOutButton" onClick={logOut}>Log out</button>

        </main>
    );
}

export default EditProfile;