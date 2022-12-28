import React from 'react';
import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

interface Props {
    header: string;
}

const BackBanner: React.FC<Props> = (props) => {
const { header } = props

    return (
        <header id="backBanner">
            <Link to="/"><FaArrowLeft id="backArrow"></FaArrowLeft></Link>
            <h1>{header}</h1>
        </header>
    );
}

export default BackBanner;