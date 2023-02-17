import { MediaProp } from "../../models/MediaProp";

export interface MediaStateInterface {
    media: MediaProp[];
}
export interface MediaActionInterface {
    type: string;
    payload: {
        media?: MediaProp[];
        user_id?: number;
    }
}

const mediaReducer = (state: MediaStateInterface, action: MediaActionInterface) => {
    switch (action.type) {
        case "SET_MEDIA":
            return { media: action.payload.media || state.media }
        case "FOLLOW":
            return {
                media: state.media.map(user => user.user_id === action.payload.user_id ? { ...user, current_user_follows: true } : user)
            }
        case "UNFOLLOW":
            return {
                media: state.media.map(user => user.user_id === action.payload.user_id ? { ...user, current_user_follows: false } : user)
            }
        default:
            return state
    }
}

export default mediaReducer