import React from 'react';
import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

interface Props {
    header: string;
    backTo: string;
}

const BackBanner: React.FC<Props> = (props) => {
const { header, backTo } = props

    return (
        <header id="backBanner">
            <Link to={backTo}><FaArrowLeft id="backArrow" className='arrowNextBack'></FaArrowLeft></Link>
            <h1>{header}</h1>
        </header>
    );
}

export default BackBanner;