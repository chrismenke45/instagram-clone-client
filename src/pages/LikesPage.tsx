import React from 'react';
import BackBanner from '../components/outer/BackBanner';
import NavFooter from '../components/outer/NavFooter';
import LikesList from '../components/inner/LikesList';
import { useParams } from 'react-router-dom';

const LikesPage: React.FC = () => {
    const { post_id } = useParams()

    return (
        <div id="page">
            <BackBanner header="Likes" backTo={`/posts/${post_id}`}/>
            <LikesList />
            <NavFooter />
        </div>
    );
}

export default LikesPage;