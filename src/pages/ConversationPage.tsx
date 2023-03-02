import React, { useEffect, useState, useReducer, useContext } from 'react';
import BackBanner from '../components/outer/BackBanner';
import FetchAPI from '../functions/fetch/FetchAPI';
import getUserObject from '../functions/user/getUserObject';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileProp } from '../models/ProfileProp';
import Conversation from '../components/outer/Conversation';
import conversationReducer from '../stateManagement/reducers/conversationReducer';
import conversationActions from '../stateManagement/actions/conversationActions';
import generateQueryParams from '../functions/generateQueryParams';
import ReloadContext from '../stateManagement/contexts/ReloadContext';


const ConversationPage: React.FC = () => {
    const fetcher = new FetchAPI()
    const user = getUserObject()
    const [newMessage, setNewMessage] = useState<string>("")
    const [displayCount, setDisplayCount] = useState<number>(25)
    const { reloadState } = useContext(ReloadContext)
    const [otherUser, setOtherUser] = useState<ProfileProp>({
        username: "",
        name: "",
        id: 0,
        profile_picture: "",
        post_count: 0,
        current_user_follows: false,
        followee_count: 0,
        follower_count: 0,
        bio: ""
    })
    const { user_id } = useParams()
    const navigate = useNavigate()
    const [conversationState, conversationDispatch] = useReducer(
        conversationReducer,
        {
            conversation: []
        }
    )

    useEffect(() => {
        if (Number(user_id) === Number(user.user_id)) {
            navigate(`/profile/${user_id}`)
        } else {
            fetcher.fetchData(`users/${user_id}`, "GET", user.jwt)
                .then(theOtherUser => {
                    setOtherUser(theOtherUser[0])
                })
        }

    }, [])

    useEffect(() => {
        fetcher.fetchData(`users/${user.user_id}/messages/${user_id}${generateQueryParams({"count": displayCount})}`, "GET", user.jwt)
                .then(theMessages => {
                    conversationDispatch(conversationActions.SET_CONVERSATION(theMessages))
                })
    }, [reloadState.count])


    const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
        console.log(otherUser)
        console.log(otherUser.username)
        console.log(!!otherUser.username)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        conversationDispatch(conversationActions.ADD_MESSAGE({
            text: newMessage.trim(),
            id: 0,
            created_at: "now",
            receiver_id: Number(user_id) || 0,
            sender_id: user.user_id
        }))
        if (newMessage) {
            fetcher.buildFormData([
                ["message[text]", newMessage.trim()],
                ["message[receiver_id]", user_id || ""]
            ])
            fetcher.fetchData(`/users/${user.user_id}/messages`, "POST", user.jwt)
                .then(message => {
                    console.log(message)
                    conversationDispatch(conversationActions.REMOVE_MESSAGE(0))
                    conversationDispatch(conversationActions.ADD_MESSAGE(message))
                    setNewMessage("")
                })
                .catch(err => {
                    conversationDispatch(conversationActions.REMOVE_MESSAGE(0))
                })
        }
    }

    return (
        <div id="page">
            <BackBanner header={otherUser.username || 'Conversation'} img={otherUser.profile_picture} subHeader={otherUser.name} headerLink={`/profile/${otherUser.id}`} />
            <Conversation messages={conversationState.conversation} setDisplayCount={setDisplayCount}/>
            <form id="messageForm" onSubmit={handleSubmit}>
                <input type="text" value={newMessage} onChange={handleNewMessageChange}></input>
                <button type='submit'>Send</button>
            </form>
        </div>
    );
}

export default ConversationPage;