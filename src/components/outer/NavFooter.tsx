import React from 'react';
import { Link } from 'react-router-dom'
import { AiFillHome, AiFillInstagram } from "react-icons/ai"
import { FiSearch } from "react-icons/fi"
import { FaRegHeart } from "react-icons/fa"
import { BsFillPersonFill } from "react-icons/bs"

const NavFooter: React.FC = () => {


    return (
        <footer id="navFooter">
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            <AiFillHome></AiFillHome>
                        </Link>
                    </li>
                    <li>
                        <Link to="/search">
                            <FiSearch></FiSearch>
                        </Link>
                    </li>
                    <li>
                        <Link to="/post">
                            <AiFillInstagram></AiFillInstagram>
                        </Link>
                    </li>
                    <li>
                        <Link to="/media">
                            <FaRegHeart></FaRegHeart>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile">
                            <BsFillPersonFill></BsFillPersonFill>
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

export default NavFooter;