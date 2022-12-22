import React from 'react';
import { AiFillHome, AiFillInstagram } from "react-icons/ai"
import { FiSearch } from "react-icons/fi"
import { FaRegHeart } from "react-icons/fa"
import { BsFillPersonFill } from "react-icons/bs"

const NavFooter: React.FC = () => {


    return (
        <footer>
            <nav>
                <ul>
                    <li>
                        <AiFillHome></AiFillHome>
                    </li>
                    <li>
                        <FiSearch></FiSearch>
                    </li>
                    <li>
                        <AiFillInstagram></AiFillInstagram>
                    </li>
                    <li>
                        <FaRegHeart></FaRegHeart>
                    </li>
                    <li>
                        <BsFillPersonFill></BsFillPersonFill>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

export default NavFooter;