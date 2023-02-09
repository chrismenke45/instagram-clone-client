import React, { useEffect, useState, useRef } from 'react';
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
    const [newMessage, setNewMessage] = useState<string>("")
    const [otherUser, setOtherUser] = useState<any>(null)
    const { user_id } = useParams()

    useEffect(() => {
        fetcher.fetchData(`users/${user_id}`, "GET", user.jwt)
            .then(theOtherUser => {
                setOtherUser(theOtherUser)
            })
    }, [])

    useEffect(() => {
        fetcher.fetchData(`users/${user.user_id}/messages/${user_id}`, "GET", user.jwt)
            .then(theMessages => {
                setMessages(theMessages)
            })
    }, [])


    const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newMessage) {
        fetcher.buildFormData([
            ["message[text]", newMessage], 
            ["message[receiver_id]", user_id || ""]
        ])
        fetcher.fetchData(`/users/${user.user_id}/messages`, "POST", user.jwt)
            .then(data => {
                console.log(data)
            })
        }
    }

    return (
        <div id="page">
            <BackBanner header={otherUser?.username || "Conversation"} />
            <Conversation messages={messages} />
            <form id="messageForm" onSubmit={handleSubmit}>
                <input type="text" value={newMessage} onChange={handleNewMessageChange}></input>
                <button type='submit'>Send</button>
            </form>
        </div>
    );
}

export default ConversationPage;