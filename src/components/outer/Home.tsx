import React, {useEffect} from 'react';
import fetchData from '../../functions/fetch/fetchData';
import getUserObject from '../../functions/user/getUserObject';
import Feed from '../inner/Feed';


const Home: React.FC = () => {
useEffect(() => {
    const userObject = getUserObject()
    fetchData("posts", "GET", undefined, (userObject ? userObject.jwt : undefined))
    // below is to test with out of date jwt
    // fetchData("posts", "GET", undefined, 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imd1ZXN0IiwidXNlcl9pZCI6NiwiZXhwIjoxNjczNTQ0OTcyfQ.QSDoDI2RORSvNnHZ7XP8cV4oQkv1NywgF_8O0i7pxng')
    
    .then(posts => console.log(posts))
})

    return (
        <main>
            <Feed />
        </main>
    );
}

export default Home;