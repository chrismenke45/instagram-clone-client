import React from 'react';

interface Props {
    src: string;
    customFallback?: string;
    profilePicture?: boolean;
    post?: boolean;
    classes?: string
    ids?: string
}

const ImageWithFallback: React.FC<Props> = (props) => {
    const { src, customFallback, profilePicture, post, classes, ids } = props
    let fallback: string
    if (customFallback) {
        fallback = customFallback
    } else if (profilePicture) {
        fallback = process.env.REACT_APP_DEFAULT_PROFILE_PICTURE || ""
    } else if (post) {
        fallback = process.env.REACT_APP_NOT_FOUND_PICTURE || ""
    } else {
        fallback = process.env.REACT_APP_DEFAULT_PROFILE_PICTURE || ""
    }
    return (
        <img
            id={ids}
            className={classes}
            src={src || ""}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = fallback;
            }}
            alt="">
        </img>
    );
}

export default ImageWithFallback;