import React from 'react';
import BackBanner from '../components/outer/BackBanner';
import CommentsList from '../components/inner/CommentsList';
import CommentFooter from '../components/outer/CommentFooter';
import { CommentProp } from '../models/CommentProp';

const CommentsPage: React.FC = () => {

    return (
        <div id="page">
            <BackBanner header="Comments"/>
            <CommentsList />
            <CommentFooter />
        </div>
    );
}

export default CommentsPage;