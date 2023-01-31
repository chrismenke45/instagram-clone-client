import React, { useEffect, useState } from 'react';
import FetchAPI from '../../functions/fetch/FetchAPI';
import getUserObject from '../../functions/user/getUserObject';
import { MediaProp } from '../../models/MediaProp';
import MediaInList from '../inner/MediaInList';

const Media: React.FC = () => {
    const fetcher = new FetchAPI()
    const user = getUserObject()
    const [media, setMedia] = useState<MediaProp[]>([])

    useEffect(() => {
        fetcher.fetchData("/medias", "GET", user.jwt)
            .then(theMedia => {
                console.log(theMedia)
                setMedia(theMedia)
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
            {media.length > 0 ?
                <ul>
                    {media.map(med => {
                        return <MediaInList key={createUniqKeyFromMedia(med)} media={med} />
                    })}

                </ul>
                :
                <h5>
                    No Media
                </h5>}
        </main>
    );
}

export default Media;