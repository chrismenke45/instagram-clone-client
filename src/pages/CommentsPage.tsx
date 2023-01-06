import React from 'react';
import BackBanner from '../components/outer/BackBanner';
import CommentsList from '../components/inner/CommentsList';
import CommentFooter from '../components/outer/CommentFooter';
import { CommentProp } from '../models/CommentProp';

const CommentsPage: React.FC = () => {

    const comments = [{
        text: "kachow",
        username: "boby43",
        profile_picture: "square.jpeg",
        id: 1,
        created_at: "2022-12-27T00:40:18.310Z"
    },
    {
        text: "yeehaw asdjkflajsdfhl kjasdhfkljasdfh kjhsdlfkjahs kjasdhfljakhsl kjshdafljkas kjasdhflkjas kajsdhflja ashdflkja akjdshfljsadf kdjshflas sdfg  sdfg sd g sdfg sdf gs dfg sdf g sdfg sdf gsd fg sdf gsd fg dsfg df gdfs h erv fdh df ghdf gh fdgh dfg h fdgh df hf h dfghdf gh dfgh dfg hf ghd chris",
        username: "cm45",
        profile_picture: "square.jpeg",
        id: 2,
        created_at: "2022-12-27T00:40:18.310Z"
    }
    ]
    for (let i = 0; i < 16; i++) {
        let newt:any = comments[0];
        newt.id = i + 3
        comments.push(newt)
    }
    return (
        <div id="page">
            <BackBanner header="Comments"/>
            <CommentsList comments={comments} />
            <CommentFooter />
        </div>
    );
}

export default CommentsPage;