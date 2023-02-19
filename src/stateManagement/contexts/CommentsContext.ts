import { createContext } from "react";
import { commentsStateInterface } from "../reducers/commentsReducer"; 

export interface CommentsContextInterface {
    commentsState: commentsStateInterface;
    commentsDispatch: React.Dispatch<any>;
  }
export const initialCommentsState = {
    comments: []
}
 const CommentsContext = createContext<CommentsContextInterface>({commentsState: initialCommentsState, commentsDispatch: () => null})


export default CommentsContext