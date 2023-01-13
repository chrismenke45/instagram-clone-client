import React, {useEffect} from 'react';
import fetchData from '../../functions/fetch/fetchData';
import getUserObject from '../../functions/user/getUserObject';
import Feed from '../inner/Feed';


const Home: React.FC = () => {


    return (
        <main>
            <Feed />
        </main>
    );
}

export default Home;