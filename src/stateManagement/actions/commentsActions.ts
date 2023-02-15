import { CommentProp } from "../../models/CommentProp"

const commentsActions = {
    SET_COMMENTS(comments: CommentProp[]) {
        return {
            type: "SET_COMMENTS",
            payload: {
                comments
            }
        }
    },
    ADD_COMMENT(comment: CommentProp) {
        return {
            type: "ADD_COMMENT",
            payload: {
                comment
            }
        }
    },
    REMOVE_COMMENT(comment_id: number) {
        return {
            type: "REMOVE_COMMENT",
            payload: {
                comment_id
            }
        }
    },
}
export default commentsActions