import { MessageProp } from "../../models/MessageProp"

const messagesActions = {
    SET_MESSAGES(messages: MessageProp[]) {
        return {
            type: "SET_MESSAGES",
            payload: {
                messages
            }
        }
    },
    ADD_MESSAGE(message: MessageProp) {
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
export default messagesActions