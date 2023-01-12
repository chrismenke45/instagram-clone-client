import React, {useEffect} from 'react';
import fetchData from '../../functions/fetch/fetchData';
import getUserObject from '../../functions/user/getUserObject';
import Feed from '../inner/Feed';


const Home: React.FC = () => {
useEffect(() => {
    const userObject = getUserObject()
    fetchData("posts", "GET", undefined, (userObject ? userObject.jwt : undefined))
    .then(res => res.json())
    .then(posts => console.log(posts))
})

    return (
        <main>
            <Feed />
        </main>
    );
}

export default Home;