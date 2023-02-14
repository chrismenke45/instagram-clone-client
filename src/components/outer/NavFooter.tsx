import React, { useContext }  from 'react';
import { Link } from 'react-router-dom'
import { AiFillHome, AiFillInstagram } from "react-icons/ai"
import { FiSearch } from "react-icons/fi"
import { FaRegHeart } from "react-icons/fa"
import { BsFillPersonFill } from "react-icons/bs"
import getUserObject from '../../functions/user/getUserObject';

import ReloadContext from '../../stateManagement/contexts/reloadContext';
import reloadActions from '../../stateManagement/actions/reloadActions';


const NavFooter: React.FC = () => {
    const user = getUserObject()

    const { reloadDispatch } = useContext(ReloadContext)

    const handleReloadIncrement = () => {
        reloadDispatch(reloadActions.INCREMENT())
    }

    return (
        <footer id="navFooter">
            <nav>
                <ul>
                    <li>
                        <Link to="/" onClick={handleReloadIncrement}>
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
                        <Link to={`/profile/${user.user_id}`} onClick={handleReloadIncrement}>
                            <BsFillPersonFill></BsFillPersonFill>
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

export default NavFooter;