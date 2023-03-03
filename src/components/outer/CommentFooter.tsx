import React, { useContext, useState } from 'react';
import FetchAPI from '../../functions/fetch/FetchAPI';
import getUserObject from '../../functions/user/getUserObject';
import { useParams } from 'react-router-dom';
import CommentsContext from '../../stateManagement/contexts/CommentsContext';
import commentsActions from '../../stateManagement/actions/commentsActions';
import ImageWithFallback from '../inner/ImageWithFallback';

const CommentFooter: React.FC = () => {
    const user = getUserObject()
    const [comment, setComment] = useState<string>("")
    const { commentsDispatch } = useContext(CommentsContext)
    const { post_id } = useParams()
    let fetcher = new FetchAPI()

    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (comment) {
            commentsDispatch(commentsActions.ADD_COMMENT({
                text: comment,
                username: user.username,
                profile_picture: user.profile_picture,
                id: 0,
                user_id: user.user_id,
                created_at: (new Date()).toISOString()
            }))
            fetcher.buildFormData([
                ["comment[text]", comment],
            ])
            setComment("")
            fetcher.fetchData(`posts/${post_id}/comments`, "POST", user.jwt)
                .then(newComment => {
                    console.log(newComment)
                    commentsDispatch(commentsActions.REMOVE_COMMENT(0))
                    commentsDispatch(commentsActions.ADD_COMMENT({
                        text: newComment.text,
                        username: user.username,
                        profile_picture: user.profile_picture,
                        id: newComment.id,
                        user_id: user.user_id,
                        created_at: newComment.created_at
                    }))
                })
                .catch(err => {
                    commentsDispatch(commentsActions.REMOVE_COMMENT(0))
                })
        }

    }
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value)
    }

    return (
        <footer id="commentFooter">
            <form onSubmit={handleCommentSubmit}>
                <ImageWithFallback src={user.profile_picture} profilePicture={true}></ImageWithFallback>
                <input type="text" onChange={handleCommentChange} value={comment} placeholder='Add a comment...'></input>
                <button type='submit'>Post</button>
            </form>
        </footer>
    );
}

export default CommentFooter;