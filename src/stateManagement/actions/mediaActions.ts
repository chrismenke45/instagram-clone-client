import { MediaProp } from "../../models/MediaProp"

const mediaActions = {
    SET_MEDIA(media: MediaProp[]) {
        return {
            type: "SET_MEDIA",
            payload: {
                media
            }
        }
    },
    FOLLOW(user_id: number) {
        return {
            type: "FOLLOW",
            payload: {
                user_id
            }
        }
    },
    UNFOLLOW(user_id: number) {
        return {
            type: "UNFOLLOW",
            payload: {
                user_id
            }
        }
    },
}
export default mediaActions