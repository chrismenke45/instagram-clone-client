import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import ImageCropper from '../inner/ImageCropper';
import ImageCropperContext from '../../stateManagement/contexts/ImageCropperContext';
import imageCropperActions from '../../stateManagement/actions/imageCropperActions';

import buildFormData from '../../functions/fetch/buildFormData';
import fetchData from '../../functions/fetch/fetchData';
import setUserJwt from '../../functions/user/setUserJwt';
import deleteFile from '../../firebase/deleteFile';
import loginAsGuest from '../../functions/fetch/loginAsGuest';

const RegisterForm: React.FC = () => {
    const [registerInfo, setRegisterInfo] = useState({ username: "", name: "", password: "", bio: "", profile_picture: "" })
    const { imageCropperState, imageCropperDispatch } = useContext(ImageCropperContext)

    useEffect(() => {
        setRegisterInfo(prev => {
            return {...prev, profile_picture: imageCropperState.photoUrl }
        })
    }, [imageCropperState.photoUrl])

    const deleteUploadedPhoto = () => {
        if (registerInfo.profile_picture !== "") {
            deleteFile(registerInfo.profile_picture)
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
        imageCropperDispatch(imageCropperActions.OPEN_CROPPER())
        if (!imageCropperState.showImageSelect && registerInfo.profile_picture !== "") {
            deleteFile(registerInfo.profile_picture)
            .catch(err => {
                console.error(err)
            })
        } 
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
                {imageCropperState.showImageSelect && <ImageCropper imageFolder={'profilePictures'} ruleOfThirds={false} circularCrop={true} />}
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