import React, { useEffect, useState } from 'react';
import Messages from '../components/outer/Messages';
import BackBanner from '../components/outer/BackBanner';
import FetchAPI from '../functions/fetch/FetchAPI';
import getUserObject from '../functions/user/getUserObject';
import { MessageProp } from '../models/MessageProp';
import LoadingIcon from '../components/inner/LoadingIcon';


const MessagesPage: React.FC = () => {
    const fetcher = new FetchAPI()
    const user = getUserObject()
    const [messages, setMessages] = useState<MessageProp[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetcher.fetchData(`users/${user.user_id}/messages`, "GET", user.jwt)
            .then(messagess => {
                setMessages(messagess)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }, [])

    return (
        <div id="page">
            <BackBanner header="Conversations" />
            {loading ?
                <main>
                    <LoadingIcon />
                </main>
                :
                <Messages messages={messages} />
            }
        </div>
    );
}

export default MessagesPage;