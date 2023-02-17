import React, { useState, useEffect, useContext, useRef } from 'react';
import getUserObject from '../../functions/user/getUserObject';
import { useParams } from 'react-router-dom';
import FetchAPI from '../../functions/fetch/FetchAPI';
import { ProfileProp } from '../../models/ProfileProp';
import { useNavigate } from 'react-router-dom';
import { HiXMark } from "react-icons/hi2"
import { BiCheck } from "react-icons/bi"

import ImageCropper from '../inner/ImageCropper';
import ImageCropperContext from '../../stateManagement/contexts/ImageCropperContext';
import imageCropperActions from '../../stateManagement/actions/imageCropperActions';
import deleteUser from '../../functions/user/deleteUser';

const EditProfile: React.FC = () => {
    let fetcher = new FetchAPI()
    const { imageCropperState, imageCropperDispatch } = useContext(ImageCropperContext)
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)
    const [showNoGuestModify, setShowNoGuestModify] = useState<boolean>(false)
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
                .catch(err => {
                    console.error(err)
                })
                
        } else {
            navigate(`/profile/${user_id}`)
        }

    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setProfile(prev => {
            return {
                ...prev,
                [name]: name === "bio" ? value : value.trim()
            }
        })
    }

    const toggleConfirmDelete = () => {
        if (user.username !== "guest") {
            setShowConfirmDelete(prev => !prev)
        } else {
            setShowNoGuestModify(true)
        }
    }

    useEffect(() => {
        setProfile(prev => {
            return { ...prev, profile_picture: imageCropperState.photoUrl }
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
    const deleteAccout = () => {
        if (user.username !== "guest") {
            deleteUser(profile.id)
        } else {
            setShowNoGuestModify(true)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (user.username !== "guest") {
            fetcher.buildFormData([
                ["user[username]", profile.username.toLowerCase().trim()],
                ["user[name]", profile.name.trim()],
                ["user[bio]", profile.bio.trim()],
                ["user[profile_picture]", imageCropperState.photoUrl],
            ])
            fetcher.fetchData(`users/${user.user_id}`, "PUT", user.jwt)
                .then(data => {
                    navigate(`/profile/${user.user_id}`)
                })
                .catch(err => console.error(err))

        } else {
            setShowNoGuestModify(true)
        }
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
                {showNoGuestModify &&
                    <div>
                        <p className='warning'>Guest Profile cannot be modified or deleted</p>
                    </div>}
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
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                        placeholder="Username"
                    >
                    </input>
                </div>
                <div className='formGroup'>
                    <input
                        type="text"
                        minLength={3}
                        maxLength={30}
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
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
                        onChange={handleChange}
                    >
                    </textarea>
                </div>
                {imageCropperState.showImageSelect && <ImageCropper imageFolder={'profilePictures'} ruleOfThirds={false} circularCrop={true} />}
            </form>
            <button id="logOutButton" onClick={logOut}>Log out</button>
            <button id="deleteUser" onClick={toggleConfirmDelete}>Delete Account</button>
            {showConfirmDelete &&
                <div id="confirmDeleteBox">
                    <p>Are you sure you'd like to delete your account? Once deleted, it can't be recovered</p>
                    <button id="deleteUser" onClick={deleteAccout}>Delete Account</button>
                    <button onClick={toggleConfirmDelete}>Back</button>
                </div>
            }
        </main>
    );
}

export default EditProfile;