import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import ImageCropper from '../inner/ImageCropper';

import buildFormData from '../../functions/fetch/buildFormData';
import fetchData from '../../functions/fetch/fetchData';
import jwt_decode from "jwt-decode";
import setUserJwt from '../../functions/user/setUserJwt';
import deleteFile from '../../firebase/deleteFile';
import loginAsGuest from '../../functions/fetch/loginAsGuest';

const RegisterForm: React.FC = () => {
    const [registerInfo, setRegisterInfo] = useState({ username: "", name: "", password: "", bio: "", profile_picture: "" })
    const [showImageSelect, setShowImageSelect] = useState(false)
    const [photoUrl, setPhotoUrl] = useState("")
    const [userCreated, setUserCreated] = useState(false)

    useEffect(() => {
        setRegisterInfo(prev => {
            return {...prev, profile_picture: photoUrl }
        })
    }, [photoUrl])

    const deleteUploadedPhoto = () => {
        if (registerInfo.profile_picture !== "") {
            deleteFile(registerInfo.profile_picture)
                .then(res => console.log(res))
                .catch(err => console.error(err))
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterInfo(prev => {
            return { ...prev, password: e.target.value }
        })
    }
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterInfo(prev => {
            return { ...prev, username: e.target.value }
        })
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterInfo(prev => {
            return { ...prev, name: e.target.value }
        })
    }
    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRegisterInfo(prev => {
            return { ...prev, bio: e.target.value }
        })
    }
    const handleImageSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!showImageSelect && registerInfo.profile_picture !== "") {
            deleteFile(registerInfo.profile_picture).then(res => {
                console.log(res)
            })
        }
        setShowImageSelect(prev => !prev)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data = buildFormData([
            ["user[username]", registerInfo.username],
            ["user[password]", registerInfo.password],
            ["user[name]", registerInfo.name],
            ["user[bio]", registerInfo.bio],
            ["user[profile_picture]", registerInfo.profile_picture],
        ])
        fetchData("users", "POST", data)
            .then(data => {
                if (data.t) {
                    setUserJwt(data.t)
                    setUserCreated(true)
                }
            })

    }
    return (
        <main id="register">
            <h1>Instagram</h1>
            <form onSubmit={handleSubmit}>
                <div className='formGroup'>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        minLength={3}
                        maxLength={30}
                        value={registerInfo.username}
                        onChange={handleUsernameChange}>
                    </input>
                </div>
                <div className='formGroup'>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        minLength={3}
                        maxLength={30}
                        value={registerInfo.name}
                        onChange={handleNameChange}>
                    </input>
                </div>
                <div className='formGroup'>
                    <input
                        type="password"
                        name="password"
                        placeholder="Passowrd"
                        minLength={6}
                        maxLength={18}
                        value={registerInfo.password}
                        onChange={handlePasswordChange}>
                    </input>
                </div>
                <div className='formGroup'>
                    <textarea
                        name="bio"
                        placeholder="Bio (optional)"
                        maxLength={2200}
                        value={registerInfo.bio}
                        onChange={handleBioChange}>
                    </textarea>
                </div>
                <button className='openerOption' onClick={handleImageSelect}>{registerInfo.profile_picture ? "Change Profile Picture" : "Select Image" }</button>
                {showImageSelect && <ImageCropper imageFolder={'profilePictures'} ruleOfThirds={false} circularCrop={true} setPhotoUrl={setPhotoUrl} setShowImageSelect={setShowImageSelect} />}
                <button className="openerOption" type='submit'>Register</button>
            </form>
            <span>Already have an account?</span>
            <Link to="/login" onClick={deleteUploadedPhoto} className='openerOption'>Login</Link>
            <span>or</span>
            <button onClick={() => {deleteUploadedPhoto(); loginAsGuest()}} className='openerOption'>Login as Guest</button>

        </main>
    );
}

export default RegisterForm;