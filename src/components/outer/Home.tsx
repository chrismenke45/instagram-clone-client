import React, {useEffect} from 'react';
import Feed from '../inner/Feed';


const Home: React.FC = () => {


    return (
        <main>
            <Feed feedPath="posts"/>
        </main>
    );
}

export default Home;