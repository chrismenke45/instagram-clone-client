import React from 'react';
import BackBanner from '../components/outer/BackBanner';
import { useParams } from 'react-router-dom';
import FollowsList from '../components/inner/FollowsList';

interface Props {
    title: string;
}
const FollowPage: React.FC<Props> = (props) => {
    const { title } = props
    const { user_id } = useParams() 
    return (
        <div id="page">
            <BackBanner header={title} backTo={`/profile/${user_id}`}/>
            <FollowsList followType={title} />
        </div>
    );
}

export default FollowPage;