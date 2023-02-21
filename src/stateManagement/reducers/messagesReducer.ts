import { MessageProp } from "../../models/MessageProp";

export interface messagesStateInterface {
  messages: MessageProp[];
}
export interface messagesActionInterface {
  type: string;
  payload: {
    messages?: MessageProp[];
    message?: MessageProp; 
    message_id?: number;
  }
}

const messagesReducer = (state: messagesStateInterface, action: messagesActionInterface) => {
  switch (action.type) {
    case "SET_MESSAGES":
      return { messages: action.payload.messages || [] }
    case "ADD_MESSAGE":
        if (action.payload.message) {
            return { messages: [action.payload.message, ...state.messages] }
        } else {
            return state
        }
    case "REMOVE_MESSAGE":
        if (action.payload.message_id !== undefined) {
            const newMessages =  state.messages.filter(message => message.id !==  action.payload.message_id)
            return { messages: newMessages}
        } else {
            return state
        }
    default:
      return state
  }
}

export default messagesReducer