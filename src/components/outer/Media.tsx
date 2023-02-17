import React, { useEffect, useState, useContext } from 'react';
import FetchAPI from '../../functions/fetch/FetchAPI';
import getUserObject from '../../functions/user/getUserObject';
import { MediaProp } from '../../models/MediaProp';
import LoadingIcon from '../inner/LoadingIcon';
import MediaInList from '../inner/MediaInList';
import MediaContext from '../../stateManagement/contexts/MediaContext';
import mediaActions from '../../stateManagement/actions/mediaActions';

const Media: React.FC = () => {
    const fetcher = new FetchAPI()
    const user = getUserObject()
    const [activelySearching, setActivelySearching] = useState<boolean>(false)
    const { mediaState, mediaDispatch } = useContext(MediaContext)

    useEffect(() => {
        setActivelySearching(true)
        fetcher.fetchData("/medias", "GET", user.jwt)
            .then(theMedia => {
                mediaDispatch(mediaActions.SET_MEDIA(theMedia))
                setActivelySearching(false)
            })
            .catch(err => {
                setActivelySearching(false)
            })
    }, [])

    const createUniqKeyFromMedia = (media: MediaProp): string => {
        switch (media.id) {
            case 76:
                return "L" + media.like_id
            case 67:
                return "C" + media.comment_id
            case 70:
                return "F" + media.user_id
            default:
                throw new Error('Media type not recognized');
        }
    }

    return (
        <main id="media">
            {mediaState.media.length > 0 ?
                <ul>
                    {mediaState.media.map(med => {
                        return <MediaInList key={createUniqKeyFromMedia(med)} media={med} />
                    })}

                </ul>
                :
                activelySearching ?
                <LoadingIcon />
                :
                <h5>
                    No Media
                </h5>}
        </main>
    );
}

export default Media;