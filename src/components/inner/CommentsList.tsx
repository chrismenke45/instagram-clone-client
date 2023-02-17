import React, { useContext, useEffect } from 'react';
import CommentInList from './CommentInList';
import { useParams } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';
import commentsActions from '../../stateManagement/actions/commentsActions';
import CommentsContext from '../../stateManagement/contexts/CommentsContext';


const CommentsList: React.FC = () => {
    const { post_id } = useParams()
    const user = getUserObject()
    let fetcher = new FetchAPI()
    const { commentsState, commentsDispatch } = useContext(CommentsContext)

    useEffect(() => {
        fetcher.fetchData(`posts/${post_id}/comments`, "GET", user.jwt)
            .then(data => {
                commentsDispatch(commentsActions.SET_COMMENTS(data))
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return (
        <ul id="commentsList" className='flexVertCenter'>

            {
                commentsState.comments.length === 0 ?
                    (
                        <div></div>
                    )
                    :
                    (
                        commentsState.comments.map(comment => {
                            return <CommentInList key={comment.id} comment={comment} />
                        })
                    )}
        </ul>
    );
}

export default CommentsList;