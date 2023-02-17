import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import setUserJwt from '../../functions/user/setUserJwt';
import FetchAPI from '../../functions/fetch/FetchAPI';

const LoginForm: React.FC = () => {
    const [loginInfo, setLoginInfo] = useState({ username: "", password: "" })
    const navigate = useNavigate()
    let fetcher = new FetchAPI()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setLoginInfo(prev => {
            return {
                ...prev,
                [name]: value.trim()
            }
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetcher.buildFormData([
            ["auth[username]", loginInfo.username.toLowerCase().trim()], 
            ["auth[password]", loginInfo.password.trim()]
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
                        onChange={handleChange}>
                    </input>
                </div>
                <div className='formGroup'>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        minLength={6}
                        maxLength={18}
                        value={loginInfo.password}
                        onChange={handleChange}>
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