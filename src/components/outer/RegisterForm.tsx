import React, { useState } from 'react';
import { Link } from "react-router-dom"


import FetchAPI from '../../functions/fetch/FetchAPI';
import setUserJwt from '../../functions/user/setUserJwt';
import { useNavigate } from 'react-router-dom'; 

const RegisterForm: React.FC = () => {
    const [registerInfo, setRegisterInfo] = useState({ username: "", name: "", password: "" })
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    let fetcher = new FetchAPI()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setRegisterInfo(prev => {
            return {
                ...prev,
                [name]: value.trim()
            }
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetcher.buildFormData([
            ["user[username]", registerInfo.username.toLowerCase().trim()],
            ["user[password]", registerInfo.password.trim()],
            ["user[name]", registerInfo.name.trim()],
            ["user[bio]", ""],
            ["user[profile_picture]", process.env.REACT_APP_DEFAULT_PROFILE_PICTURE || ""],
        ])
        fetcher.fetchData("users", "POST")
            .then(res => {
                if (res.t) {
                    setUserJwt(res.t)
                    navigate('/')
                } else {
                    setErrorMessage(res.error ? res.error : "There was an error. Please try again")
                    setLoading(false)
                }
            })
            .catch(err => {
                setErrorMessage("There was an error. Please try again")
                setLoading(false)
            })
    }
    const handleGuestLogin = () => {
        fetcher.loginAsGuest()
        .then(res => {
            if (res.t) {
                setUserJwt(res.t)
                navigate('/')
            } else {
                setErrorMessage(res.error ? res.error : "There was an error. Please try again")
                setLoading(false)
            }
        })
        .catch(err => {
            setErrorMessage("There was an error. Please try again")
            setLoading(false)
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
                        onChange={handleChange}>
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
                        value={registerInfo.password}
                        onChange={handleChange}>
                    </input>
                </div>
                {errorMessage && <p className='error'>{errorMessage}</p>}
                <button className="openerOption" type='submit'>Register</button>
            </form>
            <span>Already have an account?</span>
            <Link to="/login" className='openerOption'>Login</Link>
            <span>or</span>
            <button onClick={handleGuestLogin} className='openerOption'>Login as Guest</button>

        </main>
    );
}

export default RegisterForm;