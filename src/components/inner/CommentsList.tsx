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

    // const commentss = [{
    //     text: "kachow",
    //     username: "boby43",
    //     profile_picture: "square.jpeg",
    //     id: 1,
    //     created_at: "2022-12-27T00:40:18.310Z"
    // },
    // {
    //     text: "yeehaw asdjkflajsdfhl kjasdhfkljasdfh kjhsdlfkjahs kjasdhfljakhsl kjshdafljkas kjasdhflkjas kajsdhflja ashdflkja akjdshfljsadf kdjshflas sdfg  sdfg sd g sdfg sdf gs dfg sdf g sdfg sdf gsd fg sdf gsd fg dsfg df gdfs h erv fdh df ghdf gh fdgh dfg h fdgh df hf h dfghdf gh dfgh dfg hf ghd chris",
    //     username: "cm45",
    //     profile_picture: "square.jpeg",
    //     id: 2,
    //     created_at: "2022-12-27T00:40:18.310Z"
    // }
    // ]
    // for (let i = 0; i < 16; i++) {
    //     let newt:any = commentss[0];
    //     newt.id = i + 3
    //     comments.push(newt)
    // }

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