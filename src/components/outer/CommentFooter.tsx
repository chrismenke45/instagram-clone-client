import React from 'react';

const CommentFooter: React.FC = () => {
    const user = {
        id: 1,
        profile_picture: "square.jpeg"
    }
    
    return (
        <footer id="commentFooter">
            <form>
                <img src={user.profile_picture}></img>
                <input type="text" placeholder='Add a comment...'></input>
                <button type='submit'>Post</button>
            </form>
        </footer>
    );
}

export default CommentFooter;