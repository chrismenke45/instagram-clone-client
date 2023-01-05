import React from 'react';
import CommentInList from './CommentInList';
import { CommentProp } from '../../models/CommentProp';

interface Props {
    comments: CommentProp[];
}

const CommentsList: React.FC<Props> = (props) => {
  const { comments } = props

    return (
        <ul id="commentsList" className='flexVertCenter'>
            {comments.map(comment => {
                return <CommentInList key={comment.id} comment={comment}/>
            })}
        </ul>
    );
}

export default CommentsList;