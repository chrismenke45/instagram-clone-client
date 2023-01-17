import React, { useEffect, useState } from 'react';
import CommentInList from './CommentInList';
import { CommentProp } from '../../models/CommentProp';
import fetchData from '../../functions/fetch/fetchData';
import { useParams } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';


const CommentsList: React.FC = () => {
    const { post_id } = useParams()
    const user = getUserObject()
    const [comments, setComments] = useState<CommentProp[]>([])

    useEffect(() => {
        fetchData(`posts/${post_id}/comments`, "GET", undefined, (user.jwt ? user.jwt : undefined))
            .then(data => {
                console.log(data)
                setComments(data)
            })
    }, [])

    return (
        <ul id="commentsList" className='flexVertCenter'>

            {
                comments.length === 0 ?
                    (
                        <div></div>
                    )
                    :
                    (
                        comments.map(comment => {
                            console.log(comment)
                            return <CommentInList key={comment.id} comment={comment} />
                        })
                    )}
        </ul>
    );
}

export default CommentsList;