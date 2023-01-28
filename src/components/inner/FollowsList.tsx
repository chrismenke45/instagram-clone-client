import React, { useEffect, useState } from 'react';
import UserInList from './UserInList';
import { useParams } from 'react-router-dom';
import getUserObject from '../../functions/user/getUserObject';
import FetchAPI from '../../functions/fetch/FetchAPI';

interface Props {
    followType: string;
}
const FollowsList: React.FC<Props> = (props) => {
    const { followType } = props
    const { user_id } = useParams()
    const user = getUserObject()
    let fetcher = new FetchAPI
    const [follows, setFollows] = useState<any[]>([])

    useEffect(() => {
        let url = `users/${user_id}/follows` + (followType === "Following" ? '?following=true' : "")
        fetcher.fetchData(url, "GET", user.jwt)
            .then(data => {
                console.log(data)
                setFollows(data)
            })
    }, [])

    return (
        <ul id="likesList" className='flexVertCenter'>
            
            {follows.length > 0 && follows.map(follow => {
                return <UserInList key={`${follow.follower_id}x${follow.followee_id}`} user={follow} />
            })}
        </ul>
    );
}

export default FollowsList;