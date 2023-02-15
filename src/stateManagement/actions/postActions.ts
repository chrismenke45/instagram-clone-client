import { PostProp } from "../../models/PostProp"

const postActions = {
    LIKE_POST(post_id: number) {
        return {
            type: "LIKE_POST",
            payload: {
                post_id
            }
        }
    },
    SET_POSTS(posts: PostProp[]) {
        return {
            type: "SET_POSTS",
            payload: {
                posts
            }
        }
    },
    UNLIKE_POST(post_id: number) {
        return {
            type: "UNLIKE_POST",
            payload: {
                post_id
            }
        }
    },
}
export default postActions