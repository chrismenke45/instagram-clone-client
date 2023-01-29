import React from 'react';
import BackBanner from '../components/outer/BackBanner';
import FollowsList from '../components/inner/FollowsList';

interface Props {
    title: string;
}
const FollowPage: React.FC<Props> = (props) => {
    const { title } = props
    return (
        <div id="page">
            <BackBanner header={title} />
            <FollowsList followType={title} />
        </div>
    );
}

export default FollowPage;