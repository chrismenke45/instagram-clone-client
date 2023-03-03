import React, {useState, useContext} from 'react';
import Feed from '../inner/Feed';
import ReloadContext from '../../stateManagement/contexts/ReloadContext';
import reloadActions from '../../stateManagement/actions/reloadActions';


const Home: React.FC = () => {
    const [displayCount, setDisplayCount] = useState<number>(15)
    const [lastReload, setLastReload] = useState<number>(new Date().getTime() - 4000)
    const { reloadDispatch } = useContext(ReloadContext)

    const scrollIncreaseDisplayCount = (e: React.UIEvent<HTMLElement>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight && new Date().getTime() - lastReload > 3000) {
            setDisplayCount(prev => prev + 15);
            reloadDispatch(reloadActions.INCREMENT())
            setLastReload(new Date().getTime())
        }
    }


    return (
        <main onScroll={scrollIncreaseDisplayCount}>
            <Feed feedPath="posts" queryParams={{"count": displayCount}} homePage={true}/>
        </main>
    );
}

export default Home;