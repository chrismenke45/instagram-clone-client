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
            <div className='pushToTop'></div> {/* This pushes messages to topof page if they don't fill the page*/}
            <ol>
                {messages.map(message => {
                    return <li
                        key={message.id}
                        className={"conversationText " + (user.user_id === message.sender_id ? "flexAlignSelfRight" : "flexAlignSelfLeft")}
                    >
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