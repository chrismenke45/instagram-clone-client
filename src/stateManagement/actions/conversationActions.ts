import { ConversationProp } from "../../models/ConversationProp"

const conversationActions = {
    SET_CONVERSATION(conversation: ConversationProp[]) {
        return {
            type: "SET_CONVERSATION",
            payload: {
                conversation
            }
        }
    },
    ADD_MESSAGE(message: ConversationProp) {
        return {
            type: "ADD_MESSAGE",
            payload: {
                message
            }
        }
    },
    REMOVE_MESSAGE(message_id: number) {
        return {
            type: "REMOVE_MESSAGE",
            payload: {
                message_id
            }
        }
    },
}
export default conversationActions