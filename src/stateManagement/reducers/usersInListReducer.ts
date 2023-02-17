import { UserInListProp } from "../../models/UserInListProp";

export interface usersInListStateInterface {
    users: UserInListProp[];
}
export interface usersInListActionInterface {
    type: string;
    payload: {
        users?: UserInListProp[];
        user_id?: number;
    }
}

const usersInListReducer = (state: usersInListStateInterface, action: usersInListActionInterface) => {
    switch (action.type) {
        case "SET_USERS":
            return { users: action.payload.users || state.users }
        case "FOLLOW":
            return {
                users: state.users.map(user => user.user_id === action.payload.user_id ? { ...user, current_user_follows: true } : user)
            }
        case "UNFOLLOW":
            return {
                users: state.users.map(user => user.user_id === action.payload.user_id ? { ...user, current_user_follows: false } : user)
            }
        default:
            return state
    }
}

export default usersInListReducer