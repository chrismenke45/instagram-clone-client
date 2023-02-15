import { CommentProp } from "../../models/CommentProp";

export interface commentsStateInterface {
  comments: CommentProp[];
}
export interface commentsActionInterface {
  type: string;
  payload: {
    comments?: CommentProp[];
    comment?: CommentProp; 
    comment_id?: number;
  }
}

const commentsReducer = (state: commentsStateInterface, action: commentsActionInterface) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return { comments: action.payload.comments || [] }
    case "ADD_COMMENT":
        if (action.payload.comment) {
            return { comments: [action.payload.comment, ...state.comments] }
        } else {
            return state
        }
    case "REMOVE_COMMENT":
        if (action.payload.comment_id !== undefined) {
            const newComments =  state.comments.filter(comment => comment.id !==  action.payload.comment_id)
            console.log(newComments)
            return { comments: newComments}
        } else {
            return state
        }
    default:
      return state
  }
}

export default commentsReducer