import { ConversationProp } from "../../models/ConversationProp";

export interface conversationStateInterface {
  conversation: ConversationProp[];
}
export interface conversationActionInterface {
  type: string;
  payload: {
    conversation?: ConversationProp[];
    message?: ConversationProp; 
    message_id?: number;
  }
}

const conversationReducer = (state: conversationStateInterface, action: conversationActionInterface) => {
  switch (action.type) {
    case "SET_CONVERSATION":
      return { conversation: action.payload.conversation || [] }
    case "ADD_MESSAGE":
        if (action.payload.message) {
            return { conversation: [action.payload.message, ...state.conversation] }
        } else {
            return state
        }
    case "REMOVE_MESSAGE":
        if (action.payload.message_id !== undefined) {
            const newconversation =  state.conversation.filter(message => message.id !==  action.payload.message_id)
            return { conversation: newconversation}
        } else {
            return state
        }
    default:
      return state
  }
}

export default conversationReducer