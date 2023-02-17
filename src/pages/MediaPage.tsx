import React, { useReducer } from 'react';
import BackBanner from '../components/outer/BackBanner';
import Media from '../components/outer/Media';
import NavFooter from '../components/outer/NavFooter';
import MediaContext, { initialmediaState } from '../stateManagement/contexts/MediaContext';
import mediaReducer from '../stateManagement/reducers/mediaReducer';

const MediaPage: React.FC = () => {

    const [mediaState, mediaDispatch] = useReducer(
        mediaReducer,
        initialmediaState
    )


    return (
        <div id="page">
            <BackBanner header="Media" />
            <MediaContext.Provider value={{ mediaState, mediaDispatch }}>
                <Media />
            </MediaContext.Provider>
            <NavFooter />
        </div>
    );
}

export default MediaPage;