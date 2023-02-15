import { createContext } from "react";
import { postsStateInterface } from "../reducers/postsReducer"; 

export interface PostsContextInterface {
    postsState: postsStateInterface;
    postsDispatch: React.Dispatch<any>;
  }
const initialPostsState = {
    posts: []
}
 const PostsContext = createContext<PostsContextInterface>({postsState: initialPostsState, postsDispatch: () => null})


export default PostsContext