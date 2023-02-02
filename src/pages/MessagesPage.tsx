import React, { useEffect, useState } from 'react';
import Messages from '../components/outer/Messages';
import BackBanner from '../components/outer/BackBanner';
import FetchAPI from '../functions/fetch/FetchAPI';
import getUserObject from '../functions/user/getUserObject';
import { MessageProp } from '../models/MessageProp';


const MessagesPage: React.FC = () => {
    const fetcher = new FetchAPI()
    const user = getUserObject()
    const [search, setSearch] = useState<string>("")
    const [messages, setMessages] = useState<MessageProp[]>([])

    useEffect(() => {
        fetcher.fetchData(`users/${user.user_id}/messages`, "GET", user.jwt)
            .then(messagess => {
                console.log(messagess)
                setMessages(messagess)
            })
    }, [])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearch(e.target.value)
    }
    return (
        <div id="page">
            <BackBanner header="Conversations" />
            <Messages messages={messages}/>

        </div>
    );
}

export default MessagesPage;