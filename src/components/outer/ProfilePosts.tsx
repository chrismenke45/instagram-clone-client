import React, { useState } from 'react';
import { MdGridOn } from "react-icons/md"
import { RxStack } from "react-icons/rx"
import Feed from '../inner/Feed';
import Grid from '../inner/Grid';
const ProfilePosts: React.FC<{profileId: number}> = (props) => {
    const { profileId } = props
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
                    <Grid gridPath={`posts?user=${profileId}&preview=true`}/>
                )
                :
                (
                    <Feed feedPath={`posts?user=${profileId}`}/>
                )}
        </section>
    );
}

export default ProfilePosts;