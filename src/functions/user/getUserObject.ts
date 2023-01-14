import jwt_decode from "jwt-decode";

export interface UserObjectProp {
    username: string;
    profile_picture: string
    user_id: number;
    exp: number;
}

const getUserObject = () => {
    const jwt = localStorage.getItem("userToken")
    if (jwt) {
        let userObject: UserObjectProp = jwt_decode(jwt)
        let currentDate = new Date()
        let currentSecondsSinceEpoch = Math.round(currentDate.getTime() / 1000)
        if (currentSecondsSinceEpoch < userObject.exp) {
            return {
                ...userObject,
                jwt
            }
        }
    }
    // return false
    const nullUserObject: UserObjectProp = {
        username: "",
        user_id: 0,
        profile_picture: "",
        exp: 0
    }
    return {
        ...nullUserObject,
        jwt: ""
    }


}
export default getUserObject