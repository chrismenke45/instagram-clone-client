import React from 'react';
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

interface Props {
    header: string;
}

const BackBanner: React.FC<Props> = (props) => {
const { header } = props
const navigate = useNavigate()

    return (
        <header id="backBanner">
            <FaArrowLeft id="backArrow" onClick={() => navigate(-1)}className='arrowNextBack'></FaArrowLeft>
            <h1>{header}</h1>
        </header>
    );
}

export default BackBanner;