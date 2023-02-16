import { stat } from "fs";
import { ProfileProp } from "../../models/ProfileProp";

export interface profileStateInterface {
    profile: ProfileProp;
}
export interface profileActionInterface {
    type: string;
    payload: {
        profile?: ProfileProp
    }
}

const profileReducer = (state: profileStateInterface, action: profileActionInterface) => {
    switch (action.type) {
        case "SET_PROFILE":
            return { profile: action.payload.profile || state.profile }
        case "FOLLOW":
            return {
                profile: {
                    ...state.profile,
                    follower_count: state.profile.follower_count++,
                    current_user_follows: true,
                }

            }
        case "UNFOLLOW":
            return {
                profile: {
                    ...state.profile,
                    follower_count: state.profile.follower_count--,
                    current_user_follows: false,
                }

            }
        default:
            return state
    }
}

export default profileReducer