import { createContext } from "react";
import { postsStateInterface } from "../reducers/postsReducer"; 

export interface ReloadContextInterface {
    postsState: postsStateInterface;
    postsDispatch: React.Dispatch<any>;
  }
const initialPostsState = {
    posts: []
}
 const PostsContext = createContext<ReloadContextInterface>({postsState: initialPostsState, postsDispatch: () => null})


export default PostsContext