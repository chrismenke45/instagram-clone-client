import React from 'react';
import BackBanner from '../components/outer/BackBanner';
import { useNavigate } from 'react-router-dom';
const EditProfilePage: React.FC = () => {
    const navigate = useNavigate()

const logOut = () => {
    localStorage.clear()
    navigate("/login")
}
    return (
        <div id="page">
            <BackBanner header='Edit ' />
            <button onClick={logOut}>Log out</button>
        </div>
    );
}

export default EditProfilePage;