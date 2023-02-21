import React from 'react';
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

interface Props {
    header: string;
    img?: string;
    subHeader?: string;
}

const BackBanner: React.FC<Props> = (props) => {
    const { header, img, subHeader } = props
    const navigate = useNavigate()

    return (
        <header id="backBanner">
            <FaArrowLeft id="backArrow" onClick={() => navigate(-1)} className='arrowBack'></FaArrowLeft>
            {img && subHeader ?
                <div id='backBannerUser'>
                    <img src={img} className="smallProfilePic"></img>
                    <div>
                        <h1>{header}</h1>
                        <h2>{subHeader}</h2>
                    </div>
                </div>
                :
                <h1>{header}</h1>
            }

        </header>
    );
}

export default BackBanner;