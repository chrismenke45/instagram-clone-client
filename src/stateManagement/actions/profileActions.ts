import { ProfileProp } from "../../models/ProfileProp"

const profileActions = {
    SET_PROFILE(profile: ProfileProp) {
        return {
            type: "SET_PROFILE",
            payload: {
                profile
            }
        }
    },
    FOLLOW() {
        return {
            type: "FOLLOW",
        }
    },
    UNFOLLOW() {
        return {
            type: "UNFOLLOW",
        }
    },
}
export default profileActions