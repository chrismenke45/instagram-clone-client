import React from 'react';
import BackBanner from '../components/outer/BackBanner';
import CommentFooter from '../components/outer/CommentFooter';

const CommentsPage: React.FC = () => {


    return (
        <div id="page">
            <BackBanner header="Comments"/>
            <CommentFooter />
        </div>
    );
}

export default CommentsPage;