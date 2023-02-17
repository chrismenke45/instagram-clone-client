import React from 'react';
import getUserObject from '../../functions/user/getUserObject';
import { ConversationProp } from '../../models/ConversationProp';

interface Props {
    messages: ConversationProp[];
}
const Conversation: React.FC<Props> = (props) => {
    const { messages } = props
    const user = getUserObject()

    return (
        <main id="conversation">
            <ol>
                {messages.map(message => {
                    return <li
                        key={message.id}
                        className={"conversationText " + (user.user_id === message.sender_id ? "flexAlignSelfRight" : "flexAlignSelfLeft")}
                    >
                        <img
                            src={(user.user_id !== message.sender_id ? "senderImge" : "")}
                            hidden={user.user_id !== message.sender_id}
                        >
                        </img>
                        <p>
                            {message.text}
                        </p>

                    </li>
                })}
            </ol>
        </main>
    );
}

export default Conversation;