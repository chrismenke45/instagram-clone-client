import React from 'react';
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import ImageWithFallback from '../inner/ImageWithFallback';

interface Props {
    header: string;
    img?: string;
    subHeader?: string;
    headerLink?: string;
}

const BackBanner: React.FC<Props> = (props) => {
    const { header, img, subHeader, headerLink } = props
    const navigate = useNavigate()

    return (
        <header id="backBanner">
            <FaArrowLeft id="backArrow" onClick={() => navigate(-1)} className='arrowBack'></FaArrowLeft>
            {img && subHeader ?
                <div id='backBannerUser'>
                    <ImageWithFallback src={img} classes="smallProfilePic" profilePicture={true}></ImageWithFallback>
                    <Link to={headerLink || "/messages"}>
                        <h1>{header}</h1>
                        <h2>{subHeader}</h2>
                    </Link>
                </div>
                :
                <h1>{header}</h1>
            }

        </header>
    );
}

export default BackBanner;