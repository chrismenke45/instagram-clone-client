import React, { useState } from 'react';
import { MdGridOn } from "react-icons/md"
import { RxStack } from "react-icons/rx"
import Feed from '../inner/Feed';
import Grid from '../inner/Grid';
const ProfilePosts: React.FC = () => {
    const [feedOrGrid, setFeedOrGrid] = useState(true) //true for Grid display, false for feed display 

    const handleGridClick = () => {
        setFeedOrGrid(true)
    }
    const handleFeedClick = () => {
        setFeedOrGrid(false)
    }

    const tiles = [
        {picture_url: "square.jpeg"},
        {picture_url: "square.jpeg"},
        {picture_url: "square.jpeg"},
        {picture_url: "square.jpeg"},
        {picture_url: "square.jpeg"},
        {picture_url: "square.jpeg"},
        {picture_url: "square.jpeg"},
    ]

    return (
        <section id="profilePosts">
            <div id="profilePostsSelectors">
                <MdGridOn
                    className={`${feedOrGrid ? "selectedProfilePostsSelector" : null} profilePostsSelector`}
                    onClick={handleGridClick}
                />
                <RxStack
                    className={`${feedOrGrid ? null : "selectedProfilePostsSelector"} profilePostsSelector`}
                    onClick={handleFeedClick}
                />
            </div>
            {feedOrGrid ?
                (
                    <Feed />
                )
                :
                (
                    <Grid />
                )}
        </section>
    );
}

export default ProfilePosts;