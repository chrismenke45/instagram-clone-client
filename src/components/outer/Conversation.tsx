import React, { useState, useRef, useEffect } from 'react';
import FetchAPI from '../../functions/fetch/FetchAPI';
import getUserObject from '../../functions/user/getUserObject';
import { ConversationProp } from '../../models/ConversationProp';

interface Props {
    messages: ConversationProp[];
}
const Conversation: React.FC<Props> = (props) => {
    const { messages } = props
    // const fetcher = new FetchAPI()
    const user = getUserObject()

    return (
        <main id="conversation">
            <ol>
                {messages.map(message => {
                    return <li
                        key={message.id}
                        className={"conversationText " + (user.user_id === message.sender_id ? "flexAlignSelfRight" : "flexAlignSelfLeft")}
                    >
                        {message.text}
                    </li>
                })}
            </ol>
        </main>
    );
}

export default Conversation;