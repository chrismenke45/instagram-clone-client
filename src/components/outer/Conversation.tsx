import React, { useContext, useState } from 'react';
import getUserObject from '../../functions/user/getUserObject';
import { ConversationProp } from '../../models/ConversationProp';
import ReloadContext from '../../stateManagement/contexts/ReloadContext';
import reloadActions from '../../stateManagement/actions/reloadActions';

interface Props {
    messages: ConversationProp[];
    setDisplayCount: React.Dispatch<React.SetStateAction<number>>;
}
const Conversation: React.FC<Props> = (props) => {
    const { messages, setDisplayCount } = props
    const user = getUserObject()
    const { reloadDispatch } = useContext(ReloadContext)

    const scrollIncreaseDisplayCount = (e: React.UIEvent<HTMLElement>) => {
        if (e.currentTarget.scrollHeight === e.currentTarget.clientHeight - e.currentTarget.scrollTop) {
            setDisplayCount(prev => prev + 15);
            reloadDispatch(reloadActions.INCREMENT())
        }
    }

    return (
        <main id="conversation" onScroll={scrollIncreaseDisplayCount}>
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