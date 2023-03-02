import React, {useState, useContext} from 'react';
import Feed from '../inner/Feed';
import ReloadContext from '../../stateManagement/contexts/ReloadContext';
import reloadActions from '../../stateManagement/actions/reloadActions';


const Home: React.FC = () => {
    const [displayCount, setDisplayCount] = useState<number>(2)
    const { reloadDispatch } = useContext(ReloadContext)

    const scrollIncreaseDisplayCount = (e: React.UIEvent<HTMLElement>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight) {
            console.log("yeehaw")
            setDisplayCount(prev => prev + 2);
            reloadDispatch(reloadActions.INCREMENT())
        }
    }


    return (
        <main onScroll={scrollIncreaseDisplayCount}>
            <Feed feedPath="posts" queryParams={{"count": displayCount}} homePage={true}/>
        </main>
    );
}

export default Home;