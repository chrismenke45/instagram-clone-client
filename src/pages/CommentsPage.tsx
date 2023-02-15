import React, { useReducer } from 'react';
import BackBanner from '../components/outer/BackBanner';
import CommentsList from '../components/inner/CommentsList';
import CommentFooter from '../components/outer/CommentFooter';

import commentsReducer from '../stateManagement/reducers/commentsReducer';
import CommentsContext from '../stateManagement/contexts/CommentsContext';


const CommentsPage: React.FC = () => {

    const [commentsState, commentsDispatch] = useReducer(
        commentsReducer,
        {
            comments: []
        }
    )

    return (
        <div id="page">
            <BackBanner header="Comments" />
            <CommentsContext.Provider value={{ commentsState, commentsDispatch }}>
                <CommentsList />
                <CommentFooter />
            </CommentsContext.Provider>

        </div>
    );
}

export default CommentsPage;