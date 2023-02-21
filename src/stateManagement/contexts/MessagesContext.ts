import { createContext } from "react";
import { messagesStateInterface } from "../reducers/messagesReducer";

export interface MessagesContextInterface {
    messagesState: messagesStateInterface;
    messagesDispatch: React.Dispatch<any>;
}
export const initialMessagesState = {
    messages: []
}
const MessagesContext = createContext<MessagesContextInterface>({ messagesState: initialMessagesState, messagesDispatch: () => null })


export default MessagesContext