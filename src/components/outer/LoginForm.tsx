import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import setUserJwt from '../../functions/user/setUserJwt';
import FetchAPI from '../../functions/fetch/FetchAPI';

const LoginForm: React.FC = () => {
    const [loginInfo, setLoginInfo] = useState({ username: "", password: "" })
    const navigate = useNavigate()
    let fetcher = new FetchAPI

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo(prev => {
            return { ...prev, password: e.target.value }
        })
    }
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo(prev => {
            return { ...prev, username: e.target.value }
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetcher.buildFormData([
            ["auth[username]", loginInfo.username], 
            ["auth[password]", loginInfo.password]
        ])
        fetcher.fetchData("/auth/login", "POST")
            .then(data => {
                if (data.t) {
                    setUserJwt(data.t)
                    navigate('/')
                }
            })

    }

    const handleGuestLogin = () => {
        fetcher.loginAsGuest()
        .then(data => {
            if (data.t) {
                setUserJwt(data.t)
                navigate('/')
            }
        })
    }
    return (
        <main id="loginOrSignUp">
            <h1>Instagram</h1>
            <form onSubmit={handleSubmit}>
                <div className='formGroup'>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        minLength={3}
                        maxLength={30}
                        value={loginInfo.username}
                        onChange={handleUsernameChange}>
                    </input>
                </div>
                <div className='formGroup'>
                    <input
                        type="password"
                        name="password"
                        placeholder="Passowrd"
                        minLength={6}
                        maxLength={18}
                        value={loginInfo.password}
                        onChange={handlePasswordChange}>
                    </input>
                </div>
                <button className="openerOption" type='submit'>Login</button>
            </form>
            <span>Don't have an account?</span>
            <Link to="/register" className='openerOption'>Sign up</Link>
            <span>or</span>
            <button onClick={handleGuestLogin} className='openerOption'>Login as Guest</button>

        </main>
    );
}

export default LoginForm;