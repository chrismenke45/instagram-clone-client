import React, { useState } from 'react';
import FetchAPI from '../../functions/fetch/FetchAPI';
import getUserObject from '../../functions/user/getUserObject';
import { useParams } from 'react-router-dom';

const CommentFooter: React.FC = () => {
    const user = getUserObject()
    const [comment, setComment] = useState<string>("")
    const { post_id }= useParams()
    let fetcher = new FetchAPI

    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (comment) {
            fetcher.buildFormData([
                ["comment[text]", comment],
            ])    
            fetcher.fetchData(`posts/${post_id}/comments`, "POST", user.jwt)
            .then(data => {
                    console.log(data)
                })
        }
        
    }
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value)
    }
    
    return (
        <footer id="commentFooter">
            <form onSubmit={handleCommentSubmit}>
                <img src={user.profile_picture}></img>
                <input type="text" onChange={handleCommentChange} value={comment} placeholder='Add a comment...'></input>
                <button type='submit'>Post</button>
            </form>
        </footer>
    );
}

export default CommentFooter;