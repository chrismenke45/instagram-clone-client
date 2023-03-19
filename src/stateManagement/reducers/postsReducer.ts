import { PostProp } from "../../models/PostProp";

export interface postsStateInterface {
  posts: PostProp[];
}
export interface postsActionInterface {
  type: string;
  payload: {
    posts?: PostProp[];
    post_id?: number;
  }
}

const postsReducer = (state: postsStateInterface, action: postsActionInterface) => {
  switch (action.type) {
    case "SET_POSTS":
      return { posts: action.payload.posts || [] }
    case "LIKE_POST":
      if (action.payload.post_id) {
        const newPosts = state.posts.map(post => post.id === action.payload.post_id ? { ...post, current_user_liked: true, like_count: ++post.like_count } : post)
        return { posts: newPosts }
      } else {
        return state
      }
    case "UNLIKE_POST":
      if (action.payload.post_id) {
        const newPosts = state.posts.map(post => post.id === action.payload.post_id ? { ...post, current_user_liked: false, like_count: --post.like_count } : post)
        return { posts: newPosts }
      } else {
        return state
      }
    case "DELETE_POST":
      if (action.payload.post_id) {
        const newPosts = state.posts.filter(post => post.id !== action.payload.post_id)
        return { posts: newPosts }
      } else {
        return state
      }
    default:
      return state
  }
}

export default postsReducer