import React, { useEffect, useState } from 'react';
import BackBanner from '../components/outer/BackBanner';
import FetchAPI from '../functions/fetch/FetchAPI';
import getUserObject from '../functions/user/getUserObject';
import { ConversationProp } from '../models/ConversationProp';
import { useParams } from 'react-router-dom';
import Conversation from '../components/outer/Conversation';


const ConversationPage: React.FC = () => {
    const fetcher = new FetchAPI()
    const user = getUserObject()
    const [messages, setMessages] = useState<ConversationProp[]>([])
    const [otherUser, setOtherUser] = useState<any>(null)
    const { user_id } = useParams()

    useEffect(() => {
        fetcher.fetchData(`users/${user_id}`, "GET", user.jwt)
            .then(theOtherUser => {
                setOtherUser(theOtherUser)
            })
    }, [])

    useEffect(() => {
        fetcher.fetchData(`users/${user_id}/messages/${user_id}`, "GET", user.jwt)
            .then(theMessages => {
                setMessages(theMessages)
            })
    }, [])

    return (
        <div id="page">
            <BackBanner header={otherUser?.username || "Conversation"} />
            <Conversation messages={messages} />

        </div>
    );
}

export default ConversationPage;