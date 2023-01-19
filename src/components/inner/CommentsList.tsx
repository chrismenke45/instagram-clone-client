import React, { useEffect, useState } from 'react';
import CommentInList from './CommentInList';
import { CommentProp } from '../../models/CommentProp';
import { useParams } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';


const CommentsList: React.FC = () => {
    const { post_id } = useParams()
    const user = getUserObject()
    let fetcher = new FetchAPI
    const [comments, setComments] = useState<CommentProp[]>([])

    useEffect(() => {
        fetcher.fetchData(`posts/${post_id}/comments`, "GET", user.jwt)
            .then(data => {
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
                            return <CommentInList key={comment.id} comment={comment} />
                        })
                    )}
        </ul>
    );
}

export default CommentsList;