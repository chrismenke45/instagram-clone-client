import React from 'react';
import BackBanner from '../components/outer/BackBanner';
import CommentsList from '../components/inner/CommentsList';
import CommentFooter from '../components/outer/CommentFooter';

const CommentsPage: React.FC = () => {

    const comments = [{
        text: "kachow",
        username: "boby43",
        profile_picture: "square.jpeg",
        id: 1
    },
    {
        text: "yeehaw",
        username: "cm45",
        profile_picture: "square.jpeg",
        id: 2
    }
    ]
    return (
        <div id="page">
            <BackBanner header="Comments"/>
            <CommentsList comments={comments} />
            <CommentFooter />
        </div>
    );
}

export default CommentsPage;