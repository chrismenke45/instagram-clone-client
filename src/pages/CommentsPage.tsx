import React from 'react';
import BackBanner from '../components/outer/BackBanner';
import CommentsList from '../components/inner/CommentsList';
import CommentFooter from '../components/outer/CommentFooter';
import { CommentProp } from '../models/CommentProp';
import { useParams } from 'react-router-dom';

const CommentsPage: React.FC = () => {
    const { post_id } = useParams()
    return (
        <div id="page">
            <BackBanner header="Comments" backTo={`/posts/${post_id}`}/>
            <CommentsList />
            <CommentFooter />
        </div>
    );
}

export default CommentsPage;