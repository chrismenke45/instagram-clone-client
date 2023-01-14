import React, { useState } from 'react';
import fetchData from '../../functions/fetch/fetchData';
import buildFormData from '../../functions/fetch/buildFormData';
import getUserObject from '../../functions/user/getUserObject';
import { useParams } from 'react-router-dom';

const CommentFooter: React.FC = () => {
    const user = getUserObject()
    const [comment, setComment] = useState<string>("")
    const { post_id }= useParams()

    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (comment) {
            let data = buildFormData([
                ["comment[text]", comment],
            ])
            fetchData(`posts/${post_id}/comments`, "POST", data, (user.jwt ? user.jwt : undefined))
                .then(data => {
                    console.log(data)
                })
        }
        
        console.log(getUserObject())
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