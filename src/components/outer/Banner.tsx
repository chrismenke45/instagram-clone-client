import React from 'react';
import { HiOutlinePaperAirplane } from "react-icons/hi"
import { Link } from 'react-router-dom';

const Banner: React.FC = () => {


    return (
        <header id="banner">
            <div></div>
            <h1>Instagram</h1>
            <Link to="/messages">
                <HiOutlinePaperAirplane id="messageIcon">
                </HiOutlinePaperAirplane>
            </Link>

        </header>
    );
}

export default Banner;