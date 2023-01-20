import React from 'react';

interface Props {
    username: string
}
const ProfileBanner: React.FC<Props> = (props) => {
const { username } = props

    return (
        <header id="banner">
            <h1>{username}</h1>
        </header>
    );
}

export default ProfileBanner;