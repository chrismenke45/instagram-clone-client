import { UserInListProp } from "../../models/UserInListProp"

const usersInListActions = {
    SET_USERS(users: UserInListProp[]) {
        return {
            type: "SET_USERS",
            payload: {
                users
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
export default usersInListActions