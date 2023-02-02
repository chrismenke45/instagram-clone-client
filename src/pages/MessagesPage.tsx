import React, { useEffect, useState } from 'react';
import Messages from '../components/outer/Messages';
import BackBanner from '../components/outer/BackBanner';
import FetchAPI from '../functions/fetch/FetchAPI';
import getUserObject from '../functions/user/getUserObject';


const MessagesPage: React.FC = () => {
    const fetcher = new FetchAPI()
    const user = getUserObject()
    const [search, setSearch] = useState<string>("")

    useEffect(() => {
        fetcher.fetchData(`users/${user.user_id}/messages`, "GET", user.jwt)
            .then(messages => {
                console.log(messages)
            })
    }, [])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearch(e.target.value)
    }
    return (
        <div id="page">
            <BackBanner header="Conversations" />
            <Messages />

        </div>
    );
}

export default MessagesPage;