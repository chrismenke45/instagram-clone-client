import React from 'react';

interface Props {
    username: string
}
const ProfileBanner: React.FC<Props> = (props) => {
const { username } = props

    return (
        <header id="banner">
            <div></div>
            <h1>{username}</h1>
            <div></div>
        </header>
    );
}

export default ProfileBanner;