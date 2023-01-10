import React, { useState } from 'react';
import { Link } from "react-router-dom"
import buildFormData from '../../functions/fetch/buildFormData';
import fetchData from '../../functions/fetch/fetchData';
import jwt_decode from "jwt-decode";
import setUserJwt from '../../functions/user/setUserJwt';

const RegisterForm: React.FC = () => {
    const [registerInfo, setRegisterInfo] = useState({ username: "", name: "", password: "", bio: "" })

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data = buildFormData([
            ["user[username]", registerInfo.username], 
            ["user[password]", registerInfo.password],
            ["user[name]", registerInfo.name], 
            ["user[bio]", registerInfo.bio], 
            ["user[profile_picture]", "https://example.com"],
        ])
        fetchData("/users", "POST", data)
            .then(data => {
                console.log(data)
                if (data.t) {
                    let decoded = jwt_decode(data.t)
                    setUserJwt(data.t)
                    let currentDate = new Date()
                    let secondsSinceEpoch = Math.round(currentDate.getTime() / 1000)
                    console.log(secondsSinceEpoch, decoded)
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
                        placeholder="name"
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
                <button className="openerOption" type='submit'>Register</button>
            </form>
            <span>Already have an account?</span>
            <Link to="/login" className='openerOption'>Login</Link>
            <span>or</span>
            <button className='openerOption'>Login as Guest</button>

        </main>
    );
}

export default RegisterForm;